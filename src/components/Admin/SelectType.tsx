import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Type } from "../../types/type";
import { getType } from "../../api/typeApi";

const SelectType: React.FC<{
  onTypeChange: (value: string[]) => void;
  selectedType: string[];
}> = ({ onTypeChange, selectedType }) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
console.log("selectedType",selectedType);

  useEffect(() => {
    const fetchType = async () => {
      const response = await getType({});
      const formattedOptions = response.data.map((type: Type) => ({
        value: type._id,
        label: type.name,
      }));
      setOptions(formattedOptions);
    };
    fetchType();
  }, []);

  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [];
    onTypeChange(selectedValues);
  };

  return (
    <div className="mb-4.5">
      <label className="mb-2.5 block text-black dark:text-white">
        Counselor Type
      </label>
      <Select
        isMulti
        options={options}
        value={options.filter((option) => selectedType.includes(option.value))}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select Counselor Type"
      />
    </div>
  );
};

export default SelectType;
