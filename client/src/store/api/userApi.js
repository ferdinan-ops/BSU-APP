import { apiSlice } from './apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: ['User']
    }),
    getUserQuestions: builder.query({
      query: (userId, page) => `/users/${userId}/my-post?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data)
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg
      },
      providesTags: ['Question']
    }),
    getUserSaveQuestions: builder.query({
      query: (userId, page) => `/users/${userId}/save-post?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data)
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg
      },
      providesTags: ['Question']
    }),
    getUserLikeQuestions: builder.query({
      query: (userId, page) => `/users/${userId}/like-post?page=${page}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems) => {
        currentCache.data.push(...newItems.data)
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg
      },
      providesTags: ['Question']
    }),
    updateUserData: builder.mutation({
      query: (fields) => ({
        url: '/users',
        method: 'PUT',
        body: fields
      }),
      invalidatesTags: ['User']
    })
  })
})

export const {
  useGetUserQuery,
  useGetUserQuestionsQuery,
  useGetUserSaveQuestionsQuery,
  useGetUserLikeQuestionsQuery,
  useUpdateUserDataMutation
} = userApi
