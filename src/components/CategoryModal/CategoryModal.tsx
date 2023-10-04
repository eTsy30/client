import { FC } from 'react'
interface Props {
  type: 'POST' | 'PATCH'
  id?: number
  setVisibleModal: (visible: boolean) => void
}
import './style.scss'
import { Form } from 'react-router-dom'
import { Input } from '../Input/Input'
import { ButtonRed } from '../Button/ButtonRed'
import { ButtonGreen } from '../Button/ButtonGreen'
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
          <ButtonGreen
            type="submit"
            text={type === 'PATCH' ? 'Save' : 'Create'}
          />
          <ButtonRed click={() => setVisibleModal(false)} text="Close" />
        </div>
      </Form>
    </div>
  )
}
