import React, { useEffect, useState } from "react";
import { User } from "../../types/user";
import { getCounsellors } from "../../api/userApi";

const SelectCounselor: React.FC<{
  onCounsellorChange: (value: string) => void;
  selectedCounsellor: string;
  type: string;
}> = ({ onCounsellorChange, selectedCounsellor, type }) => {
  const [selectedOption, setSelectedOption] = useState<User[]>([]);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!type) return;

      try {
        const response = await getCounsellors({ counsellorType: type , counsellor: "" });
        setSelectedOption(response.data);
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };

    fetchData();
  }, [type]);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onCounsellorChange(value);
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        Counselor
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={selectedCounsellor}
          onChange={handleChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-[#0072bc] active:border-[#0072bc] dark:border-form-strokedark dark:bg-form-input dark:focus:border-[#0072bc] ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Counselor
          </option>
          {selectedOption.map((plan) => (
            <option
              key={plan._id}
              value={plan._id}
              className="text-body dark:text-bodydark"
            >
              {plan.name}
            </option>
          ))}
        </select>
        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectCounselor;
