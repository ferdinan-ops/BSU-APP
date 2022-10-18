import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: { currentUser: null },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = null;
    }
  }
});

export const { login, logout } = currentUserSlice.actions;
export default currentUserSlice.reducer;