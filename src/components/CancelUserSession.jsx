import React, { useEffect, useState } from "react";
import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { useSessionStore } from "../store/counselor/SessionStore";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { toast } from "react-toastify";

const CancelUserSession = ({ open, onClose, rowId, onChange }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { cancelSessionByUser } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        cancel_remark: data?.cancel_remark,
      };
      await cancelSessionByUser(rowId, formData);

      onChange();
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
              Reason for Cancelling
            </Typography>
            <Controller
              name="cancel_remark"
              control={control}
              defaultValue=""
              rules={{ required: " Remark is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    {...field}
                    placeholder={"Reason For Cancel"}
                  />
                  {errors.cancel_remark && (
                    <span style={{ color: "red" }}>
                      {errors.cancel_remark.message}
                    </span>
                  )}
                </>
              )}
            />
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={4} justifyContent={"end"}>
          <StyledButton
            variant="secondary"
            name="Cancel"
            disabled={loading}
            onClick={(event) => handleClear(event)}
          />
          <StyledButton
            variant="primary"
            disabled={loading}
            name="Sure"
            type="submit"
          />
        </Stack>{" "}
      </form>
    </Dialog>
  );
};

export default CancelUserSession;
