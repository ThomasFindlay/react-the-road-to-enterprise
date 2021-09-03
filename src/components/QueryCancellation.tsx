import { fetchTopQuotes, Quote } from '@/api/quoteApi'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { cancelRequestFactory } from '@/api/api'
import { toast } from 'react-toastify'

type PromiseWithCancel<T> = Promise<T> & {
  cancel?: () => void
}

const QueryCancellation = () => {
  const [shouldAbort, setShouldAbort] = useState(true)
  const queryClient = useQueryClient()
  const {
    data: quotes,
    isSuccess,
    isFetching,
    isLoading,
    isError,
  } = useQuery(
    'top-aborted-quotes',
    () => {
      const { abort, cancelToken } = cancelRequestFactory()

      const promise = fetchTopQuotes({
        cancelToken,
      }) as PromiseWithCancel<Quote[]>

      promise.catch((error) => {
        if (error.aborted) {
          toast.error('Request aborted')
        }
        throw error
      })

      promise.cancel = abort
      return promise
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  )

  useEffect(() => {
    if (!isFetching || !shouldAbort) return
    queryClient.cancelQueries('top-aborted-quotes')
  }, [isFetching])

  const onFetchQuotes = () => {
    queryClient.refetchQueries('top-aborted-quotes')
    shouldAbort && queryClient.cancelQueries('top-aborted-quotes')
  }

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <div>
        <h2 className="font-bold text-2xl mb-4">Query Cancellation</h2>
        <div className="mb-4">
          <label>
            <input
              className="mr-3"
              type="checkbox"
              checked={shouldAbort}
              onChange={() => setShouldAbort((checked) => !checked)}
            />
            Abort
          </label>
        </div>
        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching quotes
          </p>
        ) : null}
        <div className="mb-4">
          <button
            className="bg-blue-600 text-blue-100 px-4 py-3"
            onClick={onFetchQuotes}
          >
            Fetch quotes
          </button>
        </div>
        {isLoading ? <p>Fetching quotes</p> : null}

        {isSuccess ? (
          <div className="max-h-96 overflow-y-auto divide-y">
            {quotes?.map((quote) => {
              return (
                <blockquote
                  key={quote.id}
                  className="relative p-4 text-xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote"
                >
                  <p className="mb-4">"{quote.quote}"</p>
                  <cite className="flex items-center justify-center">
                    <div className="flex flex-col items-start">
                      <span className="mb-1 text-sm italic font-bold">
                        {quote.author}
                      </span>
                    </div>
                  </cite>
                </blockquote>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default QueryCancellation
