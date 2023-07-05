import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import commentReducer from './features/commentSlice'
import { apiSlice } from './api/apiSlice'
import dialogSlice from './features/dialogSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    comment: commentReducer,
    dialog: dialogSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})
