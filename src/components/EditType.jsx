import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Grid, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import StyledInput from "../ui/StyledInput";
import { useCounsellorTypeStore } from "../store/admin/CounsellorTypeStore";

const EditType = ({ open, onClose, onChange, rowData }) => {
  const { editTypes } = useCounsellorTypeStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (rowData) {
      reset({
        name: rowData.name || "",
      });
    }
  }, [rowData, reset]);
  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
    };
    await editTypes(rowData?._id, formData);
    onClose();
    onChange();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ height: "auto", width: "380px", padding: 0 }}>
          <Stack spacing={2} padding={2} paddingTop={4}>
            <Typography variant="h6" color={"#333333"}>
              Type of Counseling
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: " Type of Counseling is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    placeholder={"Add Type of Counseling"}
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                  )}
                </>
              )}
            />
          </Stack>
        </DialogContent>
        <Stack
          direction={"row"}
          spacing={2}
          padding={4}
          paddingTop={0}
          justifyContent={"end"}
        >
          <StyledButton
            variant="secondary"
            name="Cancel"
            onClick={(event) => handleClear(event)}
          />
          <StyledButton variant="primary" name="Edit" type="submit" />
        </Stack>
      </form>
    </Dialog>
  );
};

export default EditType;
