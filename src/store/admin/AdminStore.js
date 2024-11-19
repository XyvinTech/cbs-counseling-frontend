import { create } from "zustand";
import {
  addForm,
  deleteUser,
  edit,
  getDashboard,
  getUser,
} from "../../api/admin/adminapi";

const useAdminStore = create((set) => ({
  admin: [],
  dashboard: [],
  isAuth: true,
  isChange: false,
  updateChange: (isChange) => {
    set({ isChange: !isChange });
  },
  getAdmin: async () => {
    const fetch = await getUser();
    set({ admin: fetch.data });
  },
  addFormData: async (data) => {
    await addForm(data);
  },
  logoutAuth: (navigate) => {
    localStorage.removeItem("token");
    set({ isAuth: false });
    navigate("/");
  },
  deleteUsers: async (data) => {
    await deleteUser(data);
  },
  getData: async () => {
    const fetch = await getDashboard();
    set({ dashboard: fetch.data });
  },
  update: async (id, data) => {
   await edit(id, data);
  
  },
}));

export { useAdminStore };
