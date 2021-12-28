import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify'
import {
  getEvents,
  getAllEvents,
  getTopEvents,
  createEvent,
  resetEvents,
} from './eventsController'

function eventsRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  fastify.get('/top_events', getTopEvents)
  fastify.get('/', getEvents)
  fastify.get('/all', getAllEvents)
  fastify.post('/', createEvent)
  fastify.post('/reset', resetEvents)
  done()
}

export default eventsRoutes
