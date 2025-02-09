import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getDays = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/times/counsellors/${id}/days`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getTimes = async (
  id: string,
  params: { day?: string; date?: string }
): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/times/counsellors/${id}/times`, {
      params,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getAllTime = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/times`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const addTime = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/times`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const deleteTime = async (id: string, data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/times/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
