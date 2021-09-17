import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect } from 'react'
import AddUsers from './components/AddUsers'
import DisplayUsers from './components/DisplayUsers'
import SelectedUserDetails from './components/SelectedUserDetails'
import { fetchUsers } from './usersSlice'

type UsersManagerProps = {}

const UsersManager = (props: UsersManagerProps) => {
  const dispatch = useAppDispatch()
  const fetchUsersStatus = useAppSelector(
    (state) => state.users.fetchUsersStatus
  )

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div className="container py-8 mx-auto">
      {fetchUsersStatus === 'pending' ? <p>Loading users...</p> : null}
      {fetchUsersStatus === 'success' ? (
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
    </div>
  )
}

export default UsersManager
