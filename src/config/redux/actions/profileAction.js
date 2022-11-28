import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setLoadingAll } from "./globalAction";
import { getCurrentUser } from "./authAction";
import { storage } from "../../firebase";
import toast from "react-hot-toast";
import * as API from "../../hitApi";

export const setFormProfile = (formType, formValue) => ({ type: "SET_PROFILE_FORM", formType, formValue });
export const setProfileQuestions = (questType, questValue) => ({ type: "SET_PROFILE_QUESTIONS", questType, questValue });
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

export const getProfileQuestions = (userId, page, filter) => async (dispatch) => {
  try {
    let allData = {};
    if (filter === "tabs1") {
      const { data } = await API.getMyQuestionsAPI(userId, page);
      allData = data;
    } else {
      const { data } = await API.getSavedQuestionsAPI(userId, page);
      allData = data;
    }
    dispatch(setProfileQuestions("data", allData.data));
    dispatch(setProfileQuestions("counts", allData.counts));
    dispatch(setProfileQuestions("isLoading", false));
  } catch (error) {
    console.log(error);
  }
}