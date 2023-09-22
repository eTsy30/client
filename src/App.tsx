import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'

import { getTokenTolocalStorage } from '../helpers/localstorage.helper'
import { Authservice } from 'services/auth.service'
import { logOutReduser, loginReduser } from 'store/user/userSlice'
import { useEffect } from 'react'
import { useAppDispatch } from '../src/store/hook/hooks'

function App() {
  const dispatch = useAppDispatch()
  const checkAuth = async () => {
    const token = getTokenTolocalStorage()
    try {
      if (token) {
        const data = await Authservice.getMe()
        if (data) {
          dispatch(loginReduser(data))
        } else {
          dispatch(logOutReduser())
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkAuth
  }, [])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
