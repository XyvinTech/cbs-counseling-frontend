import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import StyledInput from "../../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/counselor/AuthStore.js";
import { StyledButton } from "../../ui/StyledButton.jsx";

export default function CounseloSettings() {
  const { counselor, update, updateChange,isChange } = useAuthStore();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (counselor) {
      reset({
        name: counselor.name || "",
        email: counselor.email || "",
        mobile: counselor.mobile || "",
      });
    }
  }, [counselor, reset]);
  const onSubmit = async (data) => {
    const formData = {
      name: data?.name,
      email: data?.email,
      mobile: data?.mobile,
      status: counselor?.status,
      designation: counselor?.designation,
      experience: counselor?.experience,
    };
    await update(counselor.id, formData);
    updateChange(isChange);
  };
  // console.log (counselor)
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
              Name
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Name" {...field} />
                </>
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
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Email" {...field} />
                </>
              )}
            />
          </Grid>{" "}
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Mobile
            </Typography>
            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Mobile" {...field} />
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} alignItems={"flex-end"}>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent="flex-end"
              width={"100px"}
            >
              <StyledButton name="Edit" variant="primary" type="submit" />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
