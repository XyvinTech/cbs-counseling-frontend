import React, { useEffect, useState } from "react";
import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../ui/StyledInput";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { useCounsellorTypeStore } from "../store/admin/CounsellorTypeStore";
import { toast } from "react-toastify";

const CreateType = ({ open, onClose, rowId, setIsChange }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addTypes } = useCounsellorTypeStore();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        name: data?.name,
      };
      await addTypes(formData);
      setIsChange((prev) => !prev);
      reset();
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
              rules={{
                required: " Type of Counseling is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Type of Counseling  must only contain letters",
                },
              }}
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
            name={loading ? "Saving..." : "Save"}
            type="submit"
          />
        </Stack>{" "}
      </form>
    </Dialog>
  );
};

export default CreateType;
