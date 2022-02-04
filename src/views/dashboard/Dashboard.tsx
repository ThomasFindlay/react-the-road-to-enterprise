import { Outlet } from 'react-router-dom'

type DashboardProps = {}

const Dashboard = (props: DashboardProps) => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Dashboard
