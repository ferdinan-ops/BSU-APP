import { combineReducers } from "redux";
import authReducer from "./authReducer";
import globalReducer from "./globalReducer";
import postReducer from "./postReducer";
import notifReducer from "./notifReducer";

const reducer = combineReducers({
  authReducer,
  globalReducer,
  postReducer,
  notifReducer,
});

export default reducer;