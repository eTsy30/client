import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from 'Types/types'

interface IUserStore {
  user: IUser | null
  isAuth: boolean
}

const initialState: IUserStore = {
  user: null,
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReduser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
      state.isAuth = true
    },
    logOutReduser: (state) => {
      state.isAuth = false
      state.user = null
    },
  },
})

export const { loginReduser, logOutReduser } = userSlice.actions

export default userSlice.reducer
