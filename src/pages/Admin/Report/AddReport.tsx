import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createChurch,
  getChurchById,
  updateChurch,
} from "../../../api/churchApi";

const AddReport = () => {
  const [churchData, setChurchData] = useState({
    name: "",
    image:
      "https://img.lovepik.com/png/20231114/church-mission-vector-cartoon-churches-sticker_585191_wh1200.png",
    address: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const isEditMode = state?.editMode;
  const churchId = state?.id;

  useEffect(() => {
    if (isEditMode && churchId) {
      const fetchChurch = async () => {
        const response = await getChurchById(churchId);
        const church = response.data;

        if (church) {
          setChurchData({
            name: church.name || "",
            image: church.image || "",
            address: church.address || "",
          });
        }
      };
      fetchChurch();
    }
  }, [isEditMode, churchId]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setChurchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && churchId) {
        await updateChurch(churchId, churchData);
      } else {
        await createChurch(churchData);
      }
      navigate("/church");
    } catch (error) {
      console.error("Failed to save church", error);
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Report
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
                  value={churchData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Address
              </label>
              <textarea
                rows={6}
                name="address"
                value={churchData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#a266f0] dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#a266f0] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {churchId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReport;
