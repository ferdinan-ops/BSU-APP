import toast from "react-hot-toast";
import * as API from "../../hitApi";

export const setComment = (commentsType, commentsValue) => ({ type: "SET_COMMENTS", commentsType, commentsValue });
export const setIsLoading = (payload) => ({ type: "SET_BUTTON_COMMENT", payload });
export const setQuestionId = (payload) => ({ type: "SET_QUESTIONID", payload });
export const setFormComment = (payload) => ({ type: "FORM_COMMENT", payload });
export const setIsEdit = (payload) => ({ type: "SET_EDIT", payload });

export const getAllComments = (questionId, page) => async (dispatch) => {
  try {
    const { data } = await API.getAllCommentAPI(questionId, page);
    dispatch(setComment("data", data.data));
    dispatch(setComment("isLoadingCard", false));
    dispatch(setComment("counts", data.counts));
  } catch (error) {
    console.log(error);
  }
}

export const createComment = (questionId, formData, page) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await API.createCommentAPI(questionId, formData);
    dispatch(getAllComments(questionId, page));
    dispatch(setIsLoading(false));
    dispatch(setFormComment(""));
    toast.success(data.msg);
  } catch (error) {
    toast.error(error.response.data?.error);
    console.log(error);
    dispatch(setIsLoading(false));
  }
}

export const updateComment = (questionId, commentId, formData, page) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await API.updateCommentAPI(commentId, formData);
    dispatch(getAllComments(questionId, page));
    dispatch(setIsLoading(false));
    dispatch(setFormComment(""));
    dispatch(setIsEdit(false));
    toast.success(data.msg);
  } catch (error) {
    toast.error(error.response.data?.error);
    console.log(error);
    dispatch(setIsLoading(false));
  }
}

export const deleteComment = (questionId, commentId, page) => async (dispatch) => {
  try {
    dispatch(setFormComment(""));
    const { data } = await API.deleteCommentAPI(commentId);
    dispatch(getAllComments(questionId, page));
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
  }
}