import { apiSlice } from './apiSlice'

export const reportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    reportComment: builder.mutation({
      query: (body) => ({
        url: '/reports/comment',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Report', 'Notification']
    }),
    reportQuestion: builder.mutation({
      query: (body) => ({
        url: '/reports/question',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Report', 'Notification']
    })
  })
})

export const { useReportCommentMutation, useReportQuestionMutation } = reportApi
