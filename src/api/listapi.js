import { handleAsync } from "../utils/handleAsync";
import axiosInstance from "./axiosintercepter";

export const fetchList = handleAsync(async (filter) => {
  const response = await axiosInstance.get("/admin/list", {
    params: filter,
  });
  return response.data;
});
export const getSession = handleAsync(async (id, filter) => {
  const response = await axiosInstance.get(`/admin/sessions/${id}`, {
    params: filter,
  });

  return response.data;
});
export const getCounselorSession = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/admin/counsellor/sessions/${id}`);

  return response.data;
});
export const getCounselorCase = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/admin/counsellor/cases/${id}`);

  return response.data;
});
export const getUserSession = handleAsync(async (filter) => {
  const response = await axiosInstance.get("/user/list", {
    params: filter,
  });
  return response.data;
});
export const counselorSession = handleAsync(async (filter) => {
  const response = await axiosInstance.get("/counsellor/list", {
    params: filter,
  });
  return response.data;
});
export const counselorSessionByCase = handleAsync(async (id) => {
  const response = await axiosInstance.get(`/counsellor/sessions/${id}`);

  return response.data;
});
