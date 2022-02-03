import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import { useUserStore } from './store/userStore'
import Permission from './components/common/permission/Permission'
const Home = lazy(() => import('./views/Home'))
const Admin = lazy(() => import('./views/Admin'))
const Forbidden = lazy(() => import('./views/Forbidden'))
const Moderator = lazy(() => import('./views/Moderator'))

function App() {
  const setUser = useUserStore((store) => store.setUser)

  useEffect(() => {
    setUser({
      id: '1',
      name: 'Thomas',
      roles: ['moderator', 'admin'],
    })
  }, [])

  return (
    <div className="App mx-auto max-w-6xl text-center my-8">
      <h1 className="font-semibold text-2xl">React - The Road To Enterprise</h1>
      <BrowserRouter>
        <nav className="py-8 space-x-4 ">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/moderator">Moderator</Link>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/admin"
              element={
                <Permission
                  roles={['admin']}
                  noAccess={<Navigate to="/forbidden" />}
                >
                  <Admin />
                </Permission>
              }
            />
            <Route
              path="/moderator"
              element={
                <Permission
                  roles={['moderator', 'admin']}
                  noAccess={<Navigate to="/forbidden" />}
                >
                  <Moderator />
                </Permission>
              }
            />
            <Route path="/forbidden" element={<Forbidden />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
