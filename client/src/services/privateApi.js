import axios from 'axios'
import CONFIG from '../constants/environtment'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout, setUserInfo } from '../store/features/authSlice'
import { useNavigate } from 'react-router-dom'

const privateApi = ({ contentType }) => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)

  const navigate = useNavigate()

  const axiosInstance = axios.create({
    baseURL: CONFIG.baseUrl,
    withCredentials: true,
    headers: { 'Content-Type': contentType, Authorization: `Bearer ${userInfo?.token}` }
  })

  axiosInstance.interceptors.request.use(async (req) => {
    // const isExpired = dayjs.unix(userInfo?.exp).diff(dayjs()) < 1
    // if (!isExpired) {
    // req.headers.Authorization = `Bearer ${userInfo?.token}`
    // return req
    // }

    try {
      const { data } = await axios.get(CONFIG.baseUrl + '/auth/refresh', {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      })
      dispatch(setUserInfo({ accessToken: data.accessToken }))
      req.headers.Authorization = `Bearer ${data.accessToken}`
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(setLogout())
        navigate('/login', { replace: true })
      }
    }
    return req
  })

  return axiosInstance
}

export default privateApi
