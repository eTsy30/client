import { FC } from 'react'
import './style.scss'
interface IButton {
  text: string
  click?: React.MouseEventHandler<HTMLButtonElement>
  icon?: string
}
export const Button: FC<IButton> = ({ text, click, icon }) => {
  return (
    <button className="button" onClick={click}>
      <img src={icon} alt="" />
      {text}
    </button>
  )
}
