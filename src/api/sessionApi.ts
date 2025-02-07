import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const createForm = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/sessions/form`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const createSession = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/sessions`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getSessionByUser = async (
  id: string,
  params: { searchQuery?: string; limit?: number; page?: number }
): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/sessions/${id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getCase = async (params: {
  searchQuery?: string;
  limit?: number;
  page?: number;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/sessions/case`, {
      params,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getSessionByCase = async (
  id: string,
  params: { searchQuery?: string; limit?: number; page?: number }
): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/sessions/case/${id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
