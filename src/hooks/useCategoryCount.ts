import { ICategory, ITransactions } from '@/Types/types'
import { useState, useEffect } from 'react'
interface Idata {
  name: string
  count: number | undefined
}
export const useCategoryCount = (data: ICategory[]) => {
  const [result, setResult] = useState<Idata[]>([])
  useEffect(() => {
    const result = data.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => item.transaction?.length
    )
    const transformedData = result.map((item) => ({
      name: item.title,
      count: item.transaction?.reduce(
        (accumulator: number, currentValue: ITransactions) => {
          if (currentValue.type === 'expense') {
            return accumulator + (currentValue.amount || 0)
          } else {
            return accumulator
          }
        },
        0
      ),
    }))

    setResult(transformedData)
  }, [data])

  return result
}
