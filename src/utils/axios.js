import axios from "axios";
import { BASE_URL } from "../config";

const axiosInstance = axios.create({ baseURL: BASE_URL });

axios.interceptors.response.use(
  (response) => response, // in case there is no error return the response
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong."
    )
);

export default axiosInstance;
