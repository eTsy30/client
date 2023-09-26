import { FC } from 'react'
interface Props {
  type: 'POST' | 'PATCH'
  id?: number
  setVisibleModal: (visible: boolean) => void
}
import './style.scss'
import { Form } from 'react-router-dom'
import { Input } from '../Input/Input'
export const CategoryModal: FC<Props> = ({ type, id, setVisibleModal }) => {
  return (
    <div className="categoryModal">
      <Form
        onSubmit={() => setVisibleModal(false)}
        method={type}
        action="/categories"
        className="categoryModal_form"
      >
        <label htmlFor="title">
          <small className="label">Category title</small>
          <Input type="text" name="title" placeholder="title" />
          <Input type="hidden" name="id" value={id} />
        </label>
        <div className="button-group">
          <button type="submit">{type === 'PATCH' ? 'Save' : 'Create'}</button>
          <button onClick={() => setVisibleModal(false)}>Close</button>
        </div>
      </Form>
    </div>
  )
}
