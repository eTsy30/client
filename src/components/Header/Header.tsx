import { FC } from 'react'
import './style.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store/hook/hooks'
import { logOutReduser } from '../../store/user/userSlice'
import { toast } from 'react-toastify'
import { removeTokenTolocalStorage } from '../../helpers/localstorage.helper'
import { useAuth } from '../../hooks/useAuth'
import logo from '../../assets/bank.png'
import Bee from '../../assets/icon/bee.svg'
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
        {/* <p className="logo-title">Budget</p> */}
      </Link>
      {isAuth && (
        <nav>
          <ul>
            <li>
              <NavLink className="header__link" to={'/'}>
                <i className="fa-solid fa-house"></i>
              </NavLink>
            </li>
            <li>
              <NavLink className="header__link" to={'categories'}>
                <i className="fa-solid fa-clipboard"></i>
              </NavLink>
            </li>
            <li>
              <NavLink className="header__link" to={'transactions'}>
                <i className="fa-solid fa-square-plus"></i>
              </NavLink>
            </li>
            <li>
              <NavLink className="header__link" to={'statistics'}>
                <i className="fa-solid fa-chart-pie"></i>
              </NavLink>
            </li>
            <li>
              <NavLink className="header__link" to={'statistics'}>
                <img className="icon_link" src={Bee} alt="" />
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {isAuth ? (
        <button className="button__exit" onClick={logOut}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      ) : (
        <Link to={'auth'}>Log in /Sing in</Link>
      )}
    </header>
  )
}
