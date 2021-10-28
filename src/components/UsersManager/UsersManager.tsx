import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import Spinner from '../Spinner'
import AddUsers from './components/AddUsers'
import DisplayUsers from './components/DisplayUsers'
import SelectedUserDetails from './components/SelectedUserDetails'
import { fetchUsers, selectTotalUsers, useFetchUsersQuery } from './usersSlice'

type UsersManagerProps = {}

const UsersManager = (props: UsersManagerProps) => {
  // const dispatch = useAppDispatch()
  // const fetchUsersStatus = useAppSelector((state) => {
  //   return state.users.fetchUsersStatus
  // })
  // const totalUsers = useAppSelector(selectTotalUsers)
  const {
    isError: isFetchUsersError,
    isLoading: isFetchUsersPending,
    isSuccess: isFetchUsersSuccess,
  } = useFetchUsersQuery()

  return (
    <div className="container py-8 mx-auto">
      {isFetchUsersPending ? <Spinner show /> : null}
      {isFetchUsersSuccess ? (
        <div className="grid grid-cols-12 gap-4 px-4">
          <div className="col-span-4">
            <AddUsers />
          </div>
          <div className="col-span-4">
            <DisplayUsers />
          </div>
          <div className="col-span-4">
            <SelectedUserDetails />
          </div>
        </div>
      ) : null}
      {isFetchUsersError ? <p>There was a problem fetching users</p> : null}
    </div>
  )
}

export default UsersManager
