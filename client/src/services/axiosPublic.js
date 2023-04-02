import CONFIG from '../constants/environtment'
import axios from 'axios'

const axiosPublic = axios.create({
  baseURL: CONFIG.baseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'Application/json' }
})

/* AUTH */
export const loginAPI = (fields) => axiosPublic.post('/auth/login', fields)
export const loginWithGoogleAPI = (fields) => axiosPublic.post('/auth/google', fields)
export const loginWithGoogleCustomAPI = (fields) => axiosPublic.post('/auth/google-custom', fields)
export const logoutAPI = () => axiosPublic.delete('/logout')
export const registerAPI = (fields) => axiosPublic.post('/auth/register', fields)
