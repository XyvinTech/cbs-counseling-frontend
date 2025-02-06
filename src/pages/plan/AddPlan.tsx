import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPlan, getPlanById, updatePlan } from "../../api/planApi";

const AddPlan = () => {
  const [planData, setPlanData] = useState({
    name: "",
    price: "",
    days: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const isEditMode = state?.editMode;
  const planId = state?.id;

  useEffect(() => {
    if (isEditMode && planId) {
      const fetchPlan = async () => {
        const response = await getPlanById(planId);
        const plan = response.data;

        if (plan) {
          setPlanData({
            name: plan.name || "",
            price: plan.price || "",
            days: plan.days || "",
          });
        }
      };
      fetchPlan();
    }
  }, [isEditMode, planId]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPlanData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && planId) {
        await updatePlan(planId, planData);
      } else {
        await createPlan(planData);
      }
      navigate("/plan");
    } catch (error) {
      console.error("Failed to save plan", error);
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
            onClick={() =>navigate(-1) } // Replace with your back navigation logic
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>  <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {planId ? "Edit Plan" : "Add Plan"}
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
                  value={planData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={planData.price}
                onChange={handleChange}
                placeholder="Enter the price"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Days
              </label>
              <input
                type="text"
                name="days"
                value={planData.days}
                onChange={handleChange}
                placeholder="Enter the days"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#f09443] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {planId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlan;
