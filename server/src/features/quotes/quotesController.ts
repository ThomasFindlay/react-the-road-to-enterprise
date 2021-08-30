import { FastifyReply, FastifyRequest } from 'fastify'
import quotesData from './quotes.json'

export const getTopQuotes = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return {
    quotes: quotesData.quotes.slice(0, 5),
  }
}

type GetQuotes = {
  Querystring: {
    page: number
  }
}

export const getQuotes = async (
  request: FastifyRequest<GetQuotes>,
  reply: FastifyReply
) => {
  const { page = 1 } = request.query
  const limit = 5
  const offset = page * limit
  return {
    quotes: quotesData.quotes.slice(offset, offset + limit),
  }
}
