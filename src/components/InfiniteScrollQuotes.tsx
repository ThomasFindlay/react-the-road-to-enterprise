import { useInfiniteQuery } from 'react-query'
import { fetchQuotesByCursor, QuotesDataWithCursor } from '@/api/quoteApi'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const InfiniteScrollQuotes = () => {
  const { ref: loadMoreRef, inView } = useInView()
  const {
    data: quotes,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<QuotesDataWithCursor>(
    'quotes',
    ({ pageParam = 0 }) => fetchQuotesByCursor(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextCursor
      },
    }
  )

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <div>
        <h2 className="font-bold text-2xl mb-4">Infinite Scroll Quotes</h2>

        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching quotes
          </p>
        ) : null}
        {isLoading ? <p>Fetching quotes</p> : null}

        {isSuccess ? (
          <div>
            <div className="max-h-96 overflow-y-auto divide-y">
              {quotes?.pages.map((data) => {
                return data.quotes.map((quote) => {
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
                })
              })}
              <div ref={loadMoreRef}></div>
            </div>
            {isFetchingNextPage ? <span> Loading...</span> : null}{' '}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default InfiniteScrollQuotes
