import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../pages/Layout'
import { ErrorPage } from '../pages/ErrorPage'
import { Home } from '../pages/Home'
import { TransActions } from '../pages/TransActions'
import {
  Categories,
  categoriesAction,
  categoriesLoader,
} from '../pages/Categories/Categories'
import { Auth } from '../pages/Auth'
import { ProtectedRoute } from '../components/ProtectedRoute'

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
        path: '/transactions',
        element: (
          <ProtectedRoute>
            <TransActions />
          </ProtectedRoute>
        ),
      },
      {
        path: '/categories',
        action: categoriesAction,
        loader: categoriesLoader,
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
