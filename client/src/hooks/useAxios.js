import axios from 'axios'
import { useAuthContext } from '../context/authContext'
import jwtDecode from 'jwt-decode'
import dayjs from 'dayjs'

const useAxios = ({ contentType }) => {
  const { setUserInfo, userInfo } = useAuthContext()

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
      setUserInfo({ token: data.accessToken, ...decoded })
      req.headers.Authorization = `Bearer ${data.accessToken}`
      return req
    } catch (error) {
      if (error.response.status === 401) {
        setUserInfo(null)
        window.location.href = '/login'
      }
    }
  })

  return axiosInstance
}

export default useAxios
