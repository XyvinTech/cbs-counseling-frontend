import axios from "axios";
import axiosInstance from "../axiosintercepter";
import { toast } from "react-toastify";
// const baseURL = "https://counseling-str5.onrender.com/api/v1/";
// const baseURL = "/api/v1/";
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api/v1/";
console.log("API Base URL:", baseURL);

// Use baseURL for making API requests

// const baseURL = "http://localhost:3300/api/v1/";
export const getLogin = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}admin/login`, datas);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const addForm = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}user/form`, datas);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const sendOtp = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}admin/send-otp`, datas);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const resetPassword = async (datas) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}admin/reset-password`,
      datas
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const verifyOtp = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}admin/verify-otp`, datas);
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

export const upload = async (file) => {
  try {
    // Create FormData and append the file to it
    const formData = new FormData();
    formData.append("file", file); // 'file' should match the multer field name in the backend

    // Send a POST request with the form data
    const response = await axiosInstance.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure correct headers for file upload
      },
    });
    return response.data;
  } catch (error) {
    // Error notification
    const errorMsg =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "An error occurred during file upload";
    toast.error(errorMsg);
  }
};

export const deleteFile = async (filePath) => {
  try {
    const response = await axiosInstance.delete(`/delete`, {
      data: { filePath },
    });
    toast.success(response.data);
  } catch (error) {
    toast.error("Error deleting the file.");
  }
};
export const getGrDetails = async (data) => {
  try {
    const response = await axios.get(`${baseURL}user/student/${data}`);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
