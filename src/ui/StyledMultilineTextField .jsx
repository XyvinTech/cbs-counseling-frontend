import React from "react";
import { OutlinedInput } from "@mui/material";

export const StyledMultilineTextField = ({
  label,
  placeholder,
  rows = 4,
  onChange,
  value,
  disabled,
}) => {
  return (
    <OutlinedInput
      label={label}
      placeholder={placeholder}
      multiline
      disabled={disabled}
      rows={rows}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      sx={{
        width: "100%",
        padding: "3px",
        backgroundColor: "#efefef" ,
        borderRadius: "8px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.2)",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.2)",
        },
        "& .MuiInputBase-input": {
          padding: "14px",
        },
        "& input::placeholder": {
          color: "#000000",
          fontWeight: "500",
        },
      }}
    />
  );
};
