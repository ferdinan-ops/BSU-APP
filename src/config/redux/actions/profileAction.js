import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase";
import * as API from "../../hitApi";
import { setLoadingAll } from "./globalAction";

export const setFormProfile = (formType, formValue) => ({ type: "SET_PROFILE_FORM", formType, formValue });
export const setIsLoading = (payload) => ({ type: "SET_PROFILE_BUTTON", payload });
export const setProfileFile = (payload) => ({ type: "SET_PROFILE_FILE", payload });

export const uploadProfileImage = async (photo, file, userId) => {
  const imageRef = ref(storage, `profile/${userId}/${file.name}`);
  await uploadBytes(imageRef, file, "data_url");
  const downloadURL = await getDownloadURL(imageRef);
  photo = downloadURL;
}

export const updateProfile = (userId, formData, file) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await uploadProfileImage(formData.photo, file, userId);
    const { data } = await API.updateProfileAPI(userId, formData);
    dispatch(getProfile(userId));
    dispatch(setIsLoading(false));
    toast.success(data.msg);
    console.log(data);
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error);
  }
}

export const getProfile = (userId) => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.getProfileAPI(userId);
    dispatch({ type: "SET_PROFILE", payload: data.data });
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoadingAll(false));
  }
}

export const getMyQuestions = (userId) => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.getMyQuestionsAPI(userId);
    dispatch({ type: "SET_MY_QUESTIONS", payload: data.data });
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoadingAll(false));
  }
}

export const getSavedQuestions = (userId) => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.getSavedQuestionsAPI(userId);
    dispatch({ type: "SET_SAVED_QUESTIONS", payload: data.data });
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoadingAll(false));
  }
}