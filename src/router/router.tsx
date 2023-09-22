import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../pages/Layout'
import { ErrorPage } from '../pages/ErrorPage'
import { Home } from '../pages/Home'
import { TransActions } from '../pages/TransActions'
import { Categories } from '../pages/Categories'
import { Auth } from '../pages/Auth'
import { ProtectedRoute } from 'components/Header/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'transactions',
        element: (
          <ProtectedRoute>
            <TransActions />
          </ProtectedRoute>
        ),
      },
      {
        path: 'categories',
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
])
