import { FC } from 'react'
import './style.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store/hook/hooks'
import { logOutReduser } from '../../store/user/userSlice'
import { toast } from 'react-toastify'
import { removeTokenTolocalStorage } from '../../helpers/localstorage.helper'
import { useAuth } from '../../hooks/useAuth'
import logo from '../../assets/bank.png'
import { Button } from '../Button/Button'
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
      <Link to="/">
        <img className="logo-img" src={logo} alt="Logo" />
        <p className="logo-title">Budget</p>
      </Link>
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
        <Button click={logOut} text="exit" />
      ) : (
        <Link to={'auth'}>Log in /Sing in</Link>
      )}
    </header>
  )
}
