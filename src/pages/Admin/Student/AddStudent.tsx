import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SelectGender from "../../../components/Admin/SelectGender";
import { createUser, getUserById, updateUser } from "../../../api/userApi";
import { toast } from "react-toastify";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    StudentReferencesCode: "",
    gender: "",
    designation: "",
    division: "",
    mobile: "",
    parentContact: "",
    userType: "student",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const isEditMode = state?.editMode;
  const studentId = state?.id;

  useEffect(() => {
    if (isEditMode && studentId) {
      const fetchStudent = async () => {
        const response = await getUserById(studentId);
        const student = response.data;

        if (student) {
          setStudentData({
            name: student.name || "",
            email: student.email || "",
            StudentReferencesCode: student.StudentReferencesCode || "",
            gender: student.gender || "",
            designation: student.designation || "",
            division: student.division || "",
            mobile: student.mobile || "",
            parentContact: student.parentContact || "",
            userType: "student",
          });
        }
      };
      fetchStudent();
    }
  }, [isEditMode, studentId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value.replace(/\D/g, "");

    if (name === "mobile" || name === "parentContact") {
      if (formattedValue.startsWith("968")) {
        formattedValue = "+968" + formattedValue.slice(3);
      } else if (!formattedValue.startsWith("+968")) {
        formattedValue = "+968" + formattedValue;
      }

      if (formattedValue.length > 12) {
        formattedValue = formattedValue.slice(0, 12);
      }

      if (formattedValue === "+968") {
        formattedValue = "";
      }
    }

    setStudentData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode && studentId) {
        await updateUser(studentId, studentData);
      } else {
        await createUser(studentData);
      }
      navigate("/student");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGenderChange = (value: string) => {
    setStudentData((prev) => ({
      ...prev,
      gender: value,
    }));
  };
  return (
    <div className="flex flex-col gap-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer text-black dark:text-white hover:text-blue-600"
          onClick={() => navigate(-1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>{" "}
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {studentId ? "Edit Student" : "Add Student"}
        </h2>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={studentData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>

            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  GRP Number
                </label>
                <input
                  type="text"
                  name="StudentReferencesCode"
                  value={studentData.StudentReferencesCode}
                  onChange={handleChange}
                  placeholder="Enter GRP Number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Standard
                </label>
                <input
                  type="text"
                  name="designation"
                  value={studentData.designation}
                  onChange={handleChange}
                  placeholder="Enter Standard"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>
            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Division
                </label>
                <input
                  type="text"
                  name="division"
                  value={studentData.division}
                  onChange={handleChange}
                  placeholder="Enter Division"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
              <SelectGender
                onGenderChange={handleGenderChange}
                selectedGender={studentData.gender}
              />
            </div>

            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={studentData.mobile}
                  onChange={handleChange}
                  placeholder="+968 9898 9898"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>

              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Alternative Contact Number
                </label>
                <input
                  type="text"
                  name="parentContact"
                  value={studentData.parentContact}
                  onChange={handleChange}
                  placeholder="+968 9898 9898"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#a266f0] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {loading ? "Submitting..." : studentId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
