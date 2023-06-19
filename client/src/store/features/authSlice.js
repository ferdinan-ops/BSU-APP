import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import * as publicApi from '../../services/publicApi'

export const login = createAsyncThunk('/auth/login', async (fields, { rejectWithValue }) => {
  try {
    const { data } = await publicApi.loginAPI(fields)
    return data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const loginWithGoogleCustom = createAsyncThunk('/auth/google-custom', async (fields) => {
  const { data } = await publicApi.loginWithGoogleCustomAPI(fields)
  return data
})

export const loginWithGoogle = createAsyncThunk('/auth/google', async (fields) => {
  const { data } = await publicApi.loginWithGoogleAPI(fields)
  return data
})

export const register = createAsyncThunk('/auth/register', async (fields, { rejectWithValue }) => {
  try {
    const { data } = await publicApi.registerAPI(fields)
    return data.message
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const logout = createAsyncThunk('/auth/logout', async () => {
  await publicApi.logoutAPI()
})

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.userInfo = payload
        state.loading = false
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
      })
      .addCase(loginWithGoogleCustom.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload
      })
      .addCase(loginWithGoogle.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null
      })
      .addCase(register.pending, ({ register }) => {
        register.loading = true
      })
      .addCase(register.fulfilled, ({ register }) => {
        register.loading = false
      })
      .addCase(register.rejected, ({ register }, { payload }) => {
        register.loading = false
        register.error = payload
      })
  }
})

export const { setUserInfo, setLogout } = authSlice.actions
export default authSlice.reducer
