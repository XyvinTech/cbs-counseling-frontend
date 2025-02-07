import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { createType, getTypeById, updateType } from "../../../api/typeApi";
import { toast } from "react-toastify";

const AddType = () => {
  const [typeData, setTypeData] = useState({
    name: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const isEditMode = state?.editMode;
  const typeId = state?.id;

  useEffect(() => {
    if (isEditMode && typeId) {
      const fetchType = async () => {
        const response = await getTypeById(typeId);
        const type = response.data;

        if (type) {
          setTypeData({
            name: type.name || "",
          });
        }
      };
      fetchType();
    }
  }, [isEditMode, typeId]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTypeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && typeId) {
        await updateType(typeId, typeData);
      } else {
        await createType(typeData);
      }
      navigate("/admin-type");
    } catch (error: any) {
      toast.error(error.message);
    }
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
          onClick={() => navigate(-1)} // Replace with your back navigation logic
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>{" "}
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {typeId ? "Edit Counseling Type" : "Add Counseling Type"}
        </h2>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={typeData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#a266f0] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {typeId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddType;
