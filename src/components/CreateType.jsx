import React, { useEffect, useState } from "react";
import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../ui/StyledInput";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { useCounsellorTypeStore } from "../store/admin/CounsellorTypeStore";

const CreateType = ({ open, onClose, rowId, onChange }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addTypes } = useCounsellorTypeStore();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = {
      name: data?.name,
    };
    await addTypes(formData);
    setLoading(false);
    reset();
    onChange();
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
            disabled={loading}
            onClick={(event) => handleClear(event)}
          />
          <StyledButton
            variant="primary"
            name="Save"
            disabled={loading}
            type="submit"
          />
        </Stack>{" "}
      </form>
    </Dialog>
  );
};

export default CreateType;
