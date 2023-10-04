import { ICategory, IRespontTratsactionsLoader } from '../../Types/types'
import { FC } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { Input } from '../Input/Input'
import './style.scss'
import { ButtonRed } from '../Button/ButtonRed'
export const TransActionsForm: FC = () => {
  const { categories } = useLoaderData() as IRespontTratsactionsLoader

  return (
    <div className="transactions_container">
      <Form method="POST" className="transactions--form" action="/transactions">
        <label htmlFor="title">
          <span>Title</span>
          <Input type="text" name="title" placeholder="Title" required />
        </label>
        <label htmlFor="Amount">
          <span>Amount</span>
          <Input type="number" name="Amount" placeholder="Amount" required />
        </label>
        {/* select */}
        {categories.length ? (
          <label htmlFor="Category" className="categoty_container">
            <span>Category</span>
            <select name="Category" required>
              {categories.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1>To continue create a category first</h1>
        )}
        <div className="transactiom--radioButton">
          <input
            className="input_income radioButton_input"
            type="radio"
            name="type"
            value={'income'}
            checked
            id="option-1"
          />
          <input
            className="input_expense radioButton_input"
            type="radio"
            name="type"
            value={'expense'}
            id="option-2"
          />
          <label htmlFor="option-1" className="option option-1">
            <span>Income</span>
          </label>
          <label htmlFor="option-2" className="option option-2">
            <span>Expense</span>
          </label>
        </div>
        {/* submit button    */}
        <ButtonRed text="Submit" />
      </Form>
    </div>
  )
}
