import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
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
  backgroundColor: "#efefef",
  borderRadius: "8px",
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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  color: "rgba(0, 0, 0, 0.6)",
});

const StyledUploadImage = ({ label, onChange, rowData }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(
    rowData?.requisition_image || ""
  );
  const [isPdf, setIsPdf] = useState(false);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setIsPdf(true);
        setSelectedFile(file.name); // Set file name for PDF preview
      } else {
        setIsPdf(false);
        setSelectedFile(URL.createObjectURL(file)); // Set image URL for image preview
      }
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
        accept="image/*,application/pdf"
      />
      {selectedFile && (
        <ImagePreview
          style={
            isPdf
              ? { backgroundImage: "none" }
              : { backgroundImage: `url(${selectedFile})` }
          }
        >
          {isPdf ? (
            <>
              <PictureAsPdfIcon style={{ fontSize: "40px", color: "#e57373" }} />
              <Box>{selectedFile}</Box>
            </>
          ) : null}
        </ImagePreview>
      )}
    </>
  );
};

export default StyledUploadImage;
