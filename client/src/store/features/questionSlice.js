import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  error: null,
  questions: []
}

export const getQuestions = createAsyncThunk('/questions/get', async (API) => {
  const { data } = await API.get('/questions')
  console.log({ data })
  return data.data
})

export const addQuestion = createAsyncThunk('/questions/create', async ({ API, fields }) => {
  await API.post('/questions', fields)
})

export const deleteQuestion = createAsyncThunk('/questions/delete', async ({ API, id }) => {
  await API.delete(`/questions/${id}`)
})

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
      .addCase(addQuestion.pending, (state) => {
        state.loading = true
      })
      .addCase(addQuestion.fulfilled, (state) => {
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
