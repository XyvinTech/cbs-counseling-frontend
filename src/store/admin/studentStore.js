import { create } from "zustand";
import { addStudent, editStudent } from "../../api/admin/studentapi";

const useStudentStore = create((set) => ({
  students: [],
  addStudents: async (data) => {
    await addStudent(data);
  },
  updateStudent: async (id, data) => {
    await editStudent(id, data);
  },
}));

export { useStudentStore };
