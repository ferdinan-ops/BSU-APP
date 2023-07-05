import { setLogout, setUserInfo } from '../features/authSlice'
import { apiSlice } from './apiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (fields) => ({
        url: '/auth/login',
        method: 'POST',
        body: fields,
        credentials: 'include'
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setUserInfo(data))
        } catch (err) {
          console.log(err)
        }
      }
    }),
    loginWithGoogleCustom: builder.mutation({
      query: (fields) => ({
        url: '/auth/google-custom',
        method: 'POST',
        body: fields,
        credentials: 'include'
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setUserInfo(data))
        } catch (err) {
          console.log(err)
        }
      }
    }),
    loginWithGoogle: builder.mutation({
      query: (fields) => ({
        url: '/auth/google',
        method: 'POST',
        body: fields,
        credentials: 'include'
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setUserInfo(data))
        } catch (err) {
          console.log(err)
        }
      }
    }),
    register: builder.mutation({
      query: (fields) => ({
        url: '/auth/register',
        method: 'POST',
        body: fields,
        credentials: 'include'
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'DELETE',
        credentials: 'include'
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(setLogout())
        } catch (err) {
          console.log(err)
        }
      }
    })
  })
})

export const {
  useLoginMutation,
  useLoginWithGoogleCustomMutation,
  useLoginWithGoogleMutation,
  useRegisterMutation,
  useLogoutMutation
} = authApi
