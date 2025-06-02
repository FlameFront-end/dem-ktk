import axios from "axios";
import { BASE_SERVER_URL } from "../utils/constants.js";

const instance = axios.create({
  baseURL: `${BASE_SERVER_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
