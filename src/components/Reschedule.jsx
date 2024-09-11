import React, { useEffect, useState } from "react";
import { Typography, Dialog, DialogContent, Stack } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import StyledSelectField from "../ui/StyledSelectField";
import StyledInput from "../ui/StyledInput";
import { Controller, useForm } from "react-hook-form";
import { useSessionStore } from "../store/counselor/SessionStore";
import { StyledCalender } from "../ui/StyledCalender";
import { useTimeStore } from "../store/counselor/TimeStore";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";

const Reschedule = ({ open, onClose, rowId, counselor, onChange }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [day, setDay] = useState([]);
  const { rescheduleSession } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const { slots, timeSlot, days, allSlot } = useTimeStore();
  const [date, setDate] = useState();
  const handleDateChange = (formattedDate, dayOfWeek) => {
    setDate(formattedDate);
    setDay(dayOfWeek);
  };
  useEffect(() => {
    if (counselor) {
      console.log('conselor',counselor);
      
      allSlot(counselor);
    }
  }, [counselor]);
  useEffect(() => {
    if (counselor != null && day != null) {
      let filter = {
        day: day,
        date: date,
      };
      timeSlot(counselor, filter);
    }
  }, [counselor, day, date]);
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
        c_reschedule_remark: data?.reschedule_remark,
      };
      await rescheduleSession(rowId, formData);
      reset();
      onChange();
      onClose();
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} paddingTop={2} marginBottom={10}>
            <Typography variant="h6" color={"#333333"}>
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
                    highlightDays={days}
                    {...field}
                    onChange={(formattedDate, dayOfWeek) => {
                      field.onChange(formattedDate);
                      handleDateChange(formattedDate, dayOfWeek);
                    }}
                  />{" "}
                  {errors.session_date && (
                    <span style={{ color: "red" }}>
                      {errors.session_date.message}
                    </span>
                  )}
                </>
              )}
            />
            <Typography variant="h6" color={"#333333"}>
              Time
            </Typography>
            <Controller
              name="session_time"
              control={control}
              rules={{ required: "Time is required" }}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledSelectField {...field} options={timeOptions} />
                  {errors.session_time && (
                    <span style={{ color: "red" }}>
                      {errors.session_time.message}
                    </span>
                  )}
                </>
              )}
            />
            <Typography variant="h6" color={"#333333"}>
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
          </Stack>
        </DialogContent>
        <Stack direction={"row"} spacing={2} padding={4} justifyContent={"end"}>
          <StyledButton
            variant="secondary"
            name="Cancel"
            disabled={loading}
            onClick={(event) => handleClear(event)}
          />
          <StyledButton
            variant="primary"
            disabled={loading}
            name={loading ? "Saving..." : "Save"}
            type="submit"
          />
        </Stack>{" "}
      </form>
    </Dialog>
  );
};

export default Reschedule;
