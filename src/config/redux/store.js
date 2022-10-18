import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./features/QuestionSlice";
import userReducer from "./features/UserSilce";
import userDummyReducer from "./features/dummy/UserDummySlice";
import questionDummyReducer from "./features/dummy/QuestionDummySlice";
import CurrentUserReducer from "./features/CurrentUserSlice";

export const store = configureStore({
  reducer: {
    question: questionReducer,
    user: userReducer,
    currentUser: CurrentUserReducer,
    dummyUser: userDummyReducer,
    dummyQuestion: questionDummyReducer,
  }
})