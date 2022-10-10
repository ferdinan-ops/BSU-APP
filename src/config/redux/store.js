import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./features/QuestionSlice";
import userReducer from "./features/UserSilce";

export const store = configureStore({
  reducer: {
    question: questionReducer,
    user: userReducer,
  }
})