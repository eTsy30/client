import { FC } from 'react'
import './style.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAppDispatch } from '../../store/hook/hooks'
import { logOutReduser } from 'store/user/userSlice'
import { removeTokenTolocalStorage } from '../../../helpers/localstorage.helper'
import { toast } from 'react-toastify'
export const Header: FC = () => {
  const isAuth = useAuth()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const logOut = () => {
    dispatch(logOutReduser())
    removeTokenTolocalStorage('token')
    toast.success('You logged out ')
    navigate('/auth')
  }
  return (
    <header className="header">
      <Link to="/">LOGO </Link>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'categories'}>Categories</NavLink>
            </li>
            <li>
              <NavLink to={'transactions'}>Transaction</NavLink>
            </li>
          </ul>
        </nav>
      )}
      {isAuth ? (
        <button onClick={logOut}>exit</button>
      ) : (
        <Link to={'auth'}>Log in /Sing in</Link>
      )}
    </header>
  )
}
