import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SelectGender from "../../../components/Admin/SelectGender";
import {
  createUser,
  getUserById,
  updateUser,
  upload,
} from "../../../api/userApi";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
    image: "",
    parentContact: "",
    userType: "student",
  });
  const [preview, setPreview] = useState("");
  const VITE_APP_FILE_URL = "https://able.iswkoman.com/images/";
  const [file, setFile] = useState<File | null>(null);
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
            image: student.image || "",
            designation: student.designation || "",
            division: student.division || "",
            mobile: student.mobile || "",
            parentContact: student.parentContact || "",
            userType: "student",
          });
          setPreview(
            student.image ? `${VITE_APP_FILE_URL}${student.image}` : ""
          );
        }
      };
      fetchStudent();
    }
  }, [isEditMode, studentId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);

      setFile(selectedFile);
    } else {
      setStudentData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleMobileChange = (value: string) => {
    setStudentData((prev) => ({
      ...prev,
      mobile: value,
    }));
  };
  const handleParentMobileChange = (value: string) => {
    setStudentData((prev) => ({
      ...prev,
      parentContact: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = studentData.image;
      if (preview && file) {
        const response = await upload(file);
        if (response?.data) {
          imageUrl = response.data;
        }
      }
      const updatedStudentData = {
        ...(studentData.name && { name: studentData.name }),
        ...(imageUrl && { image: imageUrl }),
        ...(studentData.designation && {
          designation: studentData.designation,
        }),
        ...(studentData.email && { email: studentData.email }),
        ...(studentData.mobile && { mobile: studentData.mobile }),
        ...(studentData.division && { division: studentData.division }),
        ...(studentData.gender && { gender: studentData.gender }),
        ...(studentData.parentContact && {
          parentContact: studentData.parentContact,
        }),
        ...(studentData.StudentReferencesCode && {
          StudentReferencesCode: studentData.StudentReferencesCode,
        }),
        userType: "student",
      };
      if (isEditMode && studentId) {
        await updateUser(studentId, updatedStudentData);
      } else {
        await createUser(updatedStudentData);
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#0072bc] dark:text-white"
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#0072bc] dark:text-white"
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#0072bc] dark:text-white"
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#0072bc] dark:text-white"
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
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#0072bc] dark:text-white"
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

                <PhoneInput
                  country={"om"}
                  value={studentData.mobile}
                  onChange={handleMobileChange}
                  inputProps={{
                    name: "mobile",
                    required: true,
                    className:
                      "w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-10 text-black outline-none transition focus:border-[#0072bc] active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  }}
                  containerClass="phone-input-container"
                  buttonClass="phone-input-button"
                  dropdownClass="phone-input-dropdown"
                />
              </div>

              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Alternative Contact Number
                </label>

                <PhoneInput
                  country={"om"}
                  value={studentData.parentContact}
                  onChange={handleParentMobileChange}
                  inputProps={{
                    name: "parentContact",
                    required: true,
                    className:
                      "w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-10 text-black outline-none transition focus:border-[#0072bc] active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  }}
                  containerClass="phone-input-container"
                  buttonClass="phone-input-button"
                  dropdownClass="phone-input-dropdown"
                />
              </div>
            </div>{" "}
            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
                {preview && (
                  <div className="mt-3">
                    <img
                      src={preview}
                      alt="Selected Preview"
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#0072bc] p-3 font-medium text-gray hover:bg-opacity-90"
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
