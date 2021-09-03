import { fetchTopQuotes, Quote } from '@/api/quoteApi'
import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { Canceler } from '@/api/api.types'

type PromiseWithCancel<T> = Promise<T> & {
  cancel?: () => void
}

const QueryCancellation = () => {
  const [shouldAbort, setShouldAbort] = useState(true)
  const queryClient = useQueryClient()
  const {
    data: quotes,
    isSuccess,
    isLoading,
    isError,
  } = useQuery(
    'top-aborted-quotes',
    () => {
      // Temp variable to store the cancel method
      // It is initialised with a noop, because of TypeScript Control Flow Analysis
      // We can't assign the abort method on the `promise` variable directly, because
      // it can't be accessed before it is fully initialised.
      // That's why we need a temp variable
      let cancel: Canceler = () => {}
      const promise = fetchTopQuotes({
        abort: (abort) => (cancel = abort),
      }) as PromiseWithCancel<Quote[]>

      promise.catch((error) => {
        if (error.aborted) {
          toast.error('Request aborted')
        }
        throw error
      })

      promise.cancel = cancel
      return promise
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  )

  const onFetchQuotes = () => {
    queryClient.refetchQueries('top-aborted-quotes')
    setTimeout(() => {
      shouldAbort && queryClient.cancelQueries('top-aborted-quotes')
    }, 200)
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
