import React from "react";
import { InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { MuiTelInput } from "mui-tel-input";

const StyledInput = ({
  placeholder,
  startIcon,
  endIcon,
  disabled,
  type,
  onChange,
  value,
  mobile,
  form,
}) => {
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      {mobile ? (
        <MuiTelInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          defaultCountry="OM"
          InputProps={{
            startAdornment: startIcon ? (
              <InputAdornment position="start" sx={{ marginLeft: "12px" }}>
                {startIcon}
              </InputAdornment>
            ) : null,
            endAdornment: endIcon ? (
              <InputAdornment
                position="end"
                sx={{ marginRight: "12px", cursor: "pointer" }}
                onClick={() => endIcon.props.onClick && endIcon.props.onClick()}
              >
                {endIcon}
              </InputAdornment>
            ) : null,
          }}
          sx={{
            width: "100%",
            padding: "3px",
            backgroundColor: "#efefef",
            borderRadius: "5px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent !important",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.2) !important",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(0, 0, 0, 0.2) !important",
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "rgba(0, 0, 0, 0.2) !important",
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
      ) : (
        <OutlinedInput
          type={type}
          value={value}
          onChange={onChange}
          // placeholder={placeholder}
          disabled={disabled}
          startAdornment={
            startIcon ? (
              <InputAdornment position="start" sx={{ marginLeft: "12px" }}>
                {startIcon}
              </InputAdornment>
            ) : null
          }
          endAdornment={
            endIcon ? (
              <InputAdornment
                position="end"
                sx={{ marginRight: "12px", cursor: "pointer" }}
                onClick={() => endIcon.props.onClick && endIcon.props.onClick()}
              >
                {endIcon}
              </InputAdornment>
            ) : null
          }
          sx={{
            width: "100%",
            padding: "3px",
            backgroundColor: "#efefef",
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
      )}
    </FormControl>
  );
};

export default StyledInput;
