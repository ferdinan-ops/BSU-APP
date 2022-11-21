import { combineReducers } from "redux";
import authReducer from "./authReducer";
import globalReducer from "./globalReducer";
import postReducer from "./postReducer";
import notifReducer from "./notifReducer";
import commentReducer from "./commentReducer";
import profileReducer from "./profileReducer";
import reportReducer from "./reportReducer";

const reducer = combineReducers({
  authReducer,
  globalReducer,
  postReducer,
  notifReducer,
  commentReducer,
  profileReducer,
  reportReducer,
});

export default reducer;