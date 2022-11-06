import Cookies from "js-cookie";
import toast from "react-hot-toast";
import * as API from "../../hitApi";
import { setLoadingAll } from "./globalAction";

export const registerAction = (formData, resetAll, Router) => async (dispatch) => {
  const { username, email, password } = formData;

  dispatch(setIsLoading(true));
  if (!username && !email && !password) {
    toast('Mohon isi data anda dengan benar', { icon: '⚠️' });
    return dispatch(setIsLoading(false));
  }

  try {
    const { data } = await API.registerAPI(formData);
    Cookies.set("bsuToken", data.token);
    resetAll();
    dispatch(setIsLoading(false));
    toast.success(data.msg);
    Router.push("/");
  } catch (error) {
    toast.error(error.response.data?.error);
    resetAll();
  }
}

export const loginAction = (formData, resetAll, Router) => async (dispatch) => {
  const { email, password } = formData;

  dispatch(setIsLoading(true));
  if (!email && !password) {
    toast('Mohon isi data anda dengan benar', { icon: '⚠️' });
    return dispatch(setIsLoading(false));
  }

  try {
    const { data } = await API.loginAPI(formData);
    Cookies.set("bsuToken", data.token);
    resetAll();
    dispatch(setIsLoading(false));
    toast.success(data.msg);
    Router.push("/");
  } catch (error) {
    toast.error(error.response.data?.error);
    dispatch(setIsLoading(false));
    resetAll();
  }
}

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.currentUserAPI();
    dispatch({ type: "AUTH", payload: data.data });
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
  }
}

export const setIsLoading = (payload) => {
  return { type: "LOADING", payload };
};
