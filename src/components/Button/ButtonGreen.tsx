import { FC } from 'react'
import './style.scss'
interface IButton {
  text: string
  click?: React.MouseEventHandler<HTMLButtonElement>
  icon?: string
  type?: 'button' | 'submit' | 'reset'
}
export const ButtonGreen: FC<IButton> = ({ text, click, icon, type }) => {
  return (
    <button className="buttonGreen" type={type} onClick={click}>
      <img src={icon} alt="" />
      {text}
    </button>
  )
}
