import { allCategories, allFakultas, allSemester } from "../../../utils/listData";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { setLoadingAll } from "./globalAction";
import { storage } from "../../firebase";
import toast from "react-hot-toast";
import * as API from "../../hitApi";

export const setForm = (formType, formValue) => ({ type: "SET_QUESTION_FORM", formType, formValue });
export const setIsLoading = (payload) => ({ type: "SET_BTN_LOADING_POST", payload });
export const setQuestions = (questionsType, questionsValue) => ({ type: "SET_QUESTION", questionsType, questionsValue });

export const uploadHandler = async (images, files, userId, mataKuliah) => {
  for (const imgUpload of files) {
    const imageRef = ref(storage, `questions/${userId}/${mataKuliah} - ${Date.now()}`);
    await uploadString(imageRef, imgUpload, "data_url").then(async () => {
      const downloadURL = await getDownloadURL(imageRef);
      images.push(downloadURL);
    });
  }
}

export const uploadUpdated = async (images, files, userId, mataKuliah, imgUpdated) => {
  const fileUpload = files.filter((e) => imgUpdated.indexOf(e) === -1);
  const fileNotUpload = files.filter((e) => imgUpdated.indexOf(e) !== -1);

  for (const imgUpload of fileUpload) {
    const imageRef = ref(storage, `questions/${userId}/${mataKuliah} - ${Date.now()}`);
    await uploadString(imageRef, imgUpload, "data_url").then(async () => {
      const downloadURL = await getDownloadURL(imageRef);
      fileNotUpload.push(downloadURL);
    });
  }
  for (const allImages of fileNotUpload) images.push(allImages);
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
  dispatch(setIsLoading(false));
}


export const getQuestionByIdUpdate = (id) => async (dispatch) => {
  try {
    dispatch(setLoadingAll(true));
    const { data } = await API.getPostByIdAPI(id);
    dispatch(setForm("mataKuliah", data.data.mataKuliah));
    dispatch(setForm("fakultas", data.data.fakultas));
    dispatch(setForm("programStudi", data.data.programStudi));
    dispatch(setForm("tahunAjaran", data.data.tahunAjaran));
    dispatch(setForm("semester", data.data.semester));
    dispatch(setForm("kategori", data.data.kategori));
    dispatch(setForm("dosen", data.data.dosen));
    dispatch(setForm("userId", data.data.user._id));
    dispatch(setForm("imgUpdated", data.data.images));
    dispatch(setLoadingAll(false));
  } catch (error) {
    console.log(error);
  }
}

// CONNECT TO API
export const createQuestion = (formData, Router) => async (dispatch) => {
  try {
    const { data } = await API.createPostAPI(formData);
    dispatch(resetAll());
    toast.success(data.msg);
    Router.push("/");
  } catch (error) {
    console.log(error);
  }
}

export const updateQuestion = (id, formData, router) => async (dispatch) => {
  try {
    const { data } = await API.updatePostAPI(id, formData);
    dispatch(resetAll());
    toast.success(data.msg);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
}

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    const { data } = await API.deletePostAPI(id);
    dispatch(getAllQuestions());
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
  }
}

export const getAllQuestions = (filter, page) => async (dispatch) => {
  try {
    let allData = {};
    if (!filter) {
      const { data } = await API.getAllPostAPI(page);
      allData = data;
    } else {
      const { data } = await API.filterByFakultasAPI(filter, page);
      allData = data;
    }
    dispatch(setQuestions("data", allData.data));
    dispatch(setQuestions("counts", allData.counts));
    dispatch(setQuestions("isLoading", false));
  } catch (error) {
    console.log(error);
  }
}

export const getQuestionById = (id) => async (dispatch) => {
  try {
    const { data } = await API.getPostByIdAPI(id);
    dispatch({ type: "SET_DETAIL_QUESTION", payload: data.data });
  } catch (error) {
    console.log(error);
    dispatch(setLoadingAll(false));
  }
}

export const likePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await API.likePostAPI(postId, userId);
    dispatch({ type: "SET_DETAIL_QUESTION", payload: data.data });
    dispatch(getQuestionById(postId));
  } catch (error) {
    console.log(error);
  }
}

export const savePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await API.savePostAPI(postId, userId);
    dispatch({ type: "SET_DETAIL_QUESTION", payload: data.data });
    dispatch(getQuestionById(postId));
  } catch (error) {
    console.log(error);
  }
}

export const searchQuestions = (keyword, filter, page) => async (dispatch) => {
  try {
    let allData = {};
    if (!filter) {
      const { data } = await API.searchQuestionsAPI(keyword, page);
      allData = data;
    } else {
      const { data } = await API.filterByFakultasAPI(filter, page);
      allData = data;
    }
    console.log({ allData });
    dispatch(setQuestions("data", allData.data));
    dispatch(setQuestions("counts", allData.counts));
    dispatch(setQuestions("isLoading", false));
  } catch (error) {
    console.log(error);
  }
}

export const getMataKuliah = () => async (dispatch) => {
  try {
    const { data } = await API.getMataKuliahAPI();
    dispatch({ type: "SET_MATAKULIAH", payload: data.data });
  } catch (error) {
    console.log(error);
  }
}