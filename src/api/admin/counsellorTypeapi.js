import { toast } from "react-toastify";
import axiosInstance from "../axiosintercepter";

export const addType = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/counselling-type", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const editType = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/admin/counselling-type/${id}`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const deleteType = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/admin/counselling-type/delete-many`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
