import { create } from "zustand";
import {
  addCounselor,
  allCounselor,
  editCounsellor,
  editCounselor,
  fetchCounselor,
  fetchTypeList,
  getUser,
} from "../../api/admin/counselorapi";

const useCounselorStore = create((set) => ({
  counselors: [],
  counselor: [],
  types: [],
  showBackButton: false,
  loading: false,
  setShowBackButton: (show) => set({ showBackButton: show }),
  addCounselors: async (data) => {
    await addCounselor(data);
  },
  updateCounsellor: async (id, data) => {
    await editCounsellor(id, data);
  },
  fetchUser: async (id) => {
    set({ loading: true });
    const session = await getUser(id);
    set({ counselor: session.data });
    set({ loading: false });
  },
  fetchCounselors: async (filter) => {
    set({ counselors: [] });

    const allData = await fetchCounselor(filter);
    set({ counselors: allData?.data || [] });
  },
  allCounselors: async (filter) => {
    set({ counselors: [] });

    const allData = await allCounselor(filter);
    set({ counselors: allData?.data || [] });
  },
  editCounsellor: async (id, data) => {
    await editCounselor(id, data);
  },
  fetchTypeLists: async (filter) => {
    set({ types: [] });
    const allData = await fetchTypeList(filter);
    set({ types: allData?.data || [] });
  },
}));

export { useCounselorStore };
