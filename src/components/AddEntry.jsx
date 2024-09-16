import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  FormControlLabel,
  Checkbox,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledButton } from "../ui/StyledButton";
import { StyledCalender } from "../ui/StyledCalender";
import StyledSwitch from "/src/ui/StyledSwitch.jsx";
import DropZone from "../ui/DropZone";
import { Controller, useForm } from "react-hook-form";
import { StyledMultilineTextField } from "../ui/StyledMultilineTextField ";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTimeStore } from "../store/counselor/TimeStore";
import { useCounselorStore } from "../store/admin/CounselorStore";
import { useSessionStore } from "../store/counselor/SessionStore";
import moment from "moment-timezone";
import StyledInput from "../ui/StyledInput";
import { toast } from "react-toastify";
export default function AddEntry() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { slots, timeSlot, days, allSlot } = useTimeStore();
  const { counselors, allCounselors, showBackButton, setShowBackButton } =
    useCounselorStore();
  const { counsellorAddEntry } = useSessionStore();
  const { rowData } = location.state || {};
  const [type, setType] = useState();
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [counselor, setCounselor] = useState(rowData?.counsellor?._id || "");
  const [day, setDay] = useState([]);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
console.log('data',rowData);
  const formatDate = (dateString, format = "MMM DD, YYYY ") => {
    return moment.tz(dateString, "Asia/Muscat").format(format);
  };
  const handleSwitchChange = (e, setter) => {
    setter(e.target.checked);
  };
  const handleDateChange = (formattedDate, dayOfWeek) => {
    setDate(formattedDate);
    setDay(dayOfWeek);
  };
  useEffect(() => {
    if (counselor) {

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
  }, [counselor, day, timeSlot, date]);
  
  useEffect(() => {
    let filter = {};

    allCounselors(filter);
  }, [allCounselors]);
  const handleCounselor = (selectedOption) => {
    setCounselor(selectedOption.value);
  };
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };
  const options =
    counselors && Array.isArray(counselors)
      ? counselors.map((list) => ({
          value: list?.id,
          label: list?.name,
        }))
      : [];
console.log('data',counselors);
  const timeOptions =
    slots?.map((slot) => ({
      value: slot,
      label: `${slot.start} - ${slot.end}`,
    })) || [];
  const option = [
    { value: "Next Appoinment", label: "Next Appoinment" },
    { value: "Close Case", label: "Close Case" },
    { value: "Refer With Session", label: "Refer With Session" },
    { value: "Refer", label: "Refer" },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        details: data?.details,

        session_id: rowData?._id,
        user_id: rowData?.user?._id,
        interactions: data?.interactions,
      }
      if (!showDatePicker) {
        formData.concern_raised = data?.concern_raised;
      } else {
        formData.concern_raised = rowData?.session_date;
      }
      if (type === "Refer With Session") {
        formData.refer = counselor;
        formData.with_session = true;
      }
      if (type === "Close Case") {
        formData.reason_for_closing = data?.reason_for_closing;
        formData.close = true;
      }
      if (type === "Refer") {
        
        formData.refer = counselor;

      }
      if (type !== "Refer" && type !== "Close Case") {
        formData.date = data?.date;
        formData.time = data?.time.value;
      }
      // console.log( formData)
      await counsellorAddEntry(rowData.case_id, formData);
     
      reset();
      navigate(`/counselor/session`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  
  };
  console.log(counselor);
  const handleViewHistory = (event) => {
    event.preventDefault();
    const currentFormData = getValues();
    localStorage.setItem("formData", JSON.stringify(currentFormData));
    setShowBackButton(true);
    navigate(`/counselor/session/case/${rowData.case_id._id}`);
  };
  const handleClear = (event) => {
    event.preventDefault();
    reset();
  };
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (savedFormData) {
      reset(savedFormData);
      localStorage.removeItem("formData");
    }
  }, [reset]);
  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Session No / Add Entry
        </Typography>
      </Box>
      <Box padding="30px" marginBottom={4}>
        {" "}
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#333333"}
                          >
                            Case ID
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#0072bc"}
                          >
                            {rowData?.caseid}
                          </Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#333333"}
                          >
                            Student Name
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#0072bc"}
                          >
                            {rowData?.user?.name}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#333333"}
                          >
                            Grade
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#0072bc"}
                          >
                            {rowData?.user?.designation} {rowData?.user?.division}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#333333"}
                          >
                            Type of Counseling
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#0072bc"}
                          >
                            {rowData?.type}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell
                          sx={{
                            borderRight: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#333333"}
                          >
                            Referred By
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#0072bc"}
                          >
                            {rowData?.referer_name
                              ? rowData?.referer_name
                              : "-"}
                          </Typography>
                        </TableCell>
                      </TableRow> */}
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#333333"}
                          >
                            Date of Appointment
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#0072bc"}
                          >
                            {formatDate(rowData?.session_date)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: "1px solid #e0e0e0",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#333333"}
                          >
                            Time of Appointment
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#0072bc"}
                          >
                            {rowData?.session_time.start} -{" "}
                            {rowData?.session_time.end}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#0072bc"}
                          >
                            Reason for Counseling
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={500}
                            color={"#333333"}
                          >
                            {rowData?.description}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {rowData?.case_details_array &&
                        rowData.case_details_array.filter(
                          (detail) => detail !== null
                        ).length > 0 && (
                          <TableRow>
                            <TableCell colSpan={2}>
                              <Typography
                                variant="h6"
                                fontWeight={500}
                                color={"#0072bc"}
                              >
                                Case Details
                              </Typography>

                              <Typography
                                variant="h6"
                                fontWeight={500}
                                color={"#333333"}
                              >
                                {rowData?.case_details_array &&
                                rowData.case_details_array.length > 0 ? (
                                  <ul
                                    style={{
                                      margin: 0,
                                      padding: 0,
                                      listStyleType: "none",
                                    }}
                                  >
                                    {rowData.case_details_array.map(
                                      (detail, index) => (
                                        <li
                                          key={index}
                                          style={{ paddingBottom: 4 }}
                                        >
                                          {detail}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  "-"
                                )}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}

                      {rowData?.referer_remark &&
                        rowData.referer_remark.filter(
                          (remark) => remark !== null
                        ).length > 0 && (
                          <TableRow>
                            <TableCell colSpan={2}>
                              <Typography
                                variant="h6"
                                fontWeight={500}
                                color={"#0072bc"}
                              >
                                Referrer Remarks
                              </Typography>

                              <Typography
                                variant="h6"
                                fontWeight={500}
                                color={"#333333"}
                              >
                                <ul
                                  style={{
                                    margin: 0,
                                    padding: 0,
                                    listStyleType: "none",
                                  }}
                                >
                                  {rowData.referer_remark.map(
                                    (remark, index) => (
                                      <li
                                        key={index}
                                        style={{ paddingBottom: 4 }}
                                      >
                                        <strong>{remark.name}:</strong>{" "}
                                        {remark.remark}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      <TableRow>
                        <TableCell colSpan={2}>
                          <StyledButton
                            name="View History"
                            variant="primary"
                            onClick={(event) => handleViewHistory(event)}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>{" "}
                </TableContainer>
              </Grid>{" "}
              <Grid item md={6}>
                {" "}
                <Stack
                  spacing={2}
                  bgcolor={"white"}
                  padding={4}
                  component={Paper}
                >
                  <Stack justifyContent={"space-between"}>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Date of concern raised
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showDatePicker}
                          onChange={(e) => setShowDatePicker(e.target.checked)}
                        />
                      }
                      label="Same as Date of Appoinment"
                    />{" "}
                  </Stack>
                  {!showDatePicker && (
                    <>
                      <Typography
                        sx={{ marginBottom: 1 }}
                        variant="h6"
                        fontWeight={500}
                        color={"#333333"}
                      >
                        Select Date of concern
                      </Typography>
                      <Controller
                        name="concern_raised"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <StyledCalender
                              label="Select Date of concern"
                              {...field}
                              onChange={(formattedDate, dayOfWeek) => {
                                field.onChange(formattedDate);
                                handleDateChange(formattedDate, dayOfWeek);
                              }}
                            />
                          </>
                        )}
                      />
                    </>
                  )}{" "}
                  <>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Interaction with Student/Parent/Teacher/Peers
                    </Typography>
                    <Controller
                      name="interactions"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Interactions are required" }}
                      render={({ field }) => (
                        <>
                          <StyledInput
                            placeholder="Add Interactions"
                            rows={4}
                            {...field}
                          />
                          {errors.interactions && (
                            <span style={{ color: "red" }}>
                              {errors.interactions.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </>
                  <>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Case Details
                    </Typography>
                    <Controller
                      name="details"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Case details are required" }}
                      render={({ field }) => (
                        <>
                          <StyledMultilineTextField
                            placeholder="Add Case details"
                            rows={4}
                            {...field}
                          />
                          {errors.caseDetails && (
                            <span style={{ color: "red" }}>
                              {errors.caseDetails.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </>
                  <>
                    <Typography
                      sx={{ marginBottom: 1 }}
                      variant="h6"
                      fontWeight={500}
                      color={"#333333"}
                    >
                      Case Status
                    </Typography>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <>
                          <StyledSelectField
                            options={option}
                            {...field}
                            placeholder=" Case Status"
                            onChange={(e) => {
                              field.onChange(e);
                              handleTypeChange(e);
                            }}
                          />
                        </>
                      )}
                    />
                  </>
                  {(type === "Refer With Session" || type === "Refer") && (
                    <>
                      <Typography
                        sx={{ marginBottom: 1 }}
                        variant="h6"
                        fontWeight={500}
                        color={"#333333"}
                      >
                        Referred to
                      </Typography>
                      <Controller
                        name="refer"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <StyledSelectField
                              options={options}
                              label="Referred To"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                handleCounselor(e);
                              }}
                            />
                          </>
                        )}
                      />
                    </>
                  )}
                  {(type === "Next Appoinment" ||
                    type === "Refer With Session") && (
                    <>
                      <Typography
                        sx={{ marginBottom: 1 }}
                        variant="h6"
                        fontWeight={500}
                        color={"#333333"}
                      >
                        Date of Next Appointment
                      </Typography>
                      <Controller
                        name="date"
                        control={control}
                        defaultValue=""
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
                          </>
                        )}
                      />

                      <>
                        <Typography
                          sx={{ marginBottom: 1 }}
                          variant="h6"
                          fontWeight={500}
                          color={"#333333"}
                        >
                          Time
                        </Typography>
                        <Controller
                          name="time"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <>
                              <StyledSelectField
                                {...field}
                                options={timeOptions}
                              />
                            </>
                          )}
                        />
                      </>
                    </>
                  )}
                  {type === "Close Case" && (
                    <>
                      <Typography
                        sx={{ marginBottom: 1 }}
                        variant="h6"
                        fontWeight={500}
                        color={"#333333"}
                      >
                        Reason For Closure
                      </Typography>
                      <Controller
                        name="reason_for_closing"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <StyledMultilineTextField
                              placeholder="Reason For Closure"
                              {...field}
                            />
                          </>
                        )}
                      />
                    </>
                  )}
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"flex-end"}
                  >
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
                      disabled={loading}
                      name={loading ? "Saving..." : "Save"}
                      variant="primary"
                      type="submit"
                      style={{ width: "auto" }}
                    >
                      Save
                    </StyledButton>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>{" "}
          </form>
        </Box>
      </Box>
    </>
  );
}
