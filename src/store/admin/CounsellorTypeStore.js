import { create } from "zustand";
import { addType, deleteType, editType } from "../../api/admin/counsellorTypeapi";

const useCounsellorTypeStore = create((set) => ({
  types: [],

  addTypes: async (data) => {
    const newData = await addType(data);
    set((state) => ({ types: [...state.types, newData] }));
  },
  editTypes: async (id, data) => {
    const updatedData = await editType(id, data);
    set({ types: updatedData });
  },
  deleteTypes: async (data) => {
    await deleteType(data);
  },
}));

export { useCounsellorTypeStore };
