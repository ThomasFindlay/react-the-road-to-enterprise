import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/components/UsersManager/usersSlice'
<<<<<<< HEAD
import { useDispatch, useSelector } from 'react-redux'

=======
>>>>>>> dc81bcb (Removed comments from the store/index.ts file)
export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
