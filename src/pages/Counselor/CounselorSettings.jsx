import React from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import StyledInput from "../../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../../ui/StyledButton";
import { resetPassword } from "../../api/admin/adminapi";

export default function CounselorSettings() {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    await resetPassword(data);
    reset();
  };

  return (
    <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"4px"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Old Password
            </Typography>
            <Controller
              name="oldPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput placeholder="Enter Password" {...field} />
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              New Password
            </Typography>
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledInput placeholder="Enter Password" {...field} />
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Confirm Password
            </Typography>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                validate: (value) => {
                  return value === newPassword || "Passwords do not match";
                },
              }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Password" {...field} />
                  {errors.confirmPassword && (
                    <Typography color="red" variant="caption">
                      {errors.confirmPassword.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} alignItems={"flex-start"}>
            <Stack direction={"row"} spacing={2} justifyContent="flex-end">
              <StyledButton
                name="Confirm Password"
                variant="primary"
                type="submit"
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
