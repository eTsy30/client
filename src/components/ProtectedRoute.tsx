import { useAuth } from '../hooks/useAuth'
import { FC } from 'react' // защита роутеринга
interface Props {
  children: JSX.Element
}
export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth()
  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div>
          <h1>To view this page you must be logged in.</h1>
        </div>
      )}
    </>
  )
}
