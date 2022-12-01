import { setLoadingAll } from "./globalAction";
import * as API from "../../hitApi";
import toast from "react-hot-toast";

export const setNotif = (notifType, notifValue) => ({ type: "SET_NOTIFICATION", notifType, notifValue });

export const getNotification = (userId, page) => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.getNotificationAPI(userId, page);
    dispatch(setNotif("data", data.data));
    dispatch(setNotif("counts", data.counts));
    dispatch(setNotif("isLoading", false));
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoadingAll(false));
  }
}

export const deleteNotification = (notifId, userId, page) => async (dispatch) => {
  try {
    const { data } = await API.deleteNotificationAPI(notifId);
    dispatch(getNotification(userId, page));
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
  }
}