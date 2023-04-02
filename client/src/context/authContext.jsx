import { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import * as axiosPublic from '../services/axiosPublic'

export const AuthContext = createContext({})
export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')) || null)

  const login = async (fields) => {
    const { data } = await axiosPublic.login(fields)
    const token = data.accessToken
    const decoded = jwtDecode(token)
    localStorage.setItem('user', JSON.stringify({ ...decoded, token }))
    setUserInfo({ ...decoded, token })
  }

  const loginWithGoogleCustom = async (fields) => {
    const { data } = await axiosPublic.loginWithGoogleCustom(fields)
    const token = data.accessToken
    const decoded = jwtDecode(token)
    localStorage.setItem('user', JSON.stringify({ ...decoded, token }))
    setUserInfo({ ...decoded, token })
  }

  const loginWithGoogle = async (fields) => {
    const { data } = await axiosPublic.loginWithGoogle(fields)
    const token = data.accessToken
    const decoded = jwtDecode(token)
    localStorage.setItem('user', JSON.stringify({ ...decoded, token }))
    setUserInfo({ ...decoded, token })
  }

  const logout = async () => {
    localStorage.removeItem('user')
    await axiosPublic.logout()
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userInfo))
  }, [userInfo])

  return (
    <AuthContext.Provider value={{ login, logout, loginWithGoogle, loginWithGoogleCustom, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  )
}
