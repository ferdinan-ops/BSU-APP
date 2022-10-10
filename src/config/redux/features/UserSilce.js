import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APIURI}/users`);
  return data;
});

const userEntity = createEntityAdapter({
  selectId: (user) => user.id
});

const userSlice = createSlice({
  name: "user",
  initialState: userEntity.getInitialState(),
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      userEntity.setAll(state, action.payload);
    }
  }
});

export const userSelectors = userEntity.getSelectors((state) => state.user);
export default userSlice.reducer;
