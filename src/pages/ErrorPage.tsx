import { FC } from 'react'
import { NavLink } from 'react-router-dom'

export const ErrorPage: FC = () => {
  return (
    <div>
      {' '}
      <NavLink to={'/'}>
        <i className="fa-solid fa-house"></i>
      </NavLink>
    </div>
  )
}
