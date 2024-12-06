import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";
import { useNavigate } from "react-router-dom";
import AddLink from "../../../components/AddLink";
import Reschedule from "../../../components/Reschedule";
import CancelSession from "../../../components/CancelSession";
import FilterComponent from "./FilterComponent";
import StyledSelectField from "../../../ui/StyledSelectField";
import { CSVLink } from "react-csv";
import { getExcelData } from "../../../api/admin/counselorapi";
import { Controller, useForm } from "react-hook-form";
const CounsellorCases = ({ refreshTrigger, setLastSynced }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { counselorSessions, lists } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("pending");
  const [addLinkOpen, setAddLinkOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [counselor, setCounselor] = useState(null);
  const [selectFieldValue, setSelectFieldValue] = useState("");
  const [csvData, setCsvData] = useState([]);
  const csvLinkRef = useRef(null);
  const handleView = (id) => {
    navigate(`/counselor/session/report/${id}`);
  };

  const handleAddLink = (rowData) => {
    setSelectedRowId(rowData._id);
    setAddLinkOpen(true);
  };
  const handleAddEntry = (rowData) => {
    navigate(`/counselor/session/addentry/${rowData._id}`, {
      state: { rowData },
    });
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    switch (newValue) {
      case 0:
        setStatus("pending");
        break;
      case 1:
        setStatus("progress");
        break;
      case 2:
        setStatus("completed");
        break;
      case 3:
        setStatus("cancelled");
        break;
      case 4:
        setStatus(null);
        break;
      default:
        setStatus(null);
        break;
    }
  };
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const handleReschedule = (rowData) => {
    setSelectedRowId(rowData._id);
    console.log("View item:", rowData);

    setCounselor(rowData.counsellor._id);
    setRescheduleOpen(true);
  };
  const handleCancel = (rowData) => {
    setSelectedRowId(rowData._id);

    setCancelOpen(true);
    // setIsChange(!isChange);
  };
  const handleCloseReschedule = () => {
    setRescheduleOpen(false);
    setSelectedRowId(null);
    setCounselor(null);
  };
  const handleCloseLink = () => {
    setAddLinkOpen(false);
    setSelectedRowId(null);
  };
  const handleCloseCancel = () => {
    setCancelOpen(false);
    setSelectedRowId(null);
  };

  const userColumns = [
    { title: "Case ID", field: "caseid" },
    { title: "Session ID", field: "session_id" },
    { title: "Student Name", field: "user_name" },
    { title: "Type of Counseling", field: "type" },
    { title: "Session Date", field: "session_date" },
    { title: "Session Time", field: "session_time" },
    { title: "Booked By", field: "referee" },
    { title: "Cancel Reason", field: "c_cancel_remark" },
    { title: "Status", field: "status" },
  ];

  useEffect(() => {
    let filter = { type: "sessions" };
    if (search) {
      filter.searchQuery = search;
      setPageNo(1);
    }
    if (status) {
      filter.status = status;
    }
    filter.page = pageNo;
    filter.limit = row;
    counselorSessions(filter);
    const currentTime = new Date();
    setLastSynced(
      `${currentTime?.getHours()}:${String(currentTime?.getMinutes())?.padStart(
        2,
        "0"
      )} ${currentTime?.getHours() >= 12 ? "PM" : "AM"}`
    );
  }, [isChange, refreshTrigger, setLastSynced, search, status, pageNo, row]);
  const handleApplyFilter = () => {
    setSearch(selectFieldValue);
  };
  const handleReset = () => {
    setSearch("");
    setSelectFieldValue(null);
  };
  const fetchAndSetCsvData = async () => {
    try {
      const response = await getExcelData();
      const data = response.data;

      const flattenedData = data.data.map((item) => [
        item.case_id,
        item.session_id,
        item.student_name,
        item.session_date,
        `${item.session_time.start} - ${item.session_time.end}`,
        item.status,
      ]);

      const csvHeaders = data.headers.join(",");
      const csvRows = [
        csvHeaders,
        ...flattenedData.map((row) => row.join(",")),
      ];
      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "counselor_sessions.csv");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to fetch CSV data:", error);
    }
  };

  return (
    <>
      {/* <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"end"}
        paddingBottom={2}
      >
        <StyledSearchbar
          placeholder={"Search Student Name"}
          onchange={(e) => setSearch(e.target.value)}
        />
        <Grid
          container
          bgcolor={"white"}
          spacing={2}
          borderRadius={"16px"}
          padding={3}
        >
          {" "}
          <Grid item md={6}>
            <Controller
              name="dateRange"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="today"
                    control={<Radio />}
                    label="Today"
                  />
                  <FormControlLabel
                    value="this_week"
                    control={<Radio />}
                    label="This Week"
                  />
                  <FormControlLabel
                    value="this_month"
                    control={<Radio />}
                    label="This Month"
                  />
                </RadioGroup>
              )}
            />
          </Grid>
          <Grid container item md={6} justifyContent="flex-end">
            <StyledButton
              variant="filter"
              name="Download CSV"
              onClick={fetchAndSetCsvData}
            />
          </Grid>
        </Grid>
     
      </Stack> */}

      <Box
        padding="2px"
        marginBottom={4}
        bgcolor={"white"}
        borderRadius={"15px"}
        boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="session-tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#864DF4",
              height: 4,
              borderRadius: "4px",
            },
          }}
          sx={{
            bgcolor: "white",
            paddingTop: "34px",
            borderBottom: "1px solid #E0E0E0",
            "& .MuiTabs-indicator": {
              backgroundColor: "#864DF4",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
              color: "#828282",
            },
            "& .Mui-selected": {
              color: "#864DF4",
            },
          }}
        >
          <Tab label="Pending For Approval" />
          <Tab label="Upcoming Sessions" />
          <Tab label="Closed" />
          <Tab label="Cancelled" />
          <Tab label="All Sessions" />
        </Tabs>{" "}
        <StyledTable
          columns={userColumns}
          onView={handleView}
          menu
          counselor
          onEntry={handleAddEntry}
          onReschedule={handleReschedule}
          onAdd={handleAddLink}
          onCancel={handleCancel}
          pageNo={pageNo}
          setPageNo={setPageNo}
          rowPerSize={row}
          setRowPerSize={setRow}
        />
      </Box>
      <Reschedule
        open={rescheduleOpen}
        onClose={handleCloseReschedule}
        rowId={selectedRowId}
        counselor={counselor}
        onChange={handleChange}
      />
      <AddLink
        open={addLinkOpen}
        onClose={handleCloseLink}
        rowId={selectedRowId}
        onChange={handleChange}
      />
      <CancelSession
        open={cancelOpen}
        onClose={handleCloseCancel}
        rowId={selectedRowId}
        onChange={handleChange}
      />
    </>
  );
};

export default CounsellorCases;
