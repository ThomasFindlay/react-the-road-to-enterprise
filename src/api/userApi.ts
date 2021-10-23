import api from './api'
import { User } from '@/components/UsersManager/UsersManager.types'

export const listUsers = () => {
  return api.get<{ users: User[] }>('/user/all').then((res) => res.data.users)
}

export const createUser = (user: User) => {
  return api
    .post<{
      user: User
    }>('/user', user)
    .then((res) => res.data)
}

export const deleteUser = (id: string) => {
  return api.delete(`/user/${id}`)
}
