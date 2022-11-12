import toast from "react-hot-toast";
import * as API from "../../hitApi";

export const setIsLoading = (payload) => ({ type: "SET_BUTTON_COMMENT", payload });
export const setFormComment = (payload) => ({ type: "FORM_COMMENT", payload });
export const setIsEdit = (payload) => ({ type: "SET_EDIT", payload });
export const setQuestionId = (payload) => ({ type: "SET_QUESTIONID", payload });

export const getAllComments = (questionId) => async (dispatch) => {
  try {
    const { data } = await API.getAllCommentAPI(questionId);
    dispatch(({ type: "SET_ALL_COMMENTS", payload: data.data }));
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

export const updateComment = (questionId, commentId, formData) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await API.updateCommentAPI(commentId, formData);
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

export const deleteComment = (questionId, commentId) => async (dispatch) => {
  try {
    dispatch(setFormComment(""));
    const { data } = await API.deleteCommentAPI(commentId);
    dispatch(getAllComments(questionId));
    toast.success(data.msg);
  } catch (error) {
    console.log(error);
  }
}