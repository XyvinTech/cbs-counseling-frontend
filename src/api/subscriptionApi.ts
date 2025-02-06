import axiosInstance from "./axiosintercepter";

export const createSubscription = async (data: any): Promise<any | null> => {
  try {
    const response = await axiosInstance.post(`/subscription`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to create subscription:", error);
    return null;
  }
};
export const getSubscription = async (params: {
  search?: string;
  limit?: number;
  page?: number;
  status?: string;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/subscription`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    return null;
  }
};
export const getSubscriptionById = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/subscription/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subscription:", error);
    return null;
  }
};
export const updateSubscription = async (
  id: string,
  data: any
): Promise<any | null> => {
  try {
    const response = await axiosInstance.put(`/subscription/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update subscription:", error);
    return null;
  }
};
export const deleteSubscription = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.delete(`/subscription/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete subscription:", error);
    return null;
  }
};
export const getPdf = async (): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/subscription/generate-labels`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    return null;
  }
};
