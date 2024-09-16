import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import StyledInput from "../ui/StyledInput";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledSwitch from "../ui/StyledSwitch";
import { StyledButton } from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { useCounselorStore } from "../store/admin/CounselorStore";
import { useStudentStore } from "../store/admin/studentStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AddStudent = ({ onChange, setSelectedTab }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const { addStudents } = useStudentStore();
  const [loading, setLoading] = useState(false);
  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        name: data?.name,
        designation: data?.designation,
        email: data?.email,
        parentContact: data?.parentContact,
        mobile: data?.mobile,
        password: "password123",
        division: data?.division,
        userType: "student",
      };
      await addStudents(formData);
      navigate("/user/student");
      onChange();
      reset();
      setSelectedTab(0);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = (event) => {
    event.preventDefault();
    reset();
  };
  return (
    <Box bgcolor={"white"} padding={3} width={"804px"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Name
            </Typography>{" "}
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message:
                    "Name should not contain numbers or special characters",
                },
              }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Full Name" {...field} />{" "}
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item md={6}>
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
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Email" {...field} />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                  )}{" "}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Standard
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{
                required: "Standard is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Standard must be a number",
                },
              }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Standard" {...field} />{" "}
                  {errors.designation && (
                    <span style={{ color: "red" }}>
                      {errors.designation.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Division
            </Typography>
            <Controller
              name="division"
              control={control}
              defaultValue=""
              rules={{
                required: "Division is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/, 
                  message: "Division must only contain letters",
                },
              }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Division" {...field} />
                  {errors.division && (
                    <span style={{ color: "red" }}>
                      {errors.division.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Contact Number
            </Typography>
            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              rules={{
                required: "Contact is required",
                // pattern: {
                //   value: /^\+?\d{10,15}$/,
                //   message: "Enter a valid contact number",
                // },
              }}
              render={({ field }) => (
                <>
                  <StyledInput mobile placeholder="Conatct Number" {...field} />{" "}
                  {errors.mobile && (
                    <span style={{ color: "red" }}>
                      {errors.mobile.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Alternative Contact Number
            </Typography>
            <Controller
              name="parentContact"
              control={control}
              defaultValue=""
              rules={{
                required: " Alternative Contact Number is required",
                // pattern: {
                //   value: /^\+?\d{10,15}$/,
                //   message: "Enter a valid contact number",
                // },
              }}
              render={({ field }) => (
                <>
                  <StyledInput
                    {...field}
                    placeholder={" Alternative Contact Number"}
                    mobile
                  />{" "}
                  {errors.parentContact && (
                    <span style={{ color: "red" }}>
                      {errors.parentContact.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item md={6}></Grid>
          <Grid item md={6}>
            <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
              <StyledButton
                variant="secondary"
                name={"cancel"}
                disabled={loading}
                onClick={(event) => handleClear(event)}
              />
              <StyledButton
                variant="primary"
                disabled={loading}
                name={loading ? "Saving..." : "Save"}
                type="submit"
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddStudent;
