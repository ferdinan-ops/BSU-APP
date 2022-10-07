import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./features/QuestionSlice";

export const store = configureStore({
  reducer: {
    question: questionReducer,
  }
})