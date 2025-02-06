import axiosInstance from "./axiosintercepter";

export const getDashboard = async (): Promise<any | null> => {
    try {
      const response = await axiosInstance.get(`/dashboard`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch members:", error);
      return null;
    }
  };