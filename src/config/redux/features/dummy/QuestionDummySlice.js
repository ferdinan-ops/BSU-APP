import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getDummyQuestions = createAsyncThunk("dummyQuestions/getDummyQuestions", async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APIURI}/questions`);
  return data;
});

const questionsDummyEntity = createEntityAdapter({
  selectId: (question) => question.id
});

const questionDummySlice = createSlice({
  name: "question",
  initialState: questionsDummyEntity.getInitialState(),
  extraReducers: {
    [getDummyQuestions.fulfilled]: (state, action) => {
      questionsDummyEntity.setAll(state, action.payload);
    }
  }
})

export const questionDummySelectors = questionsDummyEntity.getSelectors((state) => state.dummyQuestion);
export default questionDummySlice.reducer;