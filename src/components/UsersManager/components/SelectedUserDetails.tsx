import { useAppSelector } from '@/store/hooks'
import { getSelectedUser, useFetchUsersQuery } from '../usersSlice'

type SelectedUserDetailsProps = {}

const SelectedUserDetails = (props: SelectedUserDetailsProps) => {
  const { data: users } = useFetchUsersQuery()
  const selectedUser = useAppSelector(getSelectedUser(users))
  return (
    <div>
      <h2 className="font-semibold text-xl mb-4">Selected User Details</h2>
      {selectedUser ? (
        <ul>
          <li>ID: {selectedUser.id}</li>
          <li>Name: {selectedUser.name}</li>
          <li>Email: {selectedUser.email}</li>
        </ul>
      ) : (
        <p>Select a user to see more details</p>
      )}
    </div>
  )
}

export default SelectedUserDetails
