import { instance } from '../../api/axios.api'
import { TransActionsForm } from '../../components/TransActionsForm/TransActionsForm'
import { FC, useEffect } from 'react'
import './style.scss'
import {
  ICategory,
  IRespontTratsactionsLoader,
  ITransactions,
} from '../../Types/types'
import { toast } from 'react-toastify'
import { TransActionTable } from '../../components/TransActionTable/TransActionTable'
import { useLoaderData } from 'react-router-dom'
import { formatToUSD } from '../../helpers/curentcyHelper'

export const transactionLoader = async () => {
  const categories = await instance.get<ICategory>('/categories')
  const transactions = await instance.get<ITransactions>('/transaction')
  const totalIncome = await instance.get<number>('/transaction/income/find')
  const totalExpense = await instance.get<number>('/transaction/expense/find')
  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  }

  return data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transactionAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData()
      const newTransActions = {
        title: formData.get('title'),
        amount: formData.get('Amount'),
        category: formData.get('Category'),
        type: formData.get('type'),
      }
      await instance.post('/transaction', newTransActions)
      toast.success('Transactions added')
      return null
    }

    case 'DELETE': {
      const formData = await request.formData()
      const transactionId = formData.get('id')
      await instance.delete(`/transaction/transaction/${transactionId}`)
      toast.success('Transactions deleted')
      return null
    }

    default:
      break
  }
  return null
}

export const TransActions: FC = () => {
  const { totalIncome, totalExpense } =
    useLoaderData() as IRespontTratsactionsLoader
  useEffect(() => {}, [totalIncome, totalExpense])

  return (
    <>
      <div className="transActions">
        {/* add tratsaction form */}

        <TransActionsForm />

        {/* statistiks blok */}
        <div className="transActions-grid">
          <div className="grid">
            <div className="grid__container">
              <p className="title">Total income</p>
              <div className="grid__wrapper">
                <p className="income">{formatToUSD.format(totalIncome)}</p>
                <i
                  className="fa-solid fa-arrow-trend-up"
                  style={{ color: '#349002' }}
                ></i>
              </div>
            </div>
            <div className="grid__container">
              <p className="title">Total expense</p>
              <div className="grid__wrapper">
                <p className="expense">{formatToUSD.format(totalExpense)}</p>
                <i
                  className="fa-solid fa-arrow-trend-down"
                  style={{ color: '#ff0000' }}
                ></i>
              </div>
            </div>
          </div>
          <> </>
        </div>
      </div>
      {/* Transactions table */}
      {/* <h1> */}
      <TransActionTable limit={5} />
      {/* </h1> */}
    </>
  )
}
