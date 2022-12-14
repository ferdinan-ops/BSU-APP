import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "Application/json" }
});

API.interceptors.request.use((req) => {
  const token = Cookies.get("bsuToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerAPI = (formData) => API.post("/auth/register", formData);
export const loginAPI = (formData) => API.post("/auth/login", formData);
export const currentUserAPI = () => API.get("/auth/login");

export const createPostAPI = (formData) => API.post("/post", formData);
export const getAllPostAPI = (page) => API.get(`/post?page=${page}`);
export const getPostByIdAPI = (postId) => API.get(`/post/${postId}`);
export const updatePostAPI = (postId, formData) => API.put(`/post/${postId}`, formData);
export const deletePostAPI = (postId) => API.delete(`/post/${postId}`);
export const likePostAPI = (postId, userId) => API.patch(`/post/${postId}/likes`, userId);
export const savePostAPI = (postId, userId) => API.patch(`/post/${postId}/save`, userId);
export const searchQuestionsAPI = (keyword, page) => API.get(`/search/${keyword}?page=${page}`);
export const getMataKuliahAPI = () => API.get("/search/");

export const getAllFakultasAPI = () => API.get("/post/fakultas");
export const filterByFakultasAPI = (fakultas, page) => API.get(`/post/fakultas/${fakultas}?page=${page}`);

export const getNotificationAPI = (userId, page) => API.get(`notification/${userId}?page=${page}`);
export const deleteNotificationAPI = (userId) => API.delete(`/notification/${userId}`);

export const getAllCommentAPI = (postId, page) => API.get(`/comment/${postId}?page=${page}`);
export const createCommentAPI = (postId, formData) => API.post(`/comment/${postId}`, formData);
export const updateCommentAPI = (commentId, formData) => API.patch(`/comment/${commentId}`, formData);
export const deleteCommentAPI = (commentId) => API.delete(`/comment/${commentId}`);

export const getProfileAPI = (userId) => API.get(`/user/${userId}`);
export const getMyQuestionsAPI = (userId, page) => API.get(`/user/${userId}/myPost?page=${page}`);
export const getSavedQuestionsAPI = (userId, page) => API.get(`/user/${userId}/savedPost?page=${page}`);
export const updateProfileAPI = (userId, formData) => API.patch(`/user/${userId}`, formData);

export const sendReportAPI = (formData) => API.post("/report/", formData);