import { setLoadingAll } from "./globalAction";
import * as API from "../../hitApi";

export const getNotification = (userId) => async (dispatch) => {
  try {
    const { data } = await API.getNotificationAPI(userId);
    dispatch({ type: "GET_NOTIFICATION", payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch(setLoadingAll(false));
  }
}

export const deleteNotification = (notifId, userId) => async (dispatch) => {
  try {
    const { data } = await API.deleteNotificationAPI(notifId);
    console.log(data);
    dispatch(getNotification(userId));
  } catch (error) {
    console.log(error);
  }
}