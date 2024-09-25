import axios from "axios";
import axiosInstance from "../axiosintercepter";
import { toast } from "react-toastify";

// const baseURL = "https://api-counselling.xpensea.com/api/v1/";
// const baseURL = "/api/v1/";
const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", baseURL);

export const getLogin = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}counsellor/login`, datas);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getCounselor = async () => {
  try {
    const response = await axiosInstance.get("/counsellor");
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
