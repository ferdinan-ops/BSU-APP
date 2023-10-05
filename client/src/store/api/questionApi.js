import { apiSlice } from './apiSlice'
export const questionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (page) => `/questions?page=${page}`,
      providesTags: ['Question']
    }),
    getQuestion: builder.query({
      query: (questionId) => `/questions/${questionId}`,
      providesTags: ['Question']
    }),
    getQuestionsByKeyword: builder.query({
      query: ({ search, page }) => `/questions?search=${search}&page=${page}`,
      providesTags: ['Question']
    }),
    likeQuestion: builder.mutation({
      query: (questionId) => ({
        url: `/questions/like/${questionId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Question']
    }),
    saveQuestion: builder.mutation({
      query: (questionId) => ({
        url: `/questions/save/${questionId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Question']
    }),
    createQuestion: builder.mutation({
      query: (body) => ({
        url: '/questions',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Question']
    }),
    updateQuestion: builder.mutation({
      query: ({ questionId, body }) => ({
        url: `/questions/${questionId}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Question']
    }),
    deleteQuestion: builder.mutation({
      query: (questionId) => ({
        url: `/questions/${questionId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Question']
    })
  })
})

export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useGetQuestionsByKeywordQuery,
  useLikeQuestionMutation,
  useSaveQuestionMutation,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation
} = questionApi
