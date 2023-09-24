import { FC } from 'react'
interface Props {
  type: 'POST' | 'PATCH'
  id?: number
  setVisibleModal: (visible: boolean) => void
}
import './style.scss'
import { Form } from 'react-router-dom'
export const CategoryModal: FC<Props> = ({ type, id, setVisibleModal }) => {
  console.log({ type, setVisibleModal })

  return (
    <div className="categoryModal">
      <Form
        onSubmit={() => setVisibleModal(false)}
        method={type}
        action="/categories"
        className="categoryModal_form"
      >
        <label htmlFor="title">
          <small>Category title</small>
          <input type="text" name="title" placeholder="title" />
          <input type="hidden" name="id" value={id} />
        </label>
        <div>
          <button type="submit">{type === 'PATCH' ? 'Save' : 'Create'}</button>
          <button onClick={() => setVisibleModal(false)}>Close</button>
        </div>
      </Form>
    </div>
  )
}
