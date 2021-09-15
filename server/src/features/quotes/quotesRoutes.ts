import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify'
import {
  getQuotes,
  getTopQuotes,
  createQuote,
  resetQuotes,
} from './quotesController'

function quotesRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  fastify.get('/top_quotes', getTopQuotes)
  fastify.get('/', getQuotes)
  fastify.post('/', createQuote)
  fastify.post('/reset', resetQuotes)
  done()
}

export default quotesRoutes
