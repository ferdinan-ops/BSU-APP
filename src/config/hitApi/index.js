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

export const register = (formData) => API.post("/auth/register", formData);
export const login = (formData) => API.post("/auth/login", formData);
export const currentUser = () => API.get("/auth/login");
export const createPostAPI = (formData) => API.post("/post", formData);
