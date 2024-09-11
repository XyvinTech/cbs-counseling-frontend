import { Box, Grid, Stack, Typography } from "@mui/material";
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

export default function AddMeeting() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { counselors, fetchCounselors } = useCounselorStore();
  const { addSessions } = useSessionStore();
  const { slots, fetchSlot, days, allSlot } = useTimeStore();
  const [type, setType] = useState();
  const [day, setDay] = useState();
  const [loading, setLoading] = useState(false);
  const { lists, fetchLists } = useListStore();
  const [date, setDate] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    if (type) {
      fetchCounselors({ counsellorType: type });
    }
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
  
      fetchLists(filter);
    }, [fetchLists]);
  const CounselorTypes =  lists && Array.isArray(lists)
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
      };

      await addSessions(formData);

      navigate(`/student/session`);
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
  return (
    <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"15px"}>
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
                    <span style={{ color: "red" }}>{errors.type.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          {type && (
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
          )}
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
                      label="Select Date from Calendar"
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
                    placeholder="Add Reason for counseling"
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
            <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
              <StyledButton
                name="Cancel"
                variant="secondary"
                disabled={loading}
                onClick={(event) => handleClear(event)}
              >
                Cancel
              </StyledButton>
              <StyledButton
                name={loading ? "Saving..." : "Save"}
                variant="primary"
                type="submit"
                disabled={loading}
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
