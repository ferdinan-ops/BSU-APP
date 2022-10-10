import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuestions = createAsyncThunk("questions/getQuestions", async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_APIURI}/questions`);
  return data;
});

const questionsEntity = createEntityAdapter({
  selectId: (question) => question.id
});

const questionSlice = createSlice({
  name: "question",
  initialState: questionsEntity.getInitialState(),
  extraReducers: {
    [getQuestions.fulfilled]: (state, action) => {
      questionsEntity.setAll(state, action.payload);
    }
  }
})

export const questionSelectors = questionsEntity.getSelectors((state) => state.question);
export default questionSlice.reducer;