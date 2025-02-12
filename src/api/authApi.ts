import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const resetPassword = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/auth/reset-password`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const login = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/auth/login`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getDashboard = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/dashboard`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const sendOtp = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/auth/send-otp`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const verifyOtp = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/auth/verify-otp`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};