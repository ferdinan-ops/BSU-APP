import { configureStore } from '@reduxjs/toolkit'

import commentReducer from './features/commentSlice'
import dialogSlice from './features/dialogSlice'
import authReducer from './features/authSlice'

import { apiSlice } from './api/apiSlice'

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
