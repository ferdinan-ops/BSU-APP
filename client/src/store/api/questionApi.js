import { apiSlice } from './apiSlice'
export const questionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => '/questions',
      providesTags: ['Question']
    }),
    getQuestion: builder.query({
      query: (questionId) => `/questions/${questionId}`,
      providesTags: ['Question']
    }),
    likeQuestion: builder.mutation({
      query: (questionId) => ({
        url: `/questions/like/${questionId}`,
        method: 'POST'
      })
    }),
    saveQuestion: builder.mutation({
      query: (questionId) => ({
        url: `/questions/save/${questionId}`,
        method: 'POST'
      })
    })
  })
})

export const { useGetQuestionsQuery, useGetQuestionQuery, useLikeQuestionMutation, useSaveQuestionMutation } =
  questionApi
