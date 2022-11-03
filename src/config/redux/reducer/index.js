import { combineReducers } from "redux";
import authReducer from "./authReducer";
import globalReducer from "./globalReducer";
import createPostReducer from "./createPostReducer";

const reducer = combineReducers({
  authReducer,
  globalReducer,
  createPostReducer
});

export default reducer;