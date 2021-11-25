import { FastifyReply, FastifyRequest } from 'fastify'
import { nanoid } from 'nanoid'
import quotesOriginal from './quotesOriginal.json'
import quotes from './quotes.json'
import fs from 'fs/promises'
import path from 'path'
// Force ts to copy quotes to the build folder
const quotesFilePath = path.resolve(__dirname, './quotes.json')

const sleep = (time = 1000) =>
  new Promise((resolve) => setTimeout(resolve, time))

const readQuotes = async () => {
  const quotesBuffer = await fs.readFile(quotesFilePath)
  return JSON.parse(quotesBuffer.toString())
}

type QuotesData = {
  quotes: Array<{
    id: string
    quote: string
    author: string
  }>
}

export const getTopQuotes = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  await sleep()
  const quotesData = await readQuotes()
  return {
    quotes: quotesData.quotes.slice(0, 5),
  }
}

type GetQuotes = {
  Querystring: {
    page?: string
    cursor?: string
  }
}

const getQuotesByPage = async (page: number, limit: number) => {
  const offset = page * limit
  const endIndex = offset + limit
  const quotesData = await readQuotes()
  const quotes = quotesData.quotes.slice(offset, endIndex)
  return {
    quotes,
    hasMore: endIndex < quotesData.quotes.length - 1,
  }
}

const getQuotesByCursor = async (cursor: number, limit: number) => {
  const endIndex = cursor + limit
  const quotesData = await readQuotes()
  const quotes = quotesData.quotes.slice(cursor, endIndex)

  return {
    quotes,
    nextCursor: endIndex < quotesData.quotes.length - 1 ? endIndex + 1 : null,
  }
}

export const getQuotes = async (
  request: FastifyRequest<GetQuotes>,
  reply: FastifyReply
) => {
  const { page, cursor } = request.query
  if (!page && !cursor)
    throw new Error(
      'Missing parameters. Please provide "page" or "cursor" parameter in the request query.'
    )
  await sleep()

  const limit = 5

  if (page) return getQuotesByPage(parseInt(page), limit)
  if (cursor) return getQuotesByCursor(parseInt(cursor), limit)
}

type CreateQuote = {
  Body: {
    quote: string
    author: string
  }
}

export const createQuote = async (request: FastifyRequest<CreateQuote>) => {
  const { quote, author } = request.body
  if (!quote || !author)
    throw new Error('Please provide author and quote text.')
  await sleep()
  const quotesBuffer = await fs.readFile(quotesFilePath)
  const quotesJson = JSON.parse(quotesBuffer.toString()) as QuotesData
  const id = nanoid()
  quotesJson.quotes.unshift({ id, quote, author })
  await fs.writeFile(quotesFilePath, JSON.stringify(quotesJson), 'utf-8')
  return true
}

export const resetQuotes = async (request: FastifyRequest) => {
  await sleep()
  await fs.writeFile(quotesFilePath, JSON.stringify(quotesOriginal), 'utf-8')
  return true
}
