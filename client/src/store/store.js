import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import questionReducer from './features/questionSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    question: questionReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})
