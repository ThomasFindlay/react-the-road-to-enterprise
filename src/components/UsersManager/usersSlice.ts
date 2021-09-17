import { listUsers, createUser } from '@/api/userApi'
import { RootState } from '@/store'
import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { User } from './UsersManager.types'

export type UsersState = {
  users: User[]
  selectedUserId?: User['id'] | null
  fetchUsersStatus: 'idle' | 'pending' | 'success' | 'error'
  addUserStatus: 'idle' | 'pending' | 'success' | 'error'
}

const initialState: UsersState = {
  users: [],
  selectedUserId: undefined,
  fetchUsersStatus: 'idle',
  addUserStatus: 'idle',
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', listUsers)

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData: User) => {
    const user = await createUser(userData)
    return user
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    // addUser: (state, action: PayloadAction<User>) => {
    //   state.users.push(action.payload)
    // },
    removeUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id)
    },
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.fetchUsersStatus = 'pending'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.fetchUsersStatus = 'success'
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.fetchUsersStatus = 'error'
    })
    builder.addCase(addUser.pending, (state, action) => {
      state.addUserStatus = 'pending'
    })
    builder.addCase(addUser.rejected, (state, action) => {
      state.addUserStatus = 'error'
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      const { user } = action.payload
      state.users.push(user)
      state.addUserStatus = 'success'
    })
  },
})

export const {
  setUsers,
  // addUser,
  removeUser,
  selectUser,
} = usersSlice.actions

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
