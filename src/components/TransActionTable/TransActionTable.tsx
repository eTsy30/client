import { IRespontTratsactionsLoader, ITransactions } from '@/Types/types'
// import { formatDate } from '../../helpers/dateHelper'
import { FC, useEffect, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { formatToUSD } from '../../helpers/curentcyHelper'
import { instance } from '../../api/axios.api'
import ReactPaginate from 'react-paginate'
import './style.scss'
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
      <div className="title__container">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          /////
          activeClassName={'item active '}
          breakClassName={'item break-me '}
          breakLabel={'...'}
          containerClassName={'pagination'}
          disabledClassName={'disabled-page'}
          nextClassName={'item next '}
          nextLabel={<i className="fa-solid fa-caret-right"></i>}
          disabledLinkClassName={'dic'}
          pageClassName={'item pagination-page '}
          previousClassName={'item previous'}
          previousLabel={<i className="fa-solid fa-caret-left"></i>}
        />
        <h5>Transcation history</h5>
      </div>
      <div>
        {data.map((transaction) => {
          return (
            <div className="transActionTable_container" key={transaction.id}>
              <div className="icon_container">
                <i
                  className="fa-brands fa-studiovinari"
                  style={{ color: '#ffff' }}
                ></i>
              </div>
              <div className="title_container">
                <p>{transaction.title}</p>
                <span>{transaction.category?.title || 'other'}</span>
              </div>
              <div
                className={
                  transaction.type === 'income' ? 'red_title' : 'green_title'
                }
              >
                {' '}
                {transaction.type === 'income'
                  ? `+ ${formatToUSD.format(transaction.amount)}`
                  : `- ${formatToUSD.format(transaction.amount)}`}
              </div>
              <div className="icon_container">
                <Form method="delete" action="/transactions">
                  <input type="hidden" name="id" value={transaction.id} />
                  <button>
                    {' '}
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: '#ffff' }}
                    ></i>
                  </button>
                </Form>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
