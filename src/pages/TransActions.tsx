import { instance } from '../api/axios.api'
import { TransActionsForm } from '../components/TransActionsForm/TransActionsForm'
import { FC } from 'react'
import {
  ICategory,
  IRespontTratsactionsLoader,
  ITransactions,
} from '../Types/types'
import { toast } from 'react-toastify'
import { TransActionTable } from '../components/TransActionTable/TransActionTable'
import { useLoaderData } from 'react-router-dom'
import { formatToUSD } from '../helpers/curentcyHelper'
import { Chart } from '../components/Chart/Chart'

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
  console.log(data)

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
  return (
    <>
      <div>
        {/* add tratsaction form */}
        <div>
          <TransActionsForm />
        </div>
        {/* statistiks blok */}
        <div>
          <div className="grid">
            <div>
              <p>Total income</p>
              <p>{formatToUSD.format(totalIncome)}</p>
            </div>
            <div>
              <p>Total expense</p>
              <p>{formatToUSD.format(totalExpense)}</p>
            </div>
          </div>
          <>
            {' '}
            <Chart
              totalExpense={totalExpense}
              totalIncome={totalIncome}
            ></Chart>
          </>
        </div>
      </div>
      {/* Transactions table */}
      {/* <h1> */}
      <TransActionTable limit={5} />
      {/* </h1> */}
    </>
  )
}
