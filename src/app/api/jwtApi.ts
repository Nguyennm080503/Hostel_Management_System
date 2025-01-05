import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { TokenData } from "../models/User_models";
import { router } from "../route/Route";

const baseURL = process.env.REACT_APP_SERVER;

const jwtApi = axios.create({
  baseURL,
  withCredentials: true,
});

// Lấy token từ storage
const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  }
};


// Gắn accessToken vào API
jwtApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = getToken();
    if (config.headers) {
      if (token) {
        config.headers.Authorization = `Bearer ${token.token}`;
      }

      // Lấy access token mới
      try {
        // const newToken = await getNewAccessToken();
        const newToken = JSON.parse(localStorage.getItem("token") || "") as TokenData;
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken.token}`;
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        console.log(error);
        localStorage.clear();
        router.navigate("/");
        return Promise.reject(error);
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Trường hợp lỗi 401 Unauthorized
jwtApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // Lỗi 401
    if (error.response?.status === 401) {
      console.log("Token expired");

      localStorage.clear();
      router.navigate("/");
      return Promise.reject(error);
    }

    // Lỗi 403
    if (error.response?.status === 403) {
      router.navigate("/error");
    }

    return Promise.reject(error);
  }
);

export default jwtApi;