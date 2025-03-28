import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Type } from "../../types/type";
import { getType } from "../../api/typeApi";

const SelectType: React.FC<{
  onTypeChange: (value: string[]) => void;
  selectedType: string[];
}> = ({ onTypeChange, selectedType }) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    const fetchType = async () => {
      const response = await getType({});
      const formattedOptions = response.data.map((type: Type) => ({
        value: type.name,
        label: type.name,
      }));
      setOptions(formattedOptions);
    };
    fetchType();
  }, []);

  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((opt: any) => opt.value)
      : [];
    onTypeChange(selectedValues);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        Counseling Type
      </label>
      <Select
        isMulti
        options={options}
        value={options.filter((option) => selectedType.includes(option.value))}
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
        placeholder="Select Counseling Type"
      />
    </div>
  );
};

export default SelectType;
