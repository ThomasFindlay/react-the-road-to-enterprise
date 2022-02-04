import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import AuthLayout from './layout/AuthLayout'
import DashboardLayout from './layout/DashboardLayout'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Dashboard from './views/dashboard/Dashboard'
import Profile from './views/dashboard/Profile'
import Settings from './views/dashboard/Settings'
import Welcome from './views/dashboard/Welcome'

function App() {
  return (
    <BrowserRouter>
      <div className="App mx-auto max-w-6xl text-center my-8">
        <h1 className="font-semibold text-2xl">
          React - The Road To Enterprise
        </h1>

        <nav className="my-8 space-x-4">
          <Link to="/">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>

        <div>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />}>
                <Route index element={<Welcome />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
