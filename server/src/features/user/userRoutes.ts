import {
  FastifyInstance,
  FastifyPluginOptions,
  HookHandlerDoneFunction,
} from 'fastify'

import {
  getUser,
  getUsers,
  registerUser,
  registerUserSchema,
  resetUsers,
} from './userController'

function userRoutes(
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: HookHandlerDoneFunction
) {
  fastify.get('/', getUser)
  fastify.get('/all', getUsers)
  fastify.post('/', { schema: registerUserSchema }, registerUser)
  fastify.post('/reset', resetUsers)
  done()
}

export default userRoutes
