import { toast } from "react-toastify";
import { handleAsync } from "../../utils/handleAsync";
import axiosInstance from "../axiosintercepter";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const addTime = async (data) => {
  try {
    const response = await axiosInstance.post("/counsellor/times", data);
    // toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getTime = handleAsync(async (data) => {
  const response = await axiosInstance.get("/counsellor/times", data);
  return response.data;
});
export const getSlot = handleAsync(async (id, filter) => {
  const response = await axios.get(`${baseURL}user/counseller/${id}/times`, {
    params: filter,
  });
  return response.data;
});
export const counsellorTimeSlot = handleAsync(async (id, filter) => {
  const response = await axiosInstance.get(
    `/counsellor/counsellors/${id}/times`,
    {
      params: filter,
    }
  );
  return response.data;
});
export const allTimeSlot = handleAsync(async (id) => {
  const response = await axios.get(`${baseURL}user/counseller/full-times/${id}`);
  return response.data;
});

export const deleteSingleTime = async (id, data) => {
  try {
    const response = await axiosInstance.post(
      `/counsellor/counsellors/${id}/time`,
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
