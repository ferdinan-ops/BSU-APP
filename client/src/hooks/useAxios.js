import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import dayjs from 'dayjs'
import { setUserInfo } from '../store/features/authSlice'

const useAxios = ({ contentType }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: { 'Content-Type': contentType, Authorization: `Bearer ${userInfo?.token}` }
  })

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(userInfo?.token)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    if (!isExpired) {
      req.headers.Authorization = `Bearer ${userInfo?.token}`
      return req
    }

    try {
      const { data } = await axios.get('http://localhost:5000/auth/refresh', {
        withCredentials: true,
        headers: { 'Content-Type': 'Application/json' }
      })
      const decoded = jwtDecode(data.accessToken)
      dispatch(setUserInfo({ token: data.accessToken, ...decoded }))
      localStorage.setItem('user', JSON.stringify({ token: data.accessToken, ...decoded }))
      req.headers.Authorization = `Bearer ${data.accessToken}`
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(setUserInfo(null))
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
    return req
  })

  return axiosInstance
}

export default useAxios
