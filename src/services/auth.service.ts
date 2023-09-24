import { instance } from '../api/axios.api'
import { IResponseData, IUser, IuserData } from './../Types/types'
export const Authservice = {
  async registration(userData: IuserData): Promise<IResponseData | undefined> {
    const { data } = await instance.post<IResponseData>('user', userData)
    return data
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async login(userData: IuserData): Promise<IUser | undefined> {
    const { data } = await instance.post<IUser>('auth/login', userData)
    return data
  },
  async getMe(): Promise<IUser | undefined> {
    const { data } = await instance.get<IUser>('auth/profile')
    if (data) return data
  },
}
