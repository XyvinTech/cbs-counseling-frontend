import axiosInstance from "./axiosintercepter";

export const get = async () => {
  const response = await axiosInstance.get("/counsellor/notifications");
  return response.data;
};
export const edit = async (id) => {
  const response = await axiosInstance.put(`/counsellor/notification/${id}`);

  return response.data;
};
export const userNotification = async () => {
  const response = await axiosInstance.get("/user/notifications");
  return response.data;
};
export const editUserNotification = async (id) => {
  const response = await axiosInstance.put(`/user/notification/${id}`);

  return response.data;
};
