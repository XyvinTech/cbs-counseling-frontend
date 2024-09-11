import { create } from "zustand";
import { getCounselor } from "../../api/counselor/authApi";
import { edit } from "../../api/admin/counselorapi";

const useAuthStore = create((set) => ({
  counselor: [],
  isAuth: true,
  isChange: false,
  updateChange: (isChange) => {
    set({ isChange: !isChange });
  },
  getCounselor: async () => {
    const fetch = await getCounselor();
    set({ counselor: fetch.data });
  },
  logoutAuth: (navigate) => {
    localStorage.removeItem("token");
    set({ isAuth: false });
    navigate("/");
  },
  update: async (id, data) => {
    await edit(id, data);
  },
}));

export { useAuthStore };
