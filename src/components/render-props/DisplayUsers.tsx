import ListManager from './ListManager'
import users from './users.json'

const usersData = users.slice(0, 5)
type DisplayUsersProps = {}
const DisplayUsers = (props: DisplayUsersProps) => {
  return (
    <div>
      <h3 className="text-md md:text-lg font-semibold mb-4">Display Users</h3>

      <div>
        <ListManager
          items={usersData}
          keyExtractor={(user) => user.id}
          renderItem={(item) => (
            <div className="p-4 shadow border border-gray-300 max-w-xs mb-4 mx-auto">
              {item.name}
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default DisplayUsers
