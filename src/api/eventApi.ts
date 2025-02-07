import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const createEvent = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/events`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getEvent = async (params: {
  searchQuery?: string;
  limit?: number;
  page?: number;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/events`, {
      params,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getEventById = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const updateEvent = async (
  id: string,
  data: any
): Promise<any | null> => {
  try {
    const response = await axiosInstance.put(`/events/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const deleteEvent = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.delete(`/events/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const getCalendar = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/events/calender`);
    return response.data;
  } catch (error) {
    return null;
  }
};
