import { FC } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import './style.scss'
const COLORS = ['red', 'green']

interface IChart {
  totalIncome: number
  totalExpense: number
}
interface IData {
  value: number
  name: string
}

export const Chart: FC<IChart> = ({ totalIncome, totalExpense }) => {
  const data = new Array<IData>(
    { value: totalExpense, name: 'Expense' },
    { value: totalIncome, name: 'Income' }
  )
  return (
    <div className="chart__container">
      <PieChart width={200} height={300}>
        <Pie
          data={data}
          cx={'50%'}
          cy={'50%'}
          innerRadius={60}
          outerRadius={80}
          fill="none"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  )
}
