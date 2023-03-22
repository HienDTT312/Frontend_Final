import axios from "axios";
import { isLogin } from "../helpers/isLogin";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(async (config) => {
  if (isLogin()) {
    config.headers.authorization = localStorage.getItem("accessToken");
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 401:
        alert("Login session has expired!");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        break;
      default:
        break;
    }
  }
);

export default axiosClient;
