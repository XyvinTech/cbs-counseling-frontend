import { toast } from "react-toastify";
import axiosInstance from "../axiosintercepter";
import { handleAsync } from "../../utils/handleAsync";

export const addStudent = async (data) => {
  try {
    const response = await axiosInstance.post("/admin/student", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addStudentBulk = async (data) => {
  try {
    console.log(data);

    const response = await axiosInstance.post("/admin/student/add-bulk", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const editStudent = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/student/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
