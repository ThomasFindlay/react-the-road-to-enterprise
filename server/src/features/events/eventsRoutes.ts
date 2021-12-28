import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify'
import {
  getEvents,
  getTopEvents,
  createEvent,
  resetEvents,
} from './eventsController'

function eventsRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  fastify.get('/top_quotes', getTopEvents)
  fastify.get('/', getEvents)
  fastify.post('/', createEvent)
  fastify.post('/reset', resetEvents)
  done()
}

export default eventsRoutes
