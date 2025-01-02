import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER;

const baseApi = axios.create({
  baseURL,
  withCredentials: false,
});

export default baseApi;