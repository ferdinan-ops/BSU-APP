import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { storage } from "../../firebase";
import * as API from "../../hitApi";
import { getCurrentUser } from "./authAction";
import { setLoadingAll } from "./globalAction";

export const setFormProfile = (formType, formValue) => ({ type: "SET_PROFILE_FORM", formType, formValue });
export const setIsLoading = (payload) => ({ type: "SET_PROFILE_BUTTON", payload });

export const uploadProfileImage = async (file, userId) => {
  const imageRef = ref(storage, `profile/${userId}/${file.name}`);
  await uploadBytes(imageRef, file, "data_url");
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
}


export const updateProfile = (userId, username, file, photo) => async (dispatch) => {
  let formData = { username, photo };
  try {
    dispatch(setIsLoading(true));

    if (file) {
      const getPhoto = await uploadProfileImage(file, userId);
      formData = { ...formData, photo: getPhoto };
    }

    const { data } = await API.updateProfileAPI(userId, formData);

    dispatch(getProfile(userId));
    dispatch(getCurrentUser());
    dispatch(setIsLoading(false));
    toast.success(data.msg);
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