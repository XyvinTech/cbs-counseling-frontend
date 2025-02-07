import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const resetPassword = async (data: any): Promise<any | null> => {
    try {
      const response = await axiosInstance.post(`/auth/reset-password`, data);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      throw error.response.data
    }
  };