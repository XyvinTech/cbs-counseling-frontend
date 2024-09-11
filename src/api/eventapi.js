import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const addEvent = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/event", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const editEvent = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/event/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteEvent = async (data) => {
  try {
  const response = await axiosInstance.post(`/admin/event/delete-many`, data);
  toast.success(response.data.message);
  return response.data;
} catch (error) {
  toast.error(error.response.data.message);
}
};