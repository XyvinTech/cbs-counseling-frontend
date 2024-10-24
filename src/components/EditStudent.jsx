import React, { useEffect, useState } from "react";
import { Box, Dialog, Divider, Grid, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import StyledInput from "../ui/StyledInput";
import { useStudentStore } from "../store/admin/studentStore";
import { toast } from "react-toastify";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledDate } from "../ui/StyledDate";

const EditStudent = ({ open, onClose, setIsChange, rowData }) => {
  const { updateStudent } = useStudentStore();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const Types = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  useEffect(() => {
    const genderOption = Types?.find((type) => type?.value === rowData?.gender);
    reset({
      name: rowData?.name || "",
      designation: rowData?.designation || "",
      email: rowData?.email || "",
      parentContact: rowData?.parentContact || "",
      mobile: rowData?.mobile || "",
      division: rowData?.division || "",
      StudentReferencesCode: rowData?.StudentReferencesCode || "",
      gender: genderOption || "",
    });
  }, [rowData, reset]);


  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        name: data?.name,
        designation: data?.designation,
        email: data?.email,
        parentContact: data?.parentContact.replace(/\s+/g, ""),
        mobile: data?.mobile.replace(/\s+/g, ""),
        gender: data?.gender.value,
        StudentReferencesCode: data?.StudentReferencesCode,
        status: true,
      };

      await updateStudent(rowData?._id, formData);
      setIsChange((prev) => !prev);
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
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "21px" },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4} padding={5}>
          <Grid item md={6}>
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
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Full Name" {...field} />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                  )}
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
              Standard
            </Typography>
            <Controller
              name="designation"
              control={control}
              rules={{ required: "Standard is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Standard" {...field} />
                  {errors.designation && (
                    <span style={{ color: "red" }}>
                      {errors.designation.message}
                    </span>
                  )}
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
              Division
            </Typography>
            <Controller
              name="division"
              control={control}
              rules={{ required: "Division is required" }}
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
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Email" {...field} />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                  )}
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
              GRP Number
            </Typography>{" "}
            <Controller
              name="StudentReferencesCode"
              control={control}
              defaultValue=""
              rules={{
                required: "GRP Number is required",
              }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter GRP Number" {...field} />{" "}
                  {errors.StudentReferencesCode && (
                    <span style={{ color: "red" }}>
                      {errors.StudentReferencesCode.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Select Gender
            </Typography>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select Gender"
                    options={Types}
                    {...field}
                  />
                  {errors.gender && (
                    <span style={{ color: "red" }}>
                      {errors.gender.message}
                    </span>
                  )}
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
              Alternative Contact Number
            </Typography>
            <Controller
              name="parentContact"
              control={control}
              rules={{ required: " Alternative Contact Number is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder=" Alternative Contact Number"
                    {...field}
                  />
                  {errors.parentContact && (
                    <span style={{ color: "red" }}>
                      {errors.parentContact.message}
                    </span>
                  )}
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
              Contact Number
            </Typography>
            <Controller
              name="mobile"
              control={control}
              rules={{ required: "Contact is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Contact Number" {...field} />
                  {errors.mobile && (
                    <span style={{ color: "red" }}>
                      {errors.mobile.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item md={12} display={"flex"} justifyContent={"end"}>
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                variant="secondary"
                name={"cancel"}
                onClick={(event) => handleClear(event)}
              />
              <StyledButton
                variant="primary"
                name={loading ? "Saving..." : "save"}
                type="submit"
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default EditStudent;
