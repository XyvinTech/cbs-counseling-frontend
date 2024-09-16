import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { StyledTime } from "../../../ui/StyledTime";
import StyledSelectField from "../../../ui/StyledSelectField";
import { StyledButton } from "../../../ui/StyledButton";
import { StyledMultilineTextField } from "../../../ui/StyledMultilineTextField ";

import StyledSwitch from "/src/ui/StyledSwitch.jsx";
import { StyledCalender } from "../../../ui/StyledCalender";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTimeStore } from "../../../store/counselor/TimeStore";
import { useSessionStore } from "../../../store/counselor/SessionStore";
import { toast } from "react-toastify";
export default function RescheduleSession() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData } = location.state || {};
  const { slots, fetchSlot, days, allSlot } = useTimeStore();
  const { updateSession } = useSessionStore();
  const [day, setDay] = useState([]);
  const [date, setDate] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSwitchChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleDateChange = (formattedDate, dayOfWeek) => {
    setDate(formattedDate);
    setDay(dayOfWeek);
  };

  useEffect(() => {
    if (rowData?.counsellor?._id) {
      allSlot(rowData?.counsellor?._id);
    }
  }, [rowData?.counsellor]);
  useEffect(() => {
    if (rowData?.counsellor != null && day != null) {
      const filter = { day, date };
      fetchSlot(rowData?.counsellor?._id, filter);
    }
  }, [rowData?.counsellor, day, date]);
  const timeOptions =
    slots?.map((slot) => ({
      value: slot,
      label: `${slot.start} - ${slot.end}`,
    })) || [];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        session_date: data?.session_date,
        session_time: data?.session_time.value,
        reschedule_remark: data?.reschedule_remark,
      };

      await updateSession(id, formData);
      navigate(`/student/session`);
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
  // console.log("Form data:", rowData.counsellor);
  return (
    <>
      <Box padding="30px">
        <Typography variant="h4" color={"#4A4647"} sx={{ marginBottom: 4 }}>
          Upcoming Sessions / Reschedule ‘Personal Story’
        </Typography>
      </Box>
      <Box paddingTop="0px" paddingLeft={"30px"} marginBottom={4}>
        {" "}
        <Box
          bgcolor={"white"}
          padding={3}
          width={"804px"}
          justifyContent={"center"}
          alignItems={"center"}
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
                        label="Select Date from Calender"
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
              <Grid item xs={12}>
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
              </Grid>{" "}
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Reason for Rescheduling
                </Typography>
                <Controller
                  name="reschedule_remark"
                  control={control}
                  defaultValue=""
                  rules={{ required: " Remark is required" }}
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField
                        {...field}
                        placeholder={"Reason For Reschedule"}
                      />
                      {errors.reschedule_remark && (
                        <span style={{ color: "red" }}>
                          {errors.reschedule_remark.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              {/* <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#333333"}
            >
              Virtual Platform
            </Typography>
            <Controller
              name="platform"
              control={control}
              defaultValue=""
              rules={{ required: "Platform is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField {...field} options={option} />{" "}
                  {errors.platform && (
                    <span style={{ color: "red" }}>
                      {errors.platform.message}
                    </span>
                  )}{" "}
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
              Reason for rescheduling
            </Typography>
            <Controller
              name="reason"
              control={control}
              defaultValue=""
              rules={{ required: "Reason is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    label="Add Description in less than 500 words"
                    {...field}
                    rows={4}
                  />{" "}
                  {errors.reason && (
                    <span style={{ color: "red" }}>
                      {errors.reason.message}
                    </span>
                  )}{" "}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Confirm Reschedule
              </Typography>
              <Controller
                name="activate"
                control={control}
                defaultValue={false}
                rules={{ required: "Activate is required" }}
                render={({ field }) => (
                  <>
                    <StyledSwitch
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        handleSwitchChange(e);
                      }}
                    />{" "}
                    {errors.activate && (
                      <span style={{ color: "red" }}>
                        {errors.activate.message}
                      </span>
                    )}{" "}
                  </>
                )}
              />
            </Stack>
          </Grid> */}
              <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                {" "}
                <Stack direction={"row"} spacing={2}>
                  <StyledButton
                    name="Cancel"
                    variant="secondary"
                    style={{ width: "auto" }}
                    disabled={loading}
                    onClick={(event) => handleClear(event)}
                  >
                    Cancel
                  </StyledButton>
                  <StyledButton
                    name={loading ? "Saving..." : "Save"}
                    variant="primary"
                    disabled={loading}
                    style={{ width: "auto" }}
                  >
                    Save
                  </StyledButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>{" "}
      </Box>{" "}
    </>
  );
}
