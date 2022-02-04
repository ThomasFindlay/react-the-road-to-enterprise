import { Link } from 'react-router-dom'

type SidebarProps = {}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className="bg-teal-100 h-full px-6 py-4">
      <nav className="flex flex-col items-start space-y-3">
        <Link className="hover:text-teal-700" to="/">
          Home
        </Link>
        <Link className="hover:text-teal-700" to="/profile">
          Profile
        </Link>
        <Link className="hover:text-teal-700" to="/settings">
          Settings
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
