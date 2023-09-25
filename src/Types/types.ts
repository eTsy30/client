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

export interface ICategory {
  title: string
  id: number
  createdAt: string
  updatedAt: string
  transactions?: []
}
export interface IRespontTratsactionsLoader {
  categories: ICategory[]
  transactions: ITransactions[]
  totalIncome: number
  totalExpense: number
}
export interface ITransactions {
  amount: number
  createAt: string
  updateAt: string
  title: string
  type: string
  id: number
  category: ICategory
}
