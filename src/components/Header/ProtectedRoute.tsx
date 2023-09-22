import { useAuth } from 'hooks/useAuth'
import { FC } from 'react' // защита роутеринга
interface Prop {
  children: JSX.Element
}
export const ProtectedRoute: FC<Prop> = ({ children }) => {
  const isAuth = useAuth()
  return (
    <div>
      {isAuth ? (
        children
      ) : (
        <div>
          <h1>To view this page you must be logged in.</h1>
        </div>
      )}
    </div>
  )
}
