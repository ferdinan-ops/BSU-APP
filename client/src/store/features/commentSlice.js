import { createSlice } from '@reduxjs/toolkit'

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isEdit: false,
    comment: null
  },
  reducers: {
    setIsEdit: (state, { payload }) => {
      state.isEdit = payload
    },
    setComment: (state, { payload }) => {
      state.comment = payload
    }
  }
})

export const { setIsEdit, setComment } = commentSlice.actions
export default commentSlice.reducer
