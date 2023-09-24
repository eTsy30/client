import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'

import { logOutReduser, loginReduser } from '../src/store/user/userSlice'
import { useEffect } from 'react'
import { useAppDispatch } from '../src/store/hook/hooks'
import { getTokenTolocalStorage } from '../src/helpers/localstorage.helper'
import { Authservice } from '../src/services/auth.service'

function App() {
  const dispatch = useAppDispatch()
  const checkAuth = async () => {
    const token = getTokenTolocalStorage()
    console.log(token, 'dfdfdfdf')

    try {
      if (token) {
        const data = await Authservice.getMe()
        console.log(data, 'ffdfff')

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
    checkAuth()
  }, [])

  return <RouterProvider router={router} />
}

export default App
