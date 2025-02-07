import React from "react";
import Select from "react-select";

const options = [
  { value: "weekly", label: "Week" },
  { value: "monthly", label: "Month" },
  { value: "yearly", label: "Year" }
];

const SelectTimer: React.FC<{
  onTimerChange: (value: string[]) => void;
  selectedTimer: string[];
}> = ({ onTimerChange, selectedTimer }) => {

  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [];
    onTimerChange(selectedValues);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">Select Reminder</label>
      <Select
        isMulti
        options={options}
        value={options.filter(option => selectedTimer.includes(option.value))}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select Reminder"
      />
    </div>
  );
};

export default SelectTimer;