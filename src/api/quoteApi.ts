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
