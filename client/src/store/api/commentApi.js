import { apiSlice } from './apiSlice'

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (questionId) => `/comments/question/${questionId}`,
      providesTags: ['Comment']
    }),
    addComment: builder.mutation({
      query: (fields) => ({
        url: '/comments',
        method: 'POST',
        body: fields,
        credentials: 'include'
      }),
      invalidatesTags: ['Comment']
    }),
    updateComment: builder.mutation({
      query: ({ commentId, comment }) => ({
        url: `/comments/${commentId}`,
        method: 'PUT',
        body: { comment },
        credentials: 'include'
      }),
      invalidatesTags: ['Comment']
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: 'DELETE',
        credentials: 'include'
      }),
      invalidatesTags: ['Comment']
    })
  })
})

export const { useGetCommentsQuery, useAddCommentMutation, useUpdateCommentMutation, useDeleteCommentMutation } =
  commentApi
