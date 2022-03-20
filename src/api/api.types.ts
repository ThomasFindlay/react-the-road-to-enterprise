import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosPromise,
  Canceler,
} from 'axios'

export type { Canceler }

type AxiosMethods = Pick<
  AxiosInstance,
  'get' | 'put' | 'patch' | 'post' | 'delete'
>
export type WithAbortFn = AxiosMethods[keyof AxiosMethods]

export type ApiExecutor<T> = {
  (url: string, body: unknown, config: ApiRequestConfig): AxiosPromise<T>
  (url: string, config: ApiRequestConfig): AxiosPromise<T>
}
export type ApiExecutorArgs =
  | [string, unknown, ApiRequestConfig]
  | [string, ApiRequestConfig]

export type ApiRequestConfig = AxiosRequestConfig & {
  abort?: (cancel: Canceler) => void
}

export type ApiError = AxiosError & {
  aborted?: boolean
}
