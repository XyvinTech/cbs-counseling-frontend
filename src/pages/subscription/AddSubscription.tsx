import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectUser from "../../components/Forms/SelectGroup/SelectUser";
import {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
} from "../../api/subscriptionApi";
import SelectPlan from "../../components/Forms/SelectGroup/SelectPlan";
import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";

const AddSubscription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const isEditMode = state?.editMode;
  const [selectedChurch, setSelectedChurch] = useState("");
  const [subData, setSubData] = useState(() => ({
    receipt: "",
    user: "",
    plan: "",
    ...(isEditMode && { expiryDate: "" }),
  }));

  const subId = state?.id;

  useEffect(() => {
    if (isEditMode && subId) {
      const fetchSub = async () => {
        const response = await getSubscriptionById(subId);
        const sub = response.data;

        if (sub) {
          const formattedDate = sub.expiryDate
            ? new Date(sub.expiryDate).toISOString().split("T")[0]
            : "";
          setSubData((prev: any) => ({
            ...prev,
            ...(isEditMode && { expiryDate: formattedDate || "" }),
            receipt: sub.receipt || "",
            expiryDate: formattedDate || "",
            user: sub.user._id || "",
            plan: sub.plan._id || "",
          }));
          setSelectedChurch(sub.user.church);
        }
      };
      fetchSub();
    }
  }, [isEditMode, subId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && subId) {
        await updateSubscription(subId, subData);
      } else {
        await createSubscription(subData);
      }
      navigate("/subscription");
    } catch (error) {
      console.error("Failed to save subscription", error);
    }
  };

  const handleUserChange = (value: string) => {
    console.log("value");
    setSubData((prev: any) => ({
      ...prev,
      user: value,
    }));
  };
  console.log(subData.user);

  const handlePlanChange = (value: string) => {
    setSubData((prev: any) => ({
      ...prev,
      plan: value,
    }));
  };
  const handleChurchChange = (value: string) => {
    setSelectedChurch(value);
    setSubData((prev: any) => ({
      ...prev,
      user: "",
    }));
  };
  return (
    <div className="flex flex-col gap-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-self-start">
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
          {subId ? "Edit Subscription" : "Add Subscription"}
        </h2>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <SelectGroupOne
              onChurchChange={handleChurchChange}
              selectedChurch={selectedChurch}
            />
            <SelectUser
              onUserChange={handleUserChange}
              selectedUser={subData.user}
              selectedChurch={selectedChurch}
            />
            {isEditMode && (
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Expiry Date <span className="text-meta-1">*</span>
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={subData.expiryDate}
                  onChange={handleChange}
                  disabled
                  placeholder="Enter expiry date"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
                />
              </div>
            )}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Receipt Number
              </label>
              <input
                type="text"
                name="receipt"
                value={subData.receipt}
                onChange={handleChange}
                placeholder="Enter receipt number"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#f09443] dark:text-white"
              />
            </div>
            <SelectPlan
              onPlanChange={handlePlanChange}
              selectedPlan={subData.plan}
            />
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#f09443] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {subId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;
