import { configureStore } from '@reduxjs/toolkit'

import commentReducer from './features/commentSlice'
import dialogReducer from './features/dialogSlice'
import authReducer from './features/authSlice'

import { apiSlice } from './api/apiSlice'
import searchReducer from './features/searchSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    comment: commentReducer,
    dialog: dialogReducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})
