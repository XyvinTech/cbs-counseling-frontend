import axiosInstance from "./axiosintercepter";

export const getReport = async (params: {
  reportType?: string;
  startDate?: string;
  endDate?: string;
  counselingType?: string;
  counsellor?: string;
  grNumber?: string;
}): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/report`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const caseReport = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/report/case/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const sessionReport = async (id: string): Promise<any | null> => {
  try {
    const response = await axiosInstance.get(`/report/session/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
