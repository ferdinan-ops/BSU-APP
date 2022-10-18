import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getDummyUsers = createAsyncThunk("dummyUsers/getDummyUsers", async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APIURI}/users`);
  return data;
});

const userDummyEntity = createEntityAdapter({
  selectId: (dummyUser) => dummyUser.id
});

const userDummySlice = createSlice({
  name: "user",
  initialState: userDummyEntity.getInitialState(),
  extraReducers: {
    [getDummyUsers.fulfilled]: (state, action) => {
      userDummyEntity.setAll(state, action.payload);
    }
  }
});

export const userDummySelectors = userDummyEntity.getSelectors((state) => state.dummyUser);
export default userDummySlice.reducer;
