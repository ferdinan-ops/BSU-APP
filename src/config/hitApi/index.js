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
export const getAllPostAPI = () => API.get("/post");
