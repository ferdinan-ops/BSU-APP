import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getQuestions = createAsyncThunk('/questions/get', async (API) => {
  const { data } = await API.get('/questions')
  return data.data
})

export const getQuestion = createAsyncThunk('/questions/getDetail', async ({ API, id }) => {
  const { data } = await API.get(`/questions/${id}`)
  return data.data
})

export const addQuestion = createAsyncThunk('/questions/create', async ({ API, fields }) => {
  await API.post('/questions', fields)
})

export const updateQuestion = createAsyncThunk('/questions/update', async ({ API, id, fields }) => {
  await API.put(`/questions/${id}`, fields)
})

export const deleteQuestion = createAsyncThunk('/questions/delete', async ({ API, id }) => {
  await API.delete(`/questions/${id}`)
})

export const likeQuestion = createAsyncThunk('/questions/like', async ({ API, id }) => {
  await API.post(`/questions/like/${id}`)
})

export const saveQuestion = createAsyncThunk('/questions/save', async ({ API, id }) => {
  await API.post(`/questions/save/${id}`)
})

const initialState = {
  loading: true,
  error: null,
  questions: [],
  question: null
}

const questionSlice = createSlice({
  name: 'question',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.loading = true
      })
      .addCase(getQuestions.fulfilled, (state, { payload }) => {
        state.loading = false
        state.questions = payload
      })
      .addCase(getQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(getQuestion.fulfilled, (state, { payload }) => {
        state.question = payload
        state.loading = false
      })
      .addCase(addQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(addQuestion.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(updateQuestion.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteQuestion.fulfilled, (state) => {
        state.loading = false
      })
  }
})

export default questionSlice.reducer
