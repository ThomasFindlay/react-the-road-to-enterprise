import axios, { AxiosError, AxiosInstance, AxiosPromise } from 'axios'
import {
  ApiRequestConfig,
  WithAbordFn,
  ApiExecutor,
  ApiExecutorArgs,
  ApiError,
} from './api.types'
// Default config for the axios instance
const axiosParams = {
  // Set different base URL based on the environment
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/' : '/',
}

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams)

const didAbort = (error: AxiosError) => axios.isCancel(error)

const getCancelSource = () => axios.CancelToken.source()

const withAbort = <T>(fn: WithAbordFn) => {
  const executor: ApiExecutor<T> = async (...args: ApiExecutorArgs) => {
    const originalConfig = args[args.length - 1] as ApiRequestConfig
    // Extract abort property from the config
    const { abort, ...config } = originalConfig

    // Create cancel token and abort method only if abort
    // function was passed
    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource()
      config.cancelToken = token
      abort(cancel)
    }

    try {
      if (args.length > 2) {
        const [url, body] = args
        return await fn<T>(url, body, config)
      } else {
        const [url] = args
        return await fn<T>(url, config)
      }
    } catch (error) {
      // Add "aborted" property to the error if the request was cancelled
      didAbort(error) && (error.aborted = true)
      throw error
    }
  }

  return executor
}

const withLogger = async <T>(promise: AxiosPromise<T>) =>
  promise.catch((error: ApiError) => {
    /*
    Always log errors in dev environment
    if (process.env.NODE_ENV !== 'development') throw error      
  */
    // Log error only if VUE_APP_DEBUG_API env is set to true
    if (!process.env.REACT_APP_DEBUG_API) throw error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      // in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)

    throw error
  })

// Main api function
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.get)(url, config)),
    delete: <T>(url: string, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.delete)(url, config)),
    post: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.post)(url, body, config)),
    patch: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.patch)(url, body, config)),
    put: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.put)(url, body, config)),
  }
}
export default api(axiosInstance)
