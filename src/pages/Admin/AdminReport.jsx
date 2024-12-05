import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledButton } from "../../ui/StyledButton";
import { useDropDownStore } from "../../store/dropDownStore";
import { getExcelReport } from "../../api/admin/adminapi";
import { StyledDatePicker } from "../../ui/StyledDatePicker";
import { toast } from "react-toastify";

const AdminReport = () => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();
  const { users, students, fetchLists } = useDropDownStore();
  const [type, setType] = useState();

  const Types = [
    { label: "Session", value: "session" },
    { label: "Case", value: "case" },
    { label: "Student session count", value: "student-session-count" },
    { label: "Teacher session count", value: "teacher-session-count" },
    { label: "Parent session count", value: "parent-session-count" },
  ];
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };

  useEffect(() => {
    fetchLists({ type: "counsellers", limit: "all" });
    fetchLists({ type: "students", limit: "all" });
  }, []);

  const counselorOptions =
    users?.map((user) => ({ value: user?._id, label: user?.name })) || [];
  const studentOptions =
    students?.map((student) => ({
      value: student?.StudentReferencesCode,
      label: student?.name,
    })) || [];
  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");

  useEffect(() => {
    if (watchStartDate && !watchEndDate) {
      setError("endDate", {
        type: "required",
        message: "End Date is required when Start Date is selected.",
      });
    } else if (watchStartDate && watchEndDate) {
      clearErrors("endDate");
    }
  }, [watchStartDate, watchEndDate, setError, clearErrors]);
  const onSubmit = async (fdata) => {
    try {
      const formData = {
        reportType: type,
      };
      if (type === "session") {
        formData.startDate = fdata?.startDate;
        formData.endDate = fdata?.endDate;
        formData.counselor = fdata?.counselor?.value;
        formData.grNumber = fdata?.student?.value;
      }
      if (type === "case") {
        formData.grNumber = fdata?.student?.value;
      }
      const response = await getExcelReport(formData);
      const data = response.data;
      if (data?.data.length > 0) {
        const flattenedData = data?.data?.map((item) => {
          switch (type) {
            case "student-session-count":
            case "teacher-session-count":
            case "parent-session-count":
              return [item?.counsellor_name, item?.session_count];
              case "case":
              return [
                item?.case_id,
                item?.session_id,
                item?.student_name,
                item?.session_date,
                item?.session_time,
                item?.description,
                item?.status,
              ];
            default:
              return [
                item?.case_id,
                item?.session_id,
                item?.student_name,
                item?.counsellor_name,
                item?.counseling_type?.map((type) => type).join(", "),
                item?.session_date,
                item?.session_time,
                item?.description,
                item?.status,
              ];
          }
        });

        const csvHeaders = data.headers.join(",");
        const csvRows = [
          csvHeaders,
          ...flattenedData.map((row) => row.join(",")),
        ];
        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "report.csv");
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        reset();
      } else {
        toast.error("No data found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{ margin: 3, marginTop: 10 }}
      padding={3}
      boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
      bgcolor={"white"}
      width={"900px"}
      borderRadius={"15px"}
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
              Report Type
            </Typography>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <StyledSelectField
                  placeholder="Select Report Type"
                  options={Types}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleTypeChange(e);
                  }}
                />
              )}
            />
          </Grid>
          {type === "session" && (
            <>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  fontWeight={500}
                  color={"#333333"}
                >
                  Start Date
                </Typography>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      {" "}
                      <StyledDatePicker
                        label="Select Date from Calendar"
                        {...field}
                      />
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
                  End Date
                </Typography>
                <Controller
                  name="endDate"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: watchStartDate
                      ? "End Date is required when Start Date is selected."
                      : false,
                  }}
                  render={({ field }) => (
                    <>
                      <StyledDatePicker
                        label="Select Date from Calendar"
                        {...field}
                      />
                      {errors.endDate && (
                        <span style={{ color: "red" }}>
                          {errors.endDate.message}
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
                  Counselor Name
                </Typography>
                <Controller
                  name="counselor"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledSelectField
                      placeholder="Select Counselor"
                      options={counselorOptions}
                      {...field}
                    />
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
                  Student Name
                </Typography>
                <Controller
                  name="student"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledSelectField
                      placeholder="Select Student"
                      options={studentOptions}
                      {...field}
                    />
                  )}
                />
              </Grid>{" "}
            </>
          )}
          {type === "case" && (
            <Grid item xs={12}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#333333"}
              >
                Student Name
              </Typography>
              <Controller
                name="student"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledSelectField
                    placeholder="Select Student"
                    options={studentOptions}
                    {...field}
                  />
                )}
              />
            </Grid>
          )}
          <Grid item xs={12} alignItems={"flex-start"}>
            <Stack direction={"row"} spacing={2} justifyContent="flex-end">
              <StyledButton name="Cancel" variant="secondary" />
              <StyledButton name="Report" variant="primary" type="submit" />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AdminReport;
