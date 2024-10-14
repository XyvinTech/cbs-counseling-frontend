import React, { useEffect, useState } from "react";
import { Dialog, Divider, Grid, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import StyledInput from "../ui/StyledInput";
import { useCounselorStore } from "../store/admin/CounselorStore";
import { useListStore } from "../store/listStore";
import StyledSelectField from "../ui/StyledSelectField";
import { toast } from "react-toastify";
import { fetchList } from "../api/listapi";

const EditCounselor = ({ open, onClose, onChange, rowData }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [counType, setCounType] = useState([]);
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
  const { editCounsellor } = useCounselorStore();
  const Types = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  useEffect(() => {
    const genderOption = Types?.find((type) => type?.value === rowData?.gender);
    if (rowData) {
      reset({
        name: rowData.name || "",
        designation: rowData.designation || "",
        email: rowData.email || "",
        counsellorType:
          rowData?.counsellorType?.map((value) =>
            option?.find((type) => type.value === value)
          ) || [],
        mobile: rowData.mobile || "",
        gender: genderOption || "",
      });
    }
  }, [rowData, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        name: data?.name,
        designation: data?.designation,
        email: data?.email,
        experience: data?.experience,
        mobile: data?.mobile,
        mobile: data?.mobile.replace(/\s+/g, ""),
        gender: data?.gender.value,
        counsellorType: data.counsellorType.map((option) => option.value),
      };

      await editCounsellor(rowData?._id, formData);
      onClose();
      onChange();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("rowData", rowData);
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
              defaultValue=""
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
              Designation
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{ required: "Designation is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Designation" {...field} />
                  {errors.designation && (
                    <span style={{ color: "red" }}>
                      {errors.designation.message}
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
              Email
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
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
              Type Of Counseling
            </Typography>
            <Controller
              name="counsellorType"
              control={control}
              defaultValue={[]}
              rules={{ required: " Counselor Type is required" }}
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
              <StyledButton variant="primary" name={"save"} type="submit" />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default EditCounselor;
