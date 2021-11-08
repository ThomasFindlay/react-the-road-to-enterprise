import { listUsers, createUser, deleteUser } from '@/api/userApi'
import { RootState } from '@/store'
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { User } from './UsersManager.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ApiStatus = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'

export type UsersState = {
  selectedUserId: User['id'] | null
  fetchUsersStatus: ApiStatus
  addUserStatus: ApiStatus
  deleteUserStatus: ApiStatus
  deletingUserId: User['id'] | null
}

const initialState: UsersState = {
  selectedUserId: null,
  fetchUsersStatus: 'IDLE',
  addUserStatus: 'IDLE',
  deleteUserStatus: 'IDLE',
  deletingUserId: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', listUsers)
export const addUser = createAsyncThunk('users/addUser', createUser)
export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (userData: User) => {
    await deleteUser(userData.id)
    return userData
  }
)

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.email.localeCompare(b.email),
})

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      query: () => `user/all`,
      transformResponse: (response: { users: User[] }) => {
        return response.users
      },
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<{ user: User }, User>({
      query: (user) => ({
        url: `user`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Users'],
    }),
    removeUser: builder.mutation<boolean, User>({
      query: (user) => ({
        url: `user/${user.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        dispatch(setDeletingUserId(user.id))
        await queryFulfilled
        dispatch(setDeletingUserId(null))
      },
    }),
  }),
})

export const {
  useFetchUsersQuery,
  useCreateUserMutation,
  useRemoveUserMutation,
} = userApi

export const resetUsers = () => userApi.util.resetApiState()

export const initialiseUsersApi = () => userApi.endpoints.fetchUsers.initiate()

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState<UsersState>(initialState),
  reducers: {
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload
    },
    setDeletingUserId(state, action: PayloadAction<string | null>) {
      state.deletingUserId = action.payload
    },
  },
})

export const { selectUser, setDeletingUserId } = usersSlice.actions

export const usersSelector = usersAdapter.getSelectors<RootState>(
  (state) => state.users
)

export const getSelectedUser = (state: RootState) => {
  return state.users.selectedUserId
    ? usersSelector.selectById(state, state.users.selectedUserId)
    : null
}

export default usersSlice.reducer
