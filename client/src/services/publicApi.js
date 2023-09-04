import CONFIG from '../constants/environtment'
import axios from 'axios'

const publicApi = axios.create({
  baseURL: CONFIG.baseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'Application/json' }
})

/* AUTH */
export const loginAPI = (fields) => publicApi.post('/auth/login', fields)
export const loginWithGoogleAPI = (fields) => publicApi.post('/auth/google', fields)
export const loginWithGoogleCustomAPI = (fields) => publicApi.post('/auth/google-custom', fields)
export const logoutAPI = () => publicApi.delete('/auth/logout')
export const registerAPI = (fields) => publicApi.post('/auth/register', fields)
