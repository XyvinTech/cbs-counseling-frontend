import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(0, 0, 0, 0.2)",
    opacity: 1,
  },
}));

const ImagePreview = styled(Box)({
  width: "100px",
  height: "100px",
  marginTop: "10px",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  borderRadius: "4px",
});

const StyledUploadImage = ({ label, onChange, rowData }) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(
    rowData?.requisition_image || ""
  );
  
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <>
      <CustomTextField
        fullWidth
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <BackupOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      {selectedImage && (
        <ImagePreview style={{ backgroundImage: `url(${selectedImage})` }} />
      )}
    </>
  );
};

export default StyledUploadImage;
