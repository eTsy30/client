import { Header } from '../components/Header/Header'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
export const Layout: FC = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
