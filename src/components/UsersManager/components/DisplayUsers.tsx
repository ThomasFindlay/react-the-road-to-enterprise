import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { removeUser, selectUser } from '../usersSlice'

type DisplayUsersProps = {}

const DisplayUsers = (props: DisplayUsersProps) => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.users)

  return (
    <div>
      <h2 className="font-semibold text-xl mb-4">Users</h2>
      <ul className="space-y-3">
        {users.map((user) => {
          return (
            <li key={user.id} className="space-x-3">
              <button
                className="hover:underline"
                onClick={() => dispatch(selectUser(user.id))}
              >
                {user.email}
              </button>
              <button onClick={() => dispatch(removeUser(user))}>X</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DisplayUsers
