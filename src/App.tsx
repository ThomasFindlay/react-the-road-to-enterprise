import './App.css'
import UsersManager from './components/UsersManager/UsersManager'
import {
  resetUsersSlice,
  resetUsersApiSlice,
  initialiseUsersApi,
} from './components/UsersManager/usersSlice'
import { resetStore } from './store'
import { useAppDispatch } from './store/hooks'

function App() {
  const dispatch = useAppDispatch()

  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl">React - The Road To Enterprise</h1>
      <main>
        <div className="space-x-4 my-8">
          <button
            className="shadow px-4 py-3 bg-blue-100"
            onClick={() => {
              dispatch(resetUsersSlice())
              dispatch(resetUsersApiSlice())
            }}
          >
            Reset users slice
          </button>
          <button
            className="shadow px-4 py-3 bg-blue-100"
            onClick={() => dispatch(resetStore())}
          >
            Reset store
          </button>
          <button
            className="shadow px-4 py-3 bg-blue-100"
            onClick={() => dispatch(initialiseUsersApi())}
          >
            Fetch users
          </button>
        </div>
        <UsersManager />
      </main>
    </div>
  )
}

export default App
