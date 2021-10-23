import fs from 'fs/promises'
import path from 'path'
import { FastifyReply, FastifyRequest } from 'fastify'
import { nanoid } from 'nanoid'

import usersOriginal from './usersOriginal.json'
// Force ts to copy quotes to the build folder
import users from './users.json'

const usersFilePath = path.resolve(__dirname, './users.json')

const sleep = (time = 1000) =>
  new Promise((resolve) => setTimeout(resolve, time))

type UsersData = Array<{
  id: string
  name: string
  email: string
}>

const readUsers = async () => {
  const usersBuffer = await fs.readFile(usersFilePath)
  return JSON.parse(usersBuffer.toString()) as UsersData
}

const writeUsers = async (data: UsersData) => {
  return fs.writeFile(usersFilePath, JSON.stringify(data), 'utf-8')
}

type GetUser = {
  Querystring: {
    email?: string
  }
}

export const getUser = async (
  request: FastifyRequest<GetUser>,
  reply: FastifyReply
) => {
  const { email } = request.query

  if (!email) throw new Error('Please provide email.')
  await sleep()
  const users = await readUsers()
  console.log('users', users)
  const user = users.find((user) => user.email === email)
  return {
    user,
  }
}

export const getUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  await sleep()
  return {
    users: await readUsers(),
  }
}

type RegisterUser = {
  Body: {
    name: string
    email: string
  }
}

export const registerUserSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
    },
    required: ['name', 'email'],
  },
}

export const registerUser = async (
  request: FastifyRequest<RegisterUser>,
  reply: FastifyReply
) => {
  const { name, email } = request.body
  await sleep()
  const newUser = {
    id: nanoid(),
    name,
    email,
  }
  const users = await readUsers()
  users.push(newUser)
  await writeUsers(users)

  return {
    user: newUser,
  }
}

export const resetUsers = async (
  request: FastifyRequest<RegisterUser>,
  reply: FastifyReply
) => {
  await sleep()
  await writeUsers(usersOriginal)
  return true
}

type DeleteUser = {
  Params: {
    id: string
  }
}

export const deleteUser = async (
  request: FastifyRequest<DeleteUser>,
  reply: FastifyReply
) => {
  const { id } = request.params

  if (!id) throw new Error('User id is required')

  await sleep()
  const users = await readUsers()
  const updatedUsers = users.filter((_user) => _user.id !== id)
  await writeUsers(updatedUsers)
  return true
}
