import { IRespontTratsactionsLoader, ITransactions } from '@/Types/types'
import { formatDate } from '../../helpers/dateHelper'
import { FC, useEffect, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { formatToUSD } from '../../helpers/curentcyHelper'
import { instance } from '../../api/axios.api'
import ReactPaginate from 'react-paginate'
interface ITransactionTable {
  limit: number
}
export const TransActionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
  const { transactions } = useLoaderData() as IRespontTratsactionsLoader
  const [data, setData] = useState<ITransactions[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const fetchTransaactions = async (page: number) => {
    const response = await instance.get(
      `/transaction/pagination?page=${page}&limit=${limit}`
    )
    setData(response.data)
    setTotalPages(Math.ceil(transactions.length / limit))
  }
  useEffect(() => {
    fetchTransaactions(currentPage)
  }, [currentPage, transactions])
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1)
  }

  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
      />
      <div>
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>Title</td>
              <td>Amount</td>
              <td>Category</td>
              <td>Data</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => {
              return (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.title}</td>
                  <td>
                    {transaction.type === 'income'
                      ? `+ ${formatToUSD.format(transaction.amount)}`
                      : `- ${formatToUSD.format(transaction.amount)}`}
                  </td>
                  <td>{transaction.category?.title || 'other'}</td>
                  <td>{formatDate(transaction.createAt)}</td>
                  <td>
                    <Form method="delete" action="/transactions">
                      <input type="hidden" name="id" value={transaction.id} />
                      <button> del icon</button>
                    </Form>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
