import React, { useEffect, useState } from "react";
import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import { useForm } from "react-hook-form";
import { useCounselorStore } from "../store/admin/CounselorStore";

const ActivateCounsellor = ({ open, onClose, rowData }) => {
  const { handleSubmit } = useForm();
  const { updateCounsellor } = useCounselorStore();
  const onSubmit = async () => {
    const formData = {
      name: rowData?.name,
      email: rowData?.email,
      status: true,
    //   id: rowData?.id
    };
    await updateCounsellor(rowData?.id, formData);
    onClose();
   
  };

  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "21px" },
      }}
    >
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ height: "auto", width: "380px", padding: 0 }}>
          <Stack
            direction={"row"}
            spacing={2}
            paddingTop={4}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="h6" color={"#333333"}>
              Are you sure activate Counselor
            </Typography>
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={4}>
          <StyledButton
            variant="secondary"
            name="Cancel"
            onClick={(event) => handleClear(event)}
          />
          <StyledButton variant="primary" name="Sure" type="submit" />
        </Stack>{" "}
      </form>
    </Dialog>
  );
};

export default ActivateCounsellor;
