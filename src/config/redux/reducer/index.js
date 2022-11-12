import { combineReducers } from "redux";
import authReducer from "./authReducer";
import globalReducer from "./globalReducer";
import postReducer from "./postReducer";
import notifReducer from "./notifReducer";
import commentReducer from "./commentReducer";

const reducer = combineReducers({
  authReducer,
  globalReducer,
  postReducer,
  notifReducer,
  commentReducer,
});

export default reducer;