import Cookies from "js-cookie";
import toast from "react-hot-toast";
import * as API from "../../hitApi";
import { setLoadingAll } from "./globalAction";

export const registerAction = (formData, resetAll) => async (dispatch) => {
  const { username, email, password } = formData;

  dispatch(setIsLoading(true));
  if (!username && !email && !password) {
    toast('Mohon isi data anda dengan benar', { icon: '⚠️' });
    return dispatch(setIsLoading(false));
  }

  try {
    const { data } = await API.register(formData);
    toast.success(data.msg);
    dispatch(setIsLoading(false));
    Cookies.set("bsuToken", data.token);
    resetAll();
  } catch (error) {
    toast.error(error.response.data?.error);
    resetAll();
  }
}

export const loginAction = (formData, resetAll) => async (dispatch) => {
  const { email, password } = formData;

  dispatch(setIsLoading(true));
  if (!email && !password) {
    toast('Mohon isi data anda dengan benar', { icon: '⚠️' });
    return dispatch(setIsLoading(false));
  }

  try {
    const { data } = await API.login(formData);
    toast.success(data.msg);
    Cookies.set("bsuToken", data.token);
    dispatch(setIsLoading(false));
    resetAll();
  } catch (error) {
    toast.error(error.response.data?.error);
    resetAll();
  }
}

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.currentUser();
    dispatch({ type: "AUTH", payload: data.data });
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
  }
}

export const setIsLoading = (payload) => {
  return { type: "LOADING", payload };
};
