import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledCalender } from "../ui/StyledCalender";
import { StyledButton } from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../ui/StyledInput";
import { useCounselorStore } from "../store/admin/CounselorStore";
import { useTimeStore } from "../store/counselor/TimeStore";
import { useSessionStore } from "../store/counselor/SessionStore";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { useNavigate } from "react-router-dom";
import { useListStore } from "../store/listStore";
import { toast } from "react-toastify";
import bg from "../assets/images/BG-form.jpg";
import logo from "../assets/images/logo.jpg";

export default function AddMeeting() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { counselors, fetchCounselors } = useCounselorStore();
  const { addSessions, sessionId } = useSessionStore();
  const { slots, fetchSlot, days, allSlot } = useTimeStore();
  const [type, setType] = useState();
  const [day, setDay] = useState();
  const [loading, setLoading] = useState(false);
  const { lists, userSession } = useListStore();
  const [date, setDate] = useState();
  const [id, setId] = useState();
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  useEffect(() => {
    // if (type) {
    fetchCounselors({ counsellorType: type });
    // }
  }, [fetchCounselors, type]);

  useEffect(() => {
    if (id) {
      allSlot(id);
    }
  }, [id, allSlot]);

  useEffect(() => {
    if (id && day) {
      fetchSlot(id, { day, date });
    }
  }, [id, day, date]);

  const handleDateChange = (formattedDate, dayOfWeek) => {
    setDate(formattedDate);
    setDay(dayOfWeek);
  };

  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };

  const handleCounselorChange = (selectedOption) => {
    setId(selectedOption.value);
  };

  const options =
    counselors && Array.isArray(counselors)
      ? counselors.map((list) => ({
          value: list?.id,
          label: list?.name,
        }))
      : [];

  const timeOptions =
    slots?.map((slot) => ({
      value: slot,
      label: `${slot.start} - ${slot.end}`,
    })) || [];
  useEffect(() => {
    let filter = { type: "counselling-type" };

    userSession(filter);
  }, []);
  const CounselorTypes =
    lists && Array.isArray(lists)
      ? lists.map((i) => ({
          value: i?.name,
          label: i?.name,
        }))
      : [];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        type: data?.type.value,
        counsellor: data?.counsellor.value,
        session_date: data?.session_date,
        session_time: data?.session_time.value,
        description: data.description,
        form_id: sessionId,
      };

      await addSessions(formData);
      setOpenSuccessDialog(true);
      reset();
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
  const handleCloseDialog = () => {
    setOpenSuccessDialog(false);
    window.location.href = "https://www.iswkoman.com/";
  };
  return (
    <Grid
      container
      height="100vh"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item md={6}>
        <Card
          sx={{
            p: 4,
            maxWidth: "900px",
            width: "100%",
            boxShadow: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight={600}
              textAlign="center"
              mb={3}
              color="primary.main"
            >
              Book Appoinment
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Select Counseling Type
                  </Typography>
                  <Controller
                    name="type"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Counseling type is required" }}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          options={CounselorTypes} 
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleTypeChange(e);
                          }}
                        />
                        {errors.type && (
                          <span style={{ color: "red" }}>
                            {errors.type.message}
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
                    color={"#333333"}
                  >
                    Choose Counselor
                  </Typography>
                  <Controller
                    name="counsellor"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Counselor is required" }}
                    render={({ field }) => (
                      <>
                        <StyledSelectField 
                        
                          options={options}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleCounselorChange(e);
                          }}
                        />
                        {errors.counsellor && (
                          <span style={{ color: "red" }}>
                            {errors.counsellor.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Grid>

                {id && (
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
                      name="session_date"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Date is required" }}
                      render={({ field }) => (
                        <>
                          <StyledCalender
                            
                            {...field}
                            highlightDays={days}
                            onChange={(formattedDate, dayOfWeek) => {
                              field.onChange(formattedDate);
                              handleDateChange(formattedDate, dayOfWeek);
                            }}
                          />
                          {errors.session_date && (
                            <span style={{ color: "red" }}>
                              {errors.session_date.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                )}
                {date && (
                  <Grid item xs={6}>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Time
                    </Typography>
                    <Controller
                      name="session_time"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Time is required" }}
                      render={({ field }) => (
                        <>
                          <StyledSelectField options={timeOptions} {...field} />
                          {errors.session_time && (
                            <span style={{ color: "red" }}>
                              {errors.session_time.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography
                    sx={{ marginBottom: 1 }}
                    variant="h6"
                    fontWeight={500}
                    color={"#333333"}
                  >
                    Reason for counseling
                  </Typography>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Reason for counseling is required" }}
                    render={({ field }) => (
                      <>
                        <StyledMultilineTextField
                        
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
                <Grid item xs={6}></Grid>
                <Grid item md={6} xs={12}>
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent={"flex-end"}
                  >
                    {" "}
                    <StyledButton
                      name={"Book"}
                      variant="form"
                      type="submit"
                      disabled={loading}
                    />
                    <StyledButton
                      name="Cancel"
                      variant="formClear"
                      disabled={loading}
                      onClick={(event) => handleClear(event)}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Card>
      </Grid>
      <Dialog open={openSuccessDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Your Appoinment request has been submitted. You will recieve a
          confirmation once the appointment request is approved !
        </DialogTitle>
        <DialogActions>
          <StyledButton
            variant="primary"
            onClick={handleCloseDialog}
            name={"OK"}
          />
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
