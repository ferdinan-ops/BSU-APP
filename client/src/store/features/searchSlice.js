import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: { page: 1 },
  reducers: {
    setSearchPage: (state, action) => {
      state.page = action.payload
    }
  }
})

export const { setSearchPage } = searchSlice.actions
export default searchSlice.reducer
