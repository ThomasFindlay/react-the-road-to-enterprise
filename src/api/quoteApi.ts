import api from './api'

export type Quote = {
  quote: string
  author: string
}

export type TopQuotesResponse = {
  quotes: Quote[]
}

export const fetchTopQuotes = () =>
  api.get<TopQuotesResponse>('quotes/top_quotes').then((res) => res.data.quotes)

export type QuotesData = {
  quotes: Quote[]
  hasMore?: boolean
}

export const fetchQuotesByPage = (page: number) =>
  api.get<QuotesData>('quotes', { params: { page } }).then((res) => res.data)

export type QuoteWithCursor = Quote & { nextCursor: number | null }

export type QuotesDataWithCursor = {
  quotes: QuoteWithCursor[]
  nextCursor: number | null
}

export const fetchQuotesByCursor = (cursor: number) =>
  api
    .get<QuotesDataWithCursor>('quotes', { params: { cursor } })
    .then((res) => res.data)

export const postQuote = (quote: Quote) => api.post('quotes', quote)
export const resetQuotes = () => api.post('quotes/reset', {})
