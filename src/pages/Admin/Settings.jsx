import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";

import { StyledButton } from "../../ui/StyledButton";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField .jsx";
import { StyledCalender } from "../../ui/StyledCalender";
import StyledInput from "../../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledUploadImage from "../../ui/StyledUploadImage";
import { StyledTime } from "../../ui/StyledTime.jsx";
import { useAdminStore } from "../../store/admin/AdminStore.js";

export default function Settings() {
  const { admin, update, updateChange ,isChange} = useAdminStore();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (admin) {
      reset({
        name: admin.name || "",
        email: admin.email || "",
      });
    }
  }, [admin, reset]);
  const onSubmit = async (data) => {
    const formData = {
      name: data?.name,
      email: data?.email,
      status: admin?.status,
    };
    await update(admin.id, formData);
    updateChange(isChange);
  };
  return (
    <Box sx={{ padding: 3 }}  borderRadius={"4px"}>
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
