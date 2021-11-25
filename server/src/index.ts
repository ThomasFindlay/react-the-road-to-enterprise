import Fastify, { FastifyInstance } from 'fastify'
import pino from 'pino'
import cors from 'fastify-cors'
import routes from './routes'
const server: FastifyInstance = Fastify({ logger: pino({ level: 'info' }) })

server.register(cors)
server.register(routes, { prefix: '/api' })

// server.get('/', async (request, reply) => {
//   return quotes
// })

// Run the server!
const start = async () => {
  try {
    await server.listen(4000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
