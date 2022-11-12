import { allCategories, allFakultas, allSemester } from "../../../utils/listData";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setLoadingAll } from "./globalAction";
import { storage } from "../../firebase";
import toast from "react-hot-toast";
import * as API from "../../hitApi";

export const setForm = (formType, formValue) => ({ type: "SET_QUESTION_FORM", formType, formValue });
export const setButtonPostLoading = (payload) => ({ type: "SET_BTN_LOADING_POST", payload });
export const setAllQuestions = (payload) => ({ type: "SET_ALL_QUESTION", payload });
export const setImgPreview = (payload) => ({ type: "SET_IMG_PREVIEW", payload });
export const setImgFile = (payload) => ({ type: "SET_IMG_FILE", payload });

export const imgPreviewHandler = (e, imgPreview, imgFile) => async (dispatch) => {
  for (let i = 0; i < e.target.files.length; i++) {
    const newImages = e.target.files[i];
    imgPreview.push(URL.createObjectURL(newImages));
    imgFile.push(newImages);
  }
  dispatch(setImgPreview(imgPreview));
  dispatch(setImgFile(imgFile));
}

export const deleteImgPv = (idx, imgPreview, imgFile) => async (dispatch) => {
  const deletedPv = imgPreview.filter((item, index) => index !== idx);
  const deleted = imgFile.filter((item, index) => index !== idx);
  dispatch(setImgPreview(deletedPv));
  dispatch(setImgFile(deleted));
}

const uploadImageToCloud = async (images, imgFile, userId) => {
  for (let i = 0; i < imgFile.length; i++) {
    const imageRef = ref(storage, `questions/${userId}/${imgFile[i].name}`);
    await uploadBytes(imageRef, imgFile[i], "data_url");
    const downloadURL = await getDownloadURL(imageRef);
    console.log(downloadURL);
    images.push(downloadURL);
  }
}

export const resetAll = () => async (dispatch) => {
  dispatch(setForm("mataKuliah", ""));
  dispatch(setForm("fakultas", allFakultas[4]));
  dispatch(setForm("programStudi", ""));
  dispatch(setForm("tahunAjaran", ""));
  dispatch(setForm("semester", allSemester[0]));
  dispatch(setForm("kategori", allCategories[2]));
  dispatch(setForm("dosen", ""));
  dispatch(setForm("images", []));
  dispatch(setForm("userId", ""));
  dispatch(setButtonPostLoading(false));
  dispatch(setImgPreview([]));
  dispatch(setImgFile([]));
}


export const getQuestionByIdUpdate = (id) => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.getPostByIdAPI(id);
    console.log(data);
    dispatch(setForm("mataKuliah", data.data.mataKuliah));
    dispatch(setForm("fakultas", data.data.fakultas));
    dispatch(setForm("programStudi", data.data.programStudi));
    dispatch(setForm("tahunAjaran", data.data.tahunAjaran));
    dispatch(setForm("semester", data.data.semester));
    dispatch(setForm("kategori", data.data.kategori));
    dispatch(setForm("dosen", data.data.dosen));
    dispatch(setForm("userId", data.data.user._id));
    // dispatch(setForm("images", data.data.images));
    dispatch(setImgPreview(data.data.images));
    dispatch(setImgFile(data.data.images));
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
  }
}

// CONNECT TO API
export const createQuestion = (formData, imgFile, Router) => async (dispatch) => {
  const { images, userId } = formData;

  try {
    dispatch(setButtonPostLoading(true));
    await uploadImageToCloud(images, imgFile, userId);
    const { data } = await API.createPostAPI(formData);
    dispatch(resetAll());
    toast.success(data.msg);
    Router.push("/");
  } catch (error) {
    console.log(error);
  }
}

export const updateQuestion = (id, formData, imgFile, router) => async (dispatch) => {
  const { images, userId } = formData;
  try {
    dispatch(setButtonPostLoading(true));
    await uploadImageToCloud(images, imgFile, userId);
    // const { data } = await API.updatePostAPI(id, formData);
    dispatch(setButtonPostLoading(false));
  } catch (error) {
    console.log(error);
  }
}

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.deletePostAPI(id);
    dispatch(getAllQuestions());
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
  }
}

export const getAllQuestions = () => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.getAllPostAPI();
    dispatch(setAllQuestions(data.data));
    dispatch({ type: "SET_FILTERED_QUESTION", payload: data.data });
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoadingAll(false));
  }
}

export const getQuestionById = (id) => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.getPostByIdAPI(id);
    dispatch({ type: "SET_DETAIL_QUESTION", payload: data.data });
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoadingAll(false));
  }
}

export const likePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await API.likePostAPI(postId, userId);
    dispatch({ type: "SET_DETAIL_QUESTION", payload: data.data });
  } catch (error) {
    console.log(error);
  }
}

export const savePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await API.savePostAPI(postId, userId);
    dispatch({ type: "SET_DETAIL_QUESTION", payload: data.data });
  } catch (error) {
    console.log(error);
  }
}