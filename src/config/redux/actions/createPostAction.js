import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import toast from "react-hot-toast";
import * as API from "../../hitApi";
import { allCategories, allFakultas, allSemester } from "../../../utils/listData";

export const setButtonPostLoading = (payload) => {
  return { type: "SET_BTN_LOADING_POST", payload };
}

export const setForm = (formType, formValue) => {
  return { type: "CREATE_POST", formType, formValue };
};

export const setImgPreview = (payload) => {
  return { type: "SET_IMG_PREVIEW", payload }
}

export const setImgFile = (payload) => {
  return { type: "SET_IMG_FILE", payload };
}

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

export const createPost = (formData, imgFile) => async (dispatch) => {
  const { images, userId } = formData;

  try {
    dispatch(setButtonPostLoading(true));
    await uploadImageToCloud(images, imgFile, userId);
    const { data } = await API.createPostAPI(formData);
    toast.success(data.msg);
    dispatch(resetAll());
  } catch (error) {
    console.log(error);
  }
}

const uploadImageToCloud = async (images, imgFile, userId) => {
  for (let i = 0; i < imgFile.length; i++) {
    const imageRef = ref(storage, `questions/${userId}/${imgFile[i].name}`);
    await uploadBytes(imageRef, imgFile[i], "data_url");
    const downloadURL = await getDownloadURL(imageRef);
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
