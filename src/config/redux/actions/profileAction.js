import * as API from "../../hitApi";
import { setLoadingAll } from "./globalAction";

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