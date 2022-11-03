import toast from "react-hot-toast";
import { createPostAPI } from "../../hitApi";

export const setButtonPostLoading = (payload) => {
  return { type: "SET_BTN_LOADING_POST", payload };
}

export const setForm = (formType, formValue) => {
  return { type: "CREATE_POST", formType, formValue };
};

export const setImgPreview = (payload) => {
  return { type: "SET_IMG_PREVIEW", payload }
}

export const imgPreviewHandler = (e, imgPreview, images) => async (dispatch) => {
  for (let i = 0; i < e.target.files.length; i++) {
    const newImages = e.target.files[i];
    imgPreview.push(URL.createObjectURL(newImages));
    images.push(newImages);
  }
  dispatch(setImgPreview(imgPreview));
  dispatch(setForm("images", images));
}

export const deleteImgPv = (idx, imgPreview, images) => async (dispatch) => {
  const deletedPv = imgPreview.filter((item, index) => index !== idx);
  const deleted = images.filter((item, index) => index !== idx);
  dispatch(setImgPreview(deletedPv));
  dispatch(setForm("images", deleted));
}

export const resetAll = () => {
  dispatch(setForm("mataKuliah", ""));
}

export const createPost = (formData) => async (dispatch) => {
  // try {
  //   dispatch(setButtonPostLoading(true));
  //   // const { data } = await createPostAPI(formData);
  //   console.log({ formData });
  //   // dispatch(resetAll());
  //   // toast.success(data.msg);
  // } catch (error) {
  //   // toast.error(error.response.data.error);
  //   console.log(error);
  //   // dispatch(resetAll());
  // }

  console.log("ktl");
}