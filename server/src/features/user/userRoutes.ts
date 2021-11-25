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
  deleteUser,
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
  fastify.delete('/:id', deleteUser)
  done()
}

export default userRoutes
