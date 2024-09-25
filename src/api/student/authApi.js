
import axios from "axios";
import axiosInstance from "../axiosintercepter";
import { toast } from "react-toastify";

// const baseURL = "https://api-counselling.xpensea.com/api/v1/";
// const baseURL = "/api/v1/";
const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", baseURL);

export const getLogin = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}user/login`, datas);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const edit = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/user/profile/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};