import toast from "react-hot-toast";
import * as API from "../../hitApi";

export const setMessage = (payload) => ({ type: "SET_MESSAGE_REPORT", payload });
const setIsLoading = (payload) => ({ type: "SET_LOADING_REPORT", payload });

export const sendReport = (formData) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await API.sendReportAPI(formData);
    dispatch(setMessage(""));
    dispatch(setIsLoading(false));
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
  }
}