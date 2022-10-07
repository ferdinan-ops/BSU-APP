import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuestions = createAsyncThunk("questions/getQuestions", async () => {
  const response = await axios.get("http://localhost:5000/questions");
  return response.data;
});

const questionsEntity = createEntityAdapter({
  selectId: (question) => question.id
});

const questionSlice = createSlice({
  name: "post",
  initialState: questionsEntity.getInitialState(),
  extraReducers: {
    [getQuestions.fulfilled]: (state, action) => {
      questionsEntity.setAll(state, action.payload);
    }
  }
})

export const questionSelectors = questionsEntity.getSelectors((state) => state.question);
export default questionSlice.reducer;