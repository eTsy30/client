import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '../pages/Layout'
import { ErrorPage } from '../pages/ErrorPage'
import { Home } from '../pages/Home/Home'
import { TransActions } from '../pages/TransAction/TransActions'
import {
  Categories,
  categoriesAction,
  categoriesLoader,
} from '../pages/Categories/Categories'
import { Auth } from '../pages/Auth/Auth'
import { ProtectedRoute } from '../components/ProtectedRoute'
import {
  transactionAction,
  transactionLoader,
} from '../pages/TransAction/TransActions'
import { Statistics } from '../pages/Statistics/Statistics'
import { Bank, bankAction, bankLoader } from '../pages/Bank/Bank'
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
        loader: transactionLoader,
        action: transactionAction,
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
      {
        path: '/bank',
        loader: bankLoader,
        action: bankAction,
        element: <Bank />,
      },
      {
        path: '/statistics',
        loader: transactionLoader,
        element: (
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
