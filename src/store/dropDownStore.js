import { create } from "zustand";
import { fetchList } from "../api/listapi";
const useDropDownStore = create((set) => ({
  users: [],
  students: [],
  fetchLists: async (filter) => {
    const allData = await fetchList(filter);
    if (filter.type === "counsellers") {
      set({ users: allData?.data || [] });
    } else if (filter.type === "students") {
      set({ students: allData?.data || [] });
    }
  },
}));


export { useDropDownStore };
