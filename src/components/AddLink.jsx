import React, { useState } from "react";
import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import StyledSelectField from "../ui/StyledSelectField";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { useSessionStore } from "../store/counselor/SessionStore";

const AddLink = ({ open, onClose, rowId, onChange }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { acceptSessions } = useSessionStore();

  const onSubmit = async () => {
    try {
      setLoading(true);
      await acceptSessions(rowId);
      setLoading(false);
      reset();
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
            <Typography variant="h6" color={"#333333"} textAlign={"center"}>
              Are you sure you want to accept this session?
            </Typography>
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={4} justifyContent={"end"}>
          <StyledButton
            variant="secondary"
            name="No"
            disabled={loading}
            onClick={(event) => handleClear(event)}
          />
          <StyledButton
            variant="primary"
            disabled={loading}
            name="Yes"
            type="submit"
          />
        </Stack>{" "}
      </form>
    </Dialog>
  );
};

export default AddLink;
