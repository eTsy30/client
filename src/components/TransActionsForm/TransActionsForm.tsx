import { ICategory, IRespontTratsactionsLoader } from '../../Types/types'
import { FC, useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { CategoryModal } from '../CategoryModal/CategoryModal'

export const TransActionsForm: FC = () => {
  const { categories } = useLoaderData() as IRespontTratsactionsLoader
  const [visibleModal, setvisibleModal] = useState<boolean>(false)
  return (
    <div>
      <Form method="POST" action="/transactions">
        <label htmlFor="title">
          <span>Title</span>
          <input type="text" name="title" placeholder="Title" required />
        </label>
        <label htmlFor="Amount">
          <span>Amount</span>
          <input type="number" name="Amount" placeholder="Amount" required />
        </label>
        {/* select */}
        {categories.length ? (
          <label htmlFor="Category">
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
        <button onClick={() => setvisibleModal(true)}>
          {' '}
          <span>Manage categories</span>
        </button>
        {/* radio button  */}
        <div>
          <label>
            <input type="radio" name="type" value={'income'} />
            <span>Income</span>
          </label>
          <label>
            <input type="radio" name="type" value={'expense'} />
            <span>Expense</span>
          </label>
        </div>
        {/* submit button    */}
        <button> Submit</button>
      </Form>
      {visibleModal && (
        <CategoryModal type="POST" setVisibleModal={setvisibleModal} />
      )}
    </div>
  )
}
