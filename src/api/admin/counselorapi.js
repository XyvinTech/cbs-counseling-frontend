import { toast } from "react-toastify";
import { handleAsync } from "../../utils/handleAsync";
import axiosInstance from "../axiosintercepter";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const addCounselor = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/counsellor", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addCounselorBulk = async (data) => {
  try {
    console.log(data);

    const response = await axiosInstance.post(
      "/admin/counsellor/add-bulk",
      data
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const editCounsellor = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/counsellor/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getUser = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/admin/user/${id}`);

  return response.data;
});
//get all counselors with type
export const fetchCounselor = handleAsync(async (filter) => {
  const response = await axios.get(`${baseURL}user/counsellors`, {
    params: filter,
  });
  return response.data;
});

export const allCounselor = handleAsync(async (filter) => {
  const response = await axiosInstance.get("/counsellor/counsellors", {
    params: filter,
  });
  return response.data;
});
export const editCounselor = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/counsellor/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const edit = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/counsellor/profile/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getCalendar = handleAsync(async () => {
  const response = await axiosInstance.get(`counsellor/big-calendar`);

  return response.data;
});
export const getPdfReport = handleAsync(async () => {
  const response = await axiosInstance.post(`counsellor/student-report`);

  return response.data;
});
export const getExcelData = handleAsync(async () => {
  const response = await axiosInstance.get(`counsellor/sessions-excel`);

  return response.data;
});
export const fetchTypeList = handleAsync(async (filter) => {
  const response = await axiosInstance.get("/admin/list", {
    params: filter,
  });
  return response.data;
});
