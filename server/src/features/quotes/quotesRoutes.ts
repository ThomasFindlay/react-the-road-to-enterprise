import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify'
import { getQuotes, getTopQuotes } from './quotesController'

function quotesRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  fastify.get('/top_quotes', getTopQuotes)
  fastify.get('/', getQuotes)
  done()
}

export default quotesRoutes
