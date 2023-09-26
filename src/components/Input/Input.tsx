/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler, FC } from 'react'
import './style.scss'
interface Iinput {
  type?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: any
  placeholder?: string
  name?: string
}
export const Input: FC<Iinput> = ({
  type,
  onChange,
  value,
  placeholder,
  name,
}) => {
  return (
    <input
      className="input"
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      name={name}
    />
  )
}
