import { combineReducers } from "redux";
import authReducer from "./authReducer";
import globalReducer from "./globalReducer";
import postReducer from "./postReducer";

const reducer = combineReducers({
  authReducer,
  globalReducer,
  postReducer
});

export default reducer;