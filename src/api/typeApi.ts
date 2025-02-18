import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const createType = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/counselling-type`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getType = async (params: {
  searchQuery?: string;
  limit?: number;
  page?: number;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/counselling-type`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Types:", error);
    return null;
  }
};
export const getTypeById = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/counselling-type/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const updateType = async (
  id: string,
  data: any
): Promise<any | null> => {
  try {
    const response = await axiosInstance.put(`/counselling-type/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const deleteType = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.delete(`/counselling-type/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};
