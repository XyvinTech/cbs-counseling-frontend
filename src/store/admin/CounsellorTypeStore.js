import { create } from "zustand";
import {
  addType,
  deleteType,
  editType,
} from "../../api/admin/counsellorTypeapi";

const useCounsellorTypeStore = create((set) => ({
  types: [],

  addTypes: async (data) => {
    await addType(data);
  },
  editTypes: async (id, data) => {
    await editType(id, data);
  },
  deleteTypes: async (data) => {
    await deleteType(data);
  },
}));

export { useCounsellorTypeStore };
