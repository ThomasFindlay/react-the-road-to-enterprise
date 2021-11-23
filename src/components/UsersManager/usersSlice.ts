import { RootState } from '@/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './UsersManager.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type UsersState = {
  selectedUserId: User['id'] | null
  deletingUserId: User['id'] | null
}

const initialState: UsersState = {
  selectedUserId: null,
  deletingUserId: null,
}

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/api/'
        : '/api/',
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
        // const patchResult = dispatch(
        //   usersApiSlice.util.updateQueryData('fetchUsers', undefined, (draftUsers) =>
        //     draftUsers.filter((_user) => _user.id !== user.id)
        //   )
        // )
        // try {
        //   await queryFulfilled
        // } catch {
        //   patchResult.undo()
        // }
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
} = usersApiSlice

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload
    },
    setDeletingUserId: (state, action: PayloadAction<string | null>) => {
      state.deletingUserId = action.payload
    },
    resetUsersSlice: () => {
      return initialState
    },
  },
})

export const resetUsersApiSlice = () => usersApiSlice.util.resetApiState()

export const initialiseUsersApi = () =>
  usersApiSlice.endpoints.fetchUsers.initiate()

export const { selectUser, setDeletingUserId, resetUsersSlice } =
  usersSlice.actions

export const getSelectedUser = (users?: User[]) => (state: RootState) => {
  return users && state.users.selectedUserId
    ? users.find((user) => user.id === state.users.selectedUserId)
    : null
}

export default usersSlice.reducer
