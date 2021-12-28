import { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'fs/promises'
import path from 'path'
// Force ts to copy events to the build folder
import eventsJSON from './events.json'
const eventsFilePath = path.resolve(__dirname, './events.json')

const createEventDate = (days = 10, hours = 0) => {
  let date = new Date()
  let day = date.getDate() + days
  date.setDate(day)
  date.setHours(date.getHours() + hours)
  return new Intl.DateTimeFormat().format(date)
}

const events = [
  {
    id: '1',
    title: 'Football Match',
    startDate: createEventDate(10),
    startTime: '12:00',
    endDate: createEventDate(10, 2),
    endTime: '16:00',
  },
  {
    id: '2',
    title: 'Birthday Party',
    startDate: createEventDate(24),
    startTime: '9:00',
    endDate: createEventDate(24, 6),
    endTime: '14:00',
  },
  {
    id: '3',
    title: 'Tech Conference',
    startDate: createEventDate(45),
    startTime: '08:00',
    endDate: createEventDate(45, 4),
    endTime: '18:00',
  },
  {
    id: '4',
    title: 'Board Games Night',
    startDate: createEventDate(-15),
    startTime: '20:00',
    endDate: createEventDate(-15, 3),
    endTime: '23:00',
  },
]

type Event = typeof events[0]

fs.writeFile(
  eventsFilePath,
  JSON.stringify({
    events,
  }),
  'utf-8'
)

const sleep = (time = 1000) =>
  new Promise((resolve) => setTimeout(resolve, time))

const readEvents = async () => {
  const eventsBuffer = await fs.readFile(eventsFilePath)
  return JSON.parse(eventsBuffer.toString())
}

type EventsData = {
  events: Array<Event>
}

export const getTopEvents = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  await sleep()
  const eventsData = await readEvents()
  return {
    events: eventsData.events.slice(0, 5),
  }
}

type GetEvents = {
  Querystring: {
    page?: string
    cursor?: string
  }
}

const getEventsByPage = async (page: number, limit: number) => {
  const offset = page * limit
  const endIndex = offset + limit
  const eventsData = await readEvents()
  const events = eventsData.events.slice(offset, endIndex)
  return {
    events,
    hasMore: endIndex < eventsData.events.length - 1,
  }
}

const getEventsByCursor = async (cursor: number, limit: number) => {
  const endIndex = cursor + limit
  const eventsData = await readEvents()
  const events = eventsData.events.slice(cursor, endIndex)

  return {
    events,
    nextCursor: endIndex < eventsData.events.length - 1 ? endIndex + 1 : null,
  }
}

export const getAllEvents = async (
  request: FastifyRequest<GetEvents>,
  reply: FastifyReply
) => {
  await sleep()
  return await readEvents()
}

export const getEvents = async (
  request: FastifyRequest<GetEvents>,
  reply: FastifyReply
) => {
  const { page, cursor } = request.query
  if (!page && !cursor)
    throw new Error(
      'Missing parameters. Please provide "page" or "cursor" parameter in the request query.'
    )
  await sleep()

  const limit = 5

  if (page) return getEventsByPage(parseInt(page), limit)
  if (cursor) return getEventsByCursor(parseInt(cursor), limit)
}

type CreateEvent = {
  Body: Event
}

export const createEvent = async (request: FastifyRequest<CreateEvent>) => {
  const { id, title, startDate, startTime, endDate, endTime } = request.body
  if (!id || !title || !startDate || !startTime || !endDate || !endTime)
    throw new Error('Please provide event details.')
  await sleep()
  const eventsBuffer = await fs.readFile(eventsFilePath)
  const eventsJson = JSON.parse(eventsBuffer.toString()) as EventsData
  eventsJson.events.unshift({
    id,
    title,
    startDate,
    startTime,
    endDate,
    endTime,
  })
  await fs.writeFile(eventsFilePath, JSON.stringify(eventsJson), 'utf-8')
  return true
}

export const resetEvents = async (request: FastifyRequest) => {
  await sleep()
  await fs.writeFile(eventsFilePath, JSON.stringify(events), 'utf-8')
  return true
}
