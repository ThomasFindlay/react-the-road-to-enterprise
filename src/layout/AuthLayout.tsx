import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import styles from './authLayout.module.css'

type AuthLayoutProps = {}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <div className={styles.authLayout}>
      <div className="col-span-2 row-span-1">
        <Header />
      </div>
      <main className="col-span-1">
        <Outlet />
      </main>
      <div className="col-span-2">
        <Footer />
      </div>
    </div>
  )
}

export default AuthLayout
