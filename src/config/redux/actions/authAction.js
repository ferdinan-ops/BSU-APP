import toast from "react-hot-toast";
import * as API from "../../hitApi";

export const registerAction = (formData, resetAll) => async (dispatch) => {
  const { username, email, password } = formData;

  dispatch(setIsLoading(true));
  if (!username && !email && !password) {
    toast('Mohon isi data anda dengan benar', { icon: '⚠️' });
    return dispatch(setIsLoading(false));
  }

  try {
    const { data } = await API.register(formData);
    dispatch({ type: "AUTH", payload: data.data });
    toast.success("Akun anda berhasil dibuat!");
    dispatch(setIsLoading(false));
    resetAll();
  } catch (error) {
    toast.error(error.response.data.error);
    resetAll();
  }
}

export const loginAction = (formData) => async (dispatch) => {
  const { email, password } = formData;

  dispatch(setIsLoading(true));
  if (!email && !password) {
    toast('Mohon isi data anda dengan benar', { icon: '⚠️' });
    return dispatch(setIsLoading(false));
  }

  try {

  } catch (error) {

  }
}

export const setIsLoading = (payload) => {
  return { type: "LOADING", payload };
};
