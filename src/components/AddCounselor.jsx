import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledInput from "../ui/StyledInput";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import StyledSwitch from "../ui/StyledSwitch";
import { StyledButton } from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { useCounselorStore } from "../store/admin/CounselorStore";
import { useListStore } from "../store/listStore";
import { fetchList } from "../api/listapi";
import { toast } from "react-toastify";
const AddCounselor = ({ onChange, setSelectedTab }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [counType, setCounType] = useState([]);
  const { addCounselors } = useCounselorStore();
  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const option =
    counType && Array.isArray(counType)
      ? counType.map((i) => ({
          value: i?.name,
          label: i?.name,
        }))
      : [];

  const getData = async () => {
    const fetch = await fetchList({ type: "counselling-type" });
    setCounType(fetch?.data || []);
  };
  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        name: data?.name,
        designation: data?.designation,
        email: data?.email,
        mobile: data?.mobile,
        password: "password123",
        // status: data.status,
        userType: "counsellor",
        counsellorType: data.counsellorType.map((option) => option.value),
      };
      await addCounselors(formData);
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
          </Grid>
          <Grid item md={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Designation
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{
                required: "Designation is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message:
                    "Designation  should not contain numbers or special characters",
                },
              }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Designation" {...field} />{" "}
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
              Type Of Counseling
            </Typography>
            <Controller
              name="counsellorType"
              control={control}
              defaultValue=""
              rules={{ required: " Counsellor Type is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    label="Type Of Counseling"
                    isMulti
                    options={option}
                    {...field}
                  />{" "}
                  {errors.counsellorType && (
                    <span style={{ color: "red" }}>
                      {errors.counsellorType.message}
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
                  <StyledInput placeholder="Conatct Number" {...field} mobile />{" "}
                  {errors.mobile && (
                    <span style={{ color: "red" }}>
                      {errors.mobile.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item md={6}></Grid>
          <Grid item md={6}>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <StyledButton
                variant="secondary"
                disabled={loading}
                name={"cancel"}
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

export default AddCounselor;
