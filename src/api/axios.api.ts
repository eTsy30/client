import axios from 'axios'
import { getTokenTolocalStorage } from '../helpers/localstorage.helper'
export const instance = axios.create({
  baseURL: 'https://fulstask-budget.vercel.app',
  withCredentials: true, // Разрешает отправку куки вместе с запросами
  headers: {
    Authorization: 'Bearer ' + getTokenTolocalStorage() || '',
  },
})
