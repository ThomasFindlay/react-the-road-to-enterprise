import { RootState } from '@/store'
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { initialUsers } from './initialUsers'
import { User } from './UsersManager.types'

export type UsersState = {
  users: User[]
  selectedUserId?: User['id'] | null
}

const initialState: UsersState = {
  users: initialUsers,
  selectedUserId: undefined,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    removeUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id)
    },
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload
    },
  },
})

export const { setUsers, addUser, removeUser, selectUser } = usersSlice.actions

export const getSelectedUser = createSelector(
  (state: RootState) => state.users,
  (users) => {
    if (users.selectedUserId) {
      return users.users.find((user) => user.id === users.selectedUserId)
    }
    return null
  }
)

export default usersSlice.reducer
