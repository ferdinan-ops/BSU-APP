import { apiSlice } from './apiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (fields) => ({
        url: '/auth/login',
        method: 'POST',
        body: fields,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    loginWithGoogleCustom: builder.mutation({
      query: (fields) => ({
        url: '/auth/google-custom',
        method: 'POST',
        body: fields,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    loginWithGoogle: builder.mutation({
      query: (fields) => ({
        url: '/auth/google',
        method: 'POST',
        body: fields,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    register: builder.mutation({
      query: (fields) => ({
        url: '/auth/register',
        method: 'POST',
        body: fields,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
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
