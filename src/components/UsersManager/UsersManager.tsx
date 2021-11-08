import Spinner from '../Spinner'
import AddUsers from './components/AddUsers'
import DisplayUsers from './components/DisplayUsers'
import SelectedUserDetails from './components/SelectedUserDetails'
import { useFetchUsersQuery } from './usersSlice'

type UsersManagerProps = {}

const UsersManager = (props: UsersManagerProps) => {
  const {
    data: users,
    isError: isFetchUsersError,
    isLoading: isFetchUsersPending,
    isSuccess: isFetchUsersSuccess,
  } = useFetchUsersQuery()

  return (
    <div className="container py-8 mx-auto">
      {isFetchUsersPending ? <Spinner show /> : null}
      {isFetchUsersSuccess && users?.length ? (
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
