import axios from 'axios'
import { getTokenTolocalStorage } from '../helpers/localstorage.helper'
export const instance = axios.create({
  baseURL: 'https://fulstask-budget.vercel.app', //http://localhost:4545
  headers: { Authorization: 'Bearer ' + getTokenTolocalStorage() || '' },
})
