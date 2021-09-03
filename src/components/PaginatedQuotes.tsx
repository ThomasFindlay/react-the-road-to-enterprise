import { useQuery } from 'react-query'
import { fetchQuotesByPage, QuotesData } from '@/api/quoteApi'
import { useState } from 'react'
import clsx from 'clsx'

const PaginatedQuotes = () => {
  const [page, setPage] = useState(1)
  const {
    data: quotes,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    isPreviousData,
  } = useQuery<QuotesData>(['quotes', page], () => fetchQuotesByPage(page), {
    keepPreviousData: true,
  })

  const paginationBtnClass =
    'bg-blue-100 px-4 py-3 hover:bg-blue-200 text-blue-900'

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <div>
        <h2 className="font-bold text-2xl mb-4">Paginated Quotes</h2>

        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching quotes
          </p>
        ) : null}
        {isLoading ? <p>Fetching quotes</p> : null}

        {isSuccess ? (
          <div>
            <div className="overflow-y-auto divide-y">
              {quotes?.quotes.map((quote) => {
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
            <div className="flex space-x-8 items-center justify-center mt-4">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
                className={clsx(
                  paginationBtnClass,
                  page === 1 && 'text-gray-400'
                )}
                disabled={page === 1}
              >
                Previous
              </button>{' '}
              <span className="text-lg font-italic">Page {page}</span>
              <button
                onClick={() => {
                  if (!isPreviousData && quotes?.hasMore) {
                    setPage((old) => old + 1)
                  }
                }}
                className={clsx(
                  paginationBtnClass,
                  isPreviousData || (!quotes?.hasMore && 'text-gray-400')
                )}
                // Disable the Next Page button until we know a next page is available
                disabled={isPreviousData || !quotes?.hasMore}
              >
                Next
              </button>
            </div>
            {isFetching ? <span> Loading...</span> : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default PaginatedQuotes
