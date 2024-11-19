import React, { useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledButton } from "../ui/StyledButton";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField .jsx";
import { StyledCalender } from "../ui/StyledCalender";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import StyledUploadImage from "../ui/StyledUploadImage";
import { useEventStore } from "../store/eventStore";
import uploadFileToS3 from "../utils/s3Upload";
import { useNavigate } from "react-router-dom";
import { upload } from "../api/admin/adminapi.js";
import { toast } from "react-toastify";

export default function AddEvent({ onChange, setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addEvents, updateChange, change } = useEventStore();
  const Types = [
    { value: "Week", label: "Week" },
    { value: "Month", label: "Month" },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = data?.event_image || "";
      if (imageFile) {
        try {
          // Use the `upload` function instead of the S3 upload
          imageUrl = await new Promise(async (resolve, reject) => {
            try {
              // Call the `upload` function and pass the image file
              const response = await upload(imageFile);
              resolve(response.data); // Assuming `fileUrl` is the key returned in the API response
            } catch (error) {
              reject(error);
            }
          });
        } catch (error) {
          console.error("Failed to upload image:", error);
          return; // Exit if image upload fails
        }
      }
      const formData = {
        date: data?.date,
        venue: data?.venue,
        guest: data?.guest,
        requisition_image: imageUrl ? imageUrl : "",
        details: data?.description,
        requisition_description: data?.requisition_description,
        title: data?.title,
        remainder: data.remainder.map((option) => option.value),
      };

      await addEvents(formData);
      updateChange(change);
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
    <Box
      sx={{ padding: 3 }}
      bgcolor={"white"}
      borderRadius={"15px"}
      boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Name
            </Typography>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter title" {...field} />
                  {errors.title && (
                    <span style={{ color: "red" }}>{errors.title.message}</span>
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
              Date
            </Typography>
            <Controller
              name="date"
              control={control}
              defaultValue=""
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select Date from Calendar"
                    {...field}
                  />
                  {errors.date && (
                    <span style={{ color: "red" }}>{errors.date.message}</span>
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
              Venue
            </Typography>
            <Controller
              name="venue"
              control={control}
              defaultValue=""
              rules={{ required: "Venue is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Venue" {...field} />
                  {errors.venue && (
                    <span style={{ color: "red" }}>{errors.venue.message}</span>
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
              Chief Guest
            </Typography>
            <Controller
              name="guest"
              control={control}
              defaultValue=""
              rules={{ required: "Chief Guest is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter Chief Guest Name"
                    {...field}
                  />
                  {errors.guest && (
                    <span style={{ color: "red" }}>{errors.guest.message}</span>
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
              Upload Requisition
            </Typography>
            <Controller
              name="event_image"
              control={control}
              defaultValue=""
              render={({ field: { onChange } }) => (
                <>
                  <StyledUploadImage
                    label="Upload  Requisition Image here"
                    onChange={(file) => {
                      setImageFile(file);
                      onChange(file); // Pass the file to the form
                    }}
                  />
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
              Select Remainder
            </Typography>
            <Controller
              name="remainder"
              control={control}
              defaultValue=""
              rules={{ required: "Remainder is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    isMulti
                    placeholder="Select Remainder"
                    options={Types}
                    {...field}
                  />
                  {errors.remainder && (
                    <span style={{ color: "red" }}>
                      {errors.remainder.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Details of Event
            </Typography>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Details of Event is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder="Add Details of Event"
                    rows={5}
                    {...field}
                  />
                  {errors.description && (
                    <span style={{ color: "red" }}>
                      {errors.description.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Requisition Description
            </Typography>
            <Controller
              name="requisition_description"
              control={control}
              defaultValue=""
              rules={{ required: "Requisition Description is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder="Add Requisition Description"
                    rows={5}
                    {...field}
                  />
                  {errors.requisition_description && (
                    <span style={{ color: "red" }}>
                      {errors.requisition_description.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          {/* <Grid item xs={6}></Grid> */}
          <Grid item md={6} xs={12}>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <StyledButton
                name="Cancel"
                variant="secondary"
                disabled={loading}
                style={{ width: "auto" }}
                onClick={(event) => handleClear(event)}
              >
                Cancel
              </StyledButton>
              <StyledButton
                name={loading ? "Saving..." : "Save"}
                variant="primary"
                disabled={loading}
                type="submit"
                style={{ width: "auto" }}
              >
                Save
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
