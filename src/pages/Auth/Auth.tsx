import React, { FC, useState } from 'react'
import './style.scss'
import { toast } from 'react-toastify'
import { Authservice } from '../../services/auth.service'
import { useAppDispatch } from '../../store/hook/hooks'
import { loginReduser } from '../../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { setTokenTolocalStorage } from '../../helpers/localstorage.helper'
import { Input } from '../../components/Input/Input'
import { ButtonRed } from '../../components/Button/ButtonRed'
export const Auth: FC = () => {
  const [email, setemail] = useState<string>()
  const [password, setpassword] = useState<string>()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const registration = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const userData = { email, password }
      const data = await Authservice.registration(userData)
      if (data) {
        toast.success('Account create')
        setIsLogin(!isLogin)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error.toString())
    }
  }
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await Authservice.login({ email, password })
      if (data) {
        setTokenTolocalStorage('token', data.token)
        dispatch(loginReduser(data))
        toast.success('You logged!')
        navigate('/')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error.toString())
    }
  }
  return (
    <div className="auth">
      <h1>{isLogin ? 'Login' : 'Registration'}</h1>
      <form className="auth__form" onSubmit={isLogin ? login : registration}>
        <Input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <Input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        {isLogin ? <ButtonRed text="Login" /> : <ButtonRed text="Register" />}
      </form>
      <div>
        {isLogin ? (
          <button className="button-link" onClick={() => setIsLogin(!isLogin)}>
            You don´t have account
          </button>
        ) : (
          <button className="button-link" onClick={() => setIsLogin(!isLogin)}>
            Already have an account?
          </button>
        )}
      </div>
    </div>
  )
}
