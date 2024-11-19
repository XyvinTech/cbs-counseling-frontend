import { create } from "zustand";
import {
  acceptSession,
  addEntry,
  addRemark,
  addSession,
  cancelcounselorSession,
  cancelUserSession,
  counselorReschedule,
  getAdminSessionReport,
  getCounselorSessionReport,
  getSessionReport,
  reschedule,
} from "../../api/counselor/sessionApi";

const useSessionStore = create((set) => ({
  sessions: [],
  sessionId: null, 

  setSessionId: (id) => set({ sessionId: id }),
  addSessions: async (data) => {
    await addSession(data);
  },
  updateSession: async (id, data) => {
    await reschedule(id, data);
  },
  fetchReport: async (id) => {
    const report = await getSessionReport(id);
    set({ sessions: report.data });
  },
  acceptSessions: async (id) => {
    await acceptSession(id);
  },
  counsellorReport: async (id) => {
    const report = await getCounselorSessionReport(id);
    set({ sessions: report.data });
  },
  rescheduleSession: async (id, data) => {
    await counselorReschedule(id, data);
  },
  counsellorAddEntry: async (id, data) => {
    await addEntry(id, data);
  },
  cancelSessionByCounselor: async (id, data) => {
    await cancelcounselorSession(id, data);
  },
  cancelSessionByUser: async (id, data) => {
    await cancelUserSession(id, data);
  },

  adminSessionReport: async (id) => {
    const report = await getAdminSessionReport(id);
    set({ sessions: report.data });
  },
  refereeRemark: async (id, data) => {
    await addRemark(id, data);
  },
}));

export { useSessionStore };
