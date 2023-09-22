export interface IuserData {
  email: string | undefined
  password: string | undefined
}
export interface IResponseUser {
  email: string | undefined
  password: string | undefined
  id: number | undefined
  createAt: string | undefined
  updateAt: string | undefined
}

export interface IResponseData {
  token: string
  user: IResponseUser
}

export interface IUser {
  id: number
  email: string
  token: string
}
