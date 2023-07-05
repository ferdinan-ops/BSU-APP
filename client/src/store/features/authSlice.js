import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem('user')) || null,
  register: {
    loading: false,
    error: null
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      const token = payload.accessToken
      const decoded = jwtDecode(token)
      state.userInfo = { ...decoded, token }
      localStorage.setItem('user', JSON.stringify({ ...decoded, token }))
    },
    setLogout: (state) => {
      state.userInfo = null
      localStorage.removeItem('user')
    }
  }
})

export const { setUserInfo, setLogout } = authSlice.actions
export default authSlice.reducer
