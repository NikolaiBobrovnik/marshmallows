import axios from 'axios'
import { API_URL } from 'constants/API'

export let axiosAPI = axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export let axiosLocal = axios.create({
  baseURL: '/server/',
  withCredentials: true
})
