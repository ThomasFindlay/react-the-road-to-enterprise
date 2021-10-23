import { listUsers, createUser, deleteUser } from '@/api/userApi'
import { RootState } from '@/store'
import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { User } from './UsersManager.types'

type ApiStatus = 'idle' | 'pending' | 'success' | 'error'

export type UsersState = {
  users: User[]
  selectedUserId: User['id'] | null
  fetchUsersStatus: ApiStatus
  addUserStatus: ApiStatus
  deleteUserStatus: ApiStatus
  deleteUserId: User['id'] | null
}

const initialState: UsersState = {
  users: [],
  selectedUserId: null,
  fetchUsersStatus: 'idle',
  addUserStatus: 'idle',
  deleteUserStatus: 'idle',
  deleteUserId: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', listUsers)

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData: User) => {
    const user = await createUser(userData)
    return user
  }
)

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userData: User) => {
    const result = await deleteUser(userData.id)
    console.log('delete result', result)
    return userData
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
    // removeUser: (state, action: PayloadAction<User>) => {
    //   state.users = state.users.filter((user) => user.id !== action.payload.id)
    // },
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
    builder.addCase(addUser.fulfilled, (state, action) => {
      const { user } = action.payload
      state.users.push(user)
      state.addUserStatus = 'success'
    })
    builder.addCase(addUser.rejected, (state, action) => {
      state.addUserStatus = 'error'
    })
    builder.addCase(removeUser.pending, (state, action) => {
      console.log('in action remove user pending', action)
      state.deleteUserStatus = 'pending'
    })
    builder.addCase(removeUser.fulfilled, (state, action) => {
      const user = action.payload
      state.users.filter((_user) => _user.id !== user.id)
      state.deleteUserStatus = 'success'
      state.deleteUserId = null
    })
    builder.addCase(removeUser.rejected, (state, action) => {
      state.deleteUserStatus = 'error'
      state.deleteUserId = null
    })
  },
})

export const {
  setUsers,
  // addUser,
  // removeUser,
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
