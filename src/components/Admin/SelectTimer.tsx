import React from "react";
import Select from "react-select";

const options = [
  { value: "weekly", label: "Week" },
  { value: "monthly", label: "Month" },
];

const SelectTimer: React.FC<{
  onTimerChange: (value: string[]) => void;
  selectedTimer: string[];
}> = ({ onTimerChange, selectedTimer }) => {
  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((opt: any) => opt.value)
      : [];
    onTimerChange(selectedValues);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        Select Reminder
      </label>
      <Select
        isMulti
        options={options}
        value={options.filter((option) => selectedTimer.includes(option.value))}
        onChange={handleChange}
        styles={{
          control: (base, { isFocused }) => ({
            ...base,
            padding: 6,
            borderColor: isFocused ? "#0072bc" : "#0072bc",
            boxShadow: isFocused ? "0 0 0 1px #0072bc" : "none",
            "&:hover": { borderColor: "#0072bc" },
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "#0072bc",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "white",
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: "white",
            "&:hover": { backgroundColor: "#822bd4", color: "white" },
          }),
        }}
        classNamePrefix="select"
        placeholder="Select Reminder"
      />
    </div>
  );
};

export default SelectTimer;
