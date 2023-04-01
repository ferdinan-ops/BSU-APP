import { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import * as axiosPublic from '../utils/axiosPublic'

export const AuthContext = createContext({})
export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')) || null)

  const login = (accessToken) => {
    const decoded = jwtDecode(accessToken)
    setUserInfo({ ...decoded, token: accessToken })
  }

  const logout = async () => {
    setUserInfo(null)
    localStorage.removeItem('user')
    await axiosPublic.logout()
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userInfo))
  }, [userInfo])

  return <AuthContext.Provider value={{ login, logout, userInfo, setUserInfo }}>{children}</AuthContext.Provider>
}
