import { createSlice } from '@reduxjs/toolkit'

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    isOpen: false,
    variant: '',
    title: '',
    content: '',
    handler: null,
    buttonText: '',
    isLoading: false
  },
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = true
      state.variant = action.payload.variant
      state.title = action.payload.title
      state.content = action.payload.content
      state.handler = action.payload.handler
      state.buttonText = action.payload.buttonText
    },
    closeDialog: (state) => {
      state.isOpen = false
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsOpen: (state, action) => {
      state.isOpen = true
    }
  }
})

export const { closeDialog, openDialog, setIsLoading, setIsOpen } = dialogSlice.actions
export default dialogSlice.reducer
