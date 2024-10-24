import { create } from "zustand";
import { addEvent, deleteEvent, editEvent } from "../api/eventapi";
import { getCalendar } from "../api/admin/counselorapi";

const useEventStore = create((set) => ({
  events: [],
  date: [],
  change: false,
  updateChange: (change) => {
    set({ change: !change });
  },

  addEvents: async (data) => {
    const newData = await addEvent(data);
    // set((state) => ({ events: [...state.events, newData] }));
  },
  editEvents: async (id, data) => {
    await editEvent(id, data);
  },
  deleteEvents: async (data) => {
    await deleteEvent(data);
  },
  fetchData: async () => {
    const session = await getCalendar();
    if (session && session.data) {
      set({ date: session.data });
    } else {
      set({ date: [] });
    }
  },
}));

export { useEventStore };
