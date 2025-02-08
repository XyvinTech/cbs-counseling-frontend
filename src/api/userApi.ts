import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const createUser = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/users`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getUsers = async (params: {
  searchQuery?: string;
  limit?: number;
  page?: number;
  type?: string;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/users/list`, {
      params,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const updateUser = async (
  id: string,
  data: any
): Promise<any | null> => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const deleteUser = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getUserByStudent = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/users/student/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getCounsellors = async (params: {
  counsellorType?: string;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/users/counsellors`, {
      params,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
