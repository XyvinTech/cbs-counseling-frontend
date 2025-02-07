import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createChurch,
  getChurchById,
  updateChurch,
} from "../../../api/churchApi";
import SelectType from "../../../components/Admin/SelectType";
import SelectGender from "../../../components/Admin/SelectGender";

const AddCounselor = () => {
  const [counselorData, setCounselorData] = useState({
    name: "",
    image:
      "https://img.lovepik.com/png/20231114/church-mission-vector-cartoon-churches-sticker_585191_wh1200.png",
    address: "",
    designation: "",
    email: "",
    phone: "",
    type: "",
    gender: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const isEditMode = state?.editMode;
  const counselorId = state?.id;

  useEffect(() => {
    if (isEditMode && counselorId) {
      const fetchCounselor = async () => {
        const response = await getChurchById(counselorId);
        const counselor = response.data;

        if (counselor) {
          setCounselorData({
            name: counselor.name || "",
            image: counselor.image || "",
            address: counselor.address || "",
            designation: counselor.designation || "",
            email: counselor.email || "",
            phone: counselor.phone || "",
            type: counselor.type || "",
            gender: counselor.gender || "",
          });
        }
      };
      fetchCounselor();
    }
  }, [isEditMode, counselorId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCounselorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && counselorId) {
        await updateChurch(counselorId, counselorData);
      } else {
        await createChurch(counselorData);
      }
      navigate("/admin-counselor");
    } catch (error) {
      console.error("Failed to save counselor", error);
    }
  };

  const handleGenderChange = (value: string) => {
    setCounselorData((prev) => ({
      ...prev,
      gender: value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setCounselorData((prev) => ({
      ...prev,
      type: value,
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
          {counselorId ? "Edit Counselor" : "Add Counselor"}
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
                  value={counselorData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
              <SelectGender
                onGenderChange={handleGenderChange}
                selectedGender={counselorData.gender}
              />
            </div>

            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={counselorData.designation}
                  onChange={handleChange}
                  placeholder="Enter Designation"
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
                  value={counselorData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>
            <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  value={counselorData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={counselorData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>

            <div className="mb-4.5">
              <SelectType
                onChurchChange={handleTypeChange}
                selectedChurch={counselorData.type}
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#a266f0] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {counselorId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCounselor;
