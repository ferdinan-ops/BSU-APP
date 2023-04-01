import CONFIG from '../config/environtment'
import axios from 'axios'

const axiosPublic = axios.create({
  baseURL: CONFIG.baseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'Application/json' }
})

export const login = (fields) => axiosPublic.post('/auth/login', fields)
export const loginWithGoogle = (fields) => axiosPublic.post('/auth/google', fields)
export const loginWithGoogleCustom = (fields) => axiosPublic.post('/auth/google-custom', fields)
export const logout = () => axiosPublic.delete('/logout')
