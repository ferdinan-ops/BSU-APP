import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUserInfo, setLogout } from '../features/authSlice'
import CONFIG from '../../constants/environtment'

const baseQuery = fetchBaseQuery({
  baseUrl: CONFIG.baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    console.log('sending refresh token')
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    console.log(refreshResult)
    if (refreshResult?.data) {
      api.dispatch(setUserInfo(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(setLogout())
      window.location.reload()
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Question', 'Comment', 'User', 'Notification', 'Report'],
  endpoints: (builder) => ({})
})
