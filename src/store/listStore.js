import { create } from "zustand";
import {
  counselorSession,
  counselorSessionByCase,
  fetchList,
  getCounselorCase,
  getCounselorSession,
  getSession,
  getUserSession,
} from "../api/listapi";
import {
  getAdminSessionByCase,
  getSessionByCase,
} from "../api/counselor/sessionApi";
import { getDashboard } from "../api/admin/adminapi";

const useListStore = create((set, get) => ({
  lists: [],
  typeLists: [],
  totalCount: 0,
  rowPerSize: 10,
  pageNo: 1,
  pageInc: () => {
    const { pageNo, totalCount, rowPerSize } = get();
    const totalPages = Math.ceil(totalCount / rowPerSize);

    if (pageNo < totalPages) {
      set({ pageNo: pageNo + 1 });
    }
  },
  pageDec: () => {
    const { pageNo } = get();
    if (pageNo > 1) {
      set({ pageNo: pageNo - 1 });
    }
  },
  rowChange: (value) => {
    set({ rowPerSize: value });
  },
  fetchLists: async (filter) => {
    set({ lists: [] });
    const allData = await fetchList(filter);
    set({ lists: allData?.data || [] });
    set({ typeLists :  allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },

  fetchTypeLists: async () => {
    set({ typeLists: [] });
    const allData = await fetchList({type: 'counselling-type'});
    set({ typeLists :  allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  fetchSession: async (id, filter) => {
    set({ lists: [] });
    const session = await getSession(id, filter);
    set({ lists: session.data });
    set({ totalCount: session?.totalCount || 0 });
  },
  fetchCounselorSession: async (id) => {
    set({ lists: [] });
    const counselor = await getCounselorSession(id);
    set({ lists: counselor.data });
  },
  fetchCounselorCase: async (id) => {
    set({ lists: [] });
    const cases = await getCounselorCase(id);
    set({ lists: cases.data });
  },

  userSession: async (filter) => {
    set({ lists: [] });
    const allData = await getUserSession(filter);
    set({ lists: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  fetchUserSession: async (id) => {
    set({ lists: [] });
    const session = await getSessionByCase(id);
    set({ lists: session.data });
  },
  counselorSessions: async (filter) => {
    set({ lists: [] });
    const allData = await counselorSession(filter);
    set({ lists: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
  counselorSesssionsByCaseId: async (id) => {
    set({ lists: [] });
    const session = await counselorSessionByCase(id);
    set({ lists: session.data });
  },
  adminSesssionsByCaseId: async (id, filter) => {
    set({ lists: [] });
    const session = await getAdminSessionByCase(id, filter);
    set({ lists: session.data });
    set({ totalCount: session?.totalCount || 0 });
  },
  dashboardLists: async (filter) => {
    set({ lists: [] });
    const allData = await getDashboard(filter);
    set({ lists: allData?.data.session_list || [] });
    set({ totalCount: allData?.totalCount || 0 });
  },
}));

export { useListStore };
