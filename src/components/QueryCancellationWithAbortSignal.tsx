import { fetchTopQuotes } from '@/api/quoteApi'
import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

const QueryCancellationWithAbortSignal = () => {
  const [shouldAbort, setShouldAbort] = useState(true)
  const queryClient = useQueryClient()
  const {
    data: quotes,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(
    'top-aborted-quotes-abort-controller',
    ({ signal }) => {
      return fetchTopQuotes({
        signal,
      }).catch((error) => {
        if (error.aborted) {
          toast.error('Request aborted')
          return
        }
        throw error
      })
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  )

  const onFetchQuotes = () => {
    queryClient.refetchQueries('top-aborted-quotes-abort-controller')
    setTimeout(() => {
      shouldAbort &&
        queryClient.cancelQueries('top-aborted-quotes-abort-controller')
    }, 200)
  }

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <div>
        <h2 className="font-bold text-2xl mb-4">
          Query Cancellation With Abort Controller
        </h2>
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

export default QueryCancellationWithAbortSignal
