import toast from "react-hot-toast";
import * as API from "../../hitApi";

export const setAllComments = (payload) => ({ type: "SET_ALL_COMMENTS", payload });
export const setIsLoading = (payload) => ({ type: "SET_BUTTON_COMMENT", payload });
export const setFormComment = (payload) => ({ type: "FORM_COMMENT", payload });

export const getAllComments = (questionId) => async (dispatch) => {
  try {
    const { data } = await API.getAllCommentAPI(questionId);
    dispatch(setAllComments(data.data));
  } catch (error) {
    console.log(error);
  }
}

export const createComment = (questionId, formData) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await API.createCommentAPI(questionId, formData);
    dispatch(getAllComments(questionId));
    dispatch(setIsLoading(false));
    dispatch(setFormComment(""));
    toast.success(data.msg);
  } catch (error) {
    toast.error(error.response.data?.error);
    console.log(error);
    dispatch(setIsLoading(false));
  }
}

export const updateComment = (commentId, formData) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await API.updateCommentAPI(commentId, formData);
    dispatch(setIsLoading(false));
    toast.success(data.msg);
  } catch (error) {
    toast.error(error.response.data?.error);
    console.log(error);
    dispatch(setIsLoading(false));
  }
}

export const deleteComment = (commentId, questionId) => async (dispatch) => {
  try {
    dispatch(setFormComment(""));
    const { data } = await API.deleteCommentAPI(commentId);
    dispatch(getAllComments(questionId));
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
  }
}