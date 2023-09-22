import axios from 'axios'
import { getTokenTolocalStorage } from '../helpers/localstorage.helper'
export const instance = axios.create({
  baseURL: 'http://localhost:4545',
  headers: { Authorization: 'Bearer' + getTokenTolocalStorage() || '' },
})
