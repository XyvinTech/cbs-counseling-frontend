import { create } from "zustand";
import { toast } from "react-toastify";
import {
  addTime,
  allTimeSlot,
  counsellorTimeSlot,
  getSlot,
  getTime,
  deleteSingleTime,
} from "../../api/counselor/Timeapi";

const useTimeStore = create((set) => ({
  times: [],
  slots: [],
  days: [],
  addTimes: async (data) => {
    await addTime(data);
    // set((state) => ({ times: [...state.times, newTime] }));
  },
  getTimes: async () => {
    const time = await getTime();
    set({ times: time.data });
  },
  fetchSlot: async (id, filter) => {
    set({ slots: [] });
    const time = await getSlot(id, filter);
    set({ slots: time.data });
  },
  timeSlot: async (id, filter) => {
    set({ slots: [] });
    const time = await counsellorTimeSlot(id, filter);
    set({ slots: time.data });
  },
  allSlot: async (id) => {
    set({ days: [] });
    const time = await allTimeSlot(id);
    set({ days: time.data });
  },
  deleteTime: async (id, data) => {
    await deleteSingleTime(id, data);
  },
}));

export { useTimeStore };
