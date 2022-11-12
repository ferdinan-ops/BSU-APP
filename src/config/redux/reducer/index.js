import { combineReducers } from "redux";
import authReducer from "./authReducer";
import globalReducer from "./globalReducer";
import postReducer from "./postReducer";
import notifReducer from "./notifReducer";
import commentReducer from "./commentReducer";
import profileReducer from "./profileReducer";

const reducer = combineReducers({
  authReducer,
  globalReducer,
  postReducer,
  notifReducer,
  commentReducer,
  profileReducer,
});

export default reducer;