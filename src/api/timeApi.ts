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
