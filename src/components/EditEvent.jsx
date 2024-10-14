import React, { useEffect, useState } from "react";
import { Dialog, Grid, Stack, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { StyledButton } from "../ui/StyledButton";
import StyledInput from "../ui/StyledInput";
import { StyledCalender } from "../ui/StyledCalender";
import StyledUploadImage from "../ui/StyledUploadImage";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { useEventStore } from "../store/eventStore";
import StyledSelectField from "../ui/StyledSelectField";
import { toast } from "react-toastify";
import { upload } from "../api/admin/adminapi";

const EditEvent = ({ open, onClose, onChange, rowData }) => {
  const { editEvents, updateChange, change } = useEventStore();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const Types = [
    { value: "Week", label: "Week" },
    { value: "Month", label: "Month" },
  ];
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (rowData) {
      reset({
        title: rowData.title || "",
        date: rowData.date || "",
        venue: rowData.venue || "",
        guest: rowData.guest || "",
        // Slice to remove seconds if present
        event_image: rowData.requisition_image || "",
        description: rowData.details || "",
        requisition_description: rowData.requisition_description || "",
        remainder:
          rowData.remainder.map((value) =>
            Types.find((type) => type.value === value)
          ) || [],
      });
    }
  }, [rowData, reset]);

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

      await editEvents(rowData?._id, formData);
      updateChange(change);
      onChange();
      reset();
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
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color="#333333"
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
              color="#333333"
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
                    rowData={rowData}
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
                    rowData={rowData}
                    onChange={(file) => {
                      setImageFile(file);
                      onChange(file);
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
              defaultValue={[]}
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
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color="#333333"
            >
              Details of Event
            </Typography>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    label="Add Description in less than 500 words"
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
          </Grid>{" "}
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
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Stack direction="row" spacing={2}>
              <StyledButton
                name="Cancel"
                variant="secondary"
                style={{ width: "auto" }}
                onClick={(event) => handleClear(event)}
              >
                Cancel
              </StyledButton>
              <StyledButton
                name="Save"
                variant="primary"
                type="submit"
                style={{ width: "auto" }}
              >
                Save
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default EditEvent;
