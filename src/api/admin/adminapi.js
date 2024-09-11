import axios from "axios";
import axiosInstance from "../axiosintercepter";
import { toast } from "react-toastify";
const baseURL = "https://counseling-str5.onrender.com/api/v1/";
export const getLogin = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}admin/login`, datas);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/admin");
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const deleteUser = async (data) => {
  try {
    const response = await axiosInstance.post(`/admin/user/delete-many`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getDashboard = async (filter) => {
  try {
    const response = await axiosInstance.get("/admin/dashboard", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const edit = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/admin/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
