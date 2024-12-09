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
  marginRight: "10px",
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

const StyledUploadFile = ({ label, onChange }) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedFiles = [...files, file];
      setFiles(updatedFiles);
      onChange(updatedFiles);
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
        accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
      />
      <Box display="flex" flexWrap="wrap" mt={2}>
        {files?.map((file, index) => (
          <ImagePreview
            key={index}
            style={
              file?.type.startsWith("image/")
                ? { backgroundImage: `url(${URL.createObjectURL(file)})` }
                : { backgroundImage: "none" }
            }
          >
            {file?.type === "application/pdf" ? (
              <>
                <PictureAsPdfIcon style={{ fontSize: "40px", color: "#e57373" }} />
                <Box>{file?.name}</Box>
              </>
            ) : null}
            {["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"].includes(
              file?.type
            ) ? (
              <Box>{file?.name}</Box>
            ) : null}
            {file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
              <Box>{file?.name}</Box>
            ) : null}
            {["application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"].includes(
              file?.type
            ) ? (
              <Box>{file?.name}</Box>
            ) : null}
          </ImagePreview>
        ))}
      </Box>
    </>
  );
};

export default StyledUploadFile;
