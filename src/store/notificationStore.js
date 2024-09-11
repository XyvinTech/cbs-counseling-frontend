import { create } from "zustand";
import { edit, editUserNotification, get, userNotification } from "../api/notificationapi";

const useNotificationStore = create((set) => ({
  noti: [],
  isChange: false,
  updateChange: (isChange) => {
    set({ isChange: !isChange });
  },
  getNotification: async () => {
    const fetch = await get();
    set({ noti: fetch.data });
  },
  update: async (id) => {
    await edit(id);
  },
  getUserNotification: async () => {
    const fetch = await userNotification();
    set({ noti: fetch.data });
  },
  updateUser: async (id) => {
    await editUserNotification(id);
  },
}));

export { useNotificationStore };
