import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import StyledInput from "../../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/student/authStore";
import { StyledButton } from "../../ui/StyledButton";

export default function StudentSettings() {
  const { student, update, updateChange,isChange } = useAuthStore();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (student) {
      reset({
        name: student.name || "",
        email: student.email || "",
        mobile: student.mobile || "",
      });
    }
  }, [student, reset]);
  const onSubmit = async (data) => {
    const formData = {
      name: data?.name,
      email: data?.email,
      mobile: data?.mobile,
      status: student?.status,
      designation: student?.designation,
      // parentcontact: student?.parentcontact,
    };
    await update(student.id, formData);
    updateChange(isChange);
  };
  // console.log (student)
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
