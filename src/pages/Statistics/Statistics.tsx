import { ICategory, IRespontTratsactionsLoader } from '@/Types/types'
import { Chart } from '../../components/Chart/Chart'
import { useLoaderData } from 'react-router-dom'
import './style.scss'
import { instance } from '../../api/axios.api'
import { useEffect, useState } from 'react'
import { useCategoryCount } from '../../hooks/useCategoryCount'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar'

export const Statistics = () => {
  const [data, setData] = useState<ICategory[]>([])
  const { totalIncome, totalExpense } =
    useLoaderData() as IRespontTratsactionsLoader
  const fetchTransActions = async () => {
    const response = await instance.get(`/categories`)
    setData(response.data)
  }
  useEffect(() => {
    fetchTransActions()
  }, [])

  const result = useCategoryCount(data)

  return (
    <>
      <div className="statistics_container">
        <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
        <div className="total_container">
          <div className="totalIncome_container">
            <p>${totalIncome}</p>
          </div>
          <div className="totalExpense_container">
            <p>${totalExpense}</p>
          </div>
        </div>
      </div>
      <div className="balance__container">
        Balance ${totalIncome - totalExpense}
      </div>
      {result.map((item) => (
        <ProgressBar
          percent={Number(
            (item.count ? (item.count * 100) / totalIncome : 0).toFixed(1)
          )}
          title={item.name}
        />
      ))}
    </>
  )
}
