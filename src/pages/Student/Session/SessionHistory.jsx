import { Box, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";
import { useNavigate } from "react-router-dom";
import CancelUserSession from "../../../components/CancelUserSession";
const SessionHistory = () => {
  const navigate = useNavigate();
  const {  userSession } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("progress");
  const [isChange, setIsChange] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleCancel = (rowData) => {
    setSelectedRowId(rowData._id);
    setCancelOpen(true);
  };
  const handleCloseCancel = () => {
    setCancelOpen(false);
    setSelectedRowId(null);
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleReschedule = (rowData) => {
    // console.log("View item:", id);
    navigate(`/student/session/reschedule/${rowData._id}`, {
      state: { rowData },
    });
  };
  const handleView = (id) => {
    // console.log("View item:", id);
    navigate(`/student/session/report/${id}`);
  };
  const userColumns = [
    { title: "Session No", field: "session_id" },
    { title: "Counselor Name", field: "counsellor_name" },
    { title: "Type of Counseling", field: "type" },
    { title: "Session Date", field: "session_date" },
    { title: "Session Time", field: "session_time" },
    { title: "Status", field: "status" },
  ];
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    switch (newValue) {
      case 0:
        setStatus("progress");
        break;
      case 1:
        setStatus("completed");
        break;
      case 2:
        setStatus("cancelled");
        break;
      case 3:
        setStatus(null);
        break;
      default:
        setStatus(null);
        break;
    }
  };
  useEffect(() => {
    let filter = { type: "sessions" };
    if (search) {
      filter.searchQuery = search;
    }
    if (status) {
      filter.status = status;
    }
    filter.page = pageNo;
    filter.limit = row;
    userSession(filter);
  }, [isChange, userSession, search, status, pageNo, row]);
  // console.log(lists);
  return (
    <>
      <Stack direction={"row"} justifyContent={"end"} paddingBottom={2}>
        <Stack direction={"row"} spacing={2}>
          <StyledSearchbar
            placeholder={"Search Counselor Name"}
            onchange={(e) => setSearch(e.target.value)}
          />
          {/* <Box
            bgcolor={"#FFFFFF"}
            borderRadius={"50%"}
            width={"48px"}
            height={"48px"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="1px solid rgba(0, 0, 0, 0.12)"
            onClick={handleOpenFilter}
            style={{ cursor: "pointer" }}
          >
            <FilterIcon />
          </Box> */}
        </Stack>
      </Stack>
      <Box
        padding="2px"
        marginBottom={4}
        bgcolor={"white"}
        borderRadius={"15px"}
      >
        {" "}
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="session-tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#0072BC",
              height: 4,
              borderRadius: "4px",
            },
          }}
          sx={{
            bgcolor: "white",
            "& .MuiTabs-indicator": {
              backgroundColor: "#0072BC",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
            },
            "& .Mui-selected": {
              color: "#0072BC",
            },
            paddingBottom: "20px",
          }}
        >
          <Tab label="Upcoming" />
          <Tab label="Closed" />
          <Tab label="Cancelled" />
          <Tab label="All Sessions" />
        </Tabs>
        <StyledTable
          columns={userColumns}
          onSelectionChange={handleSelectionChange}
          onCancel={handleCancel}
          menu
          onView={handleView}
          pageNo={pageNo}
          setPageNo={setPageNo}
          rowPerSize={row}
          setRowPerSize={setRow}
          reschedule
          onReschedule={handleReschedule}
        />{" "}
        <CancelUserSession
          open={cancelOpen}
          onClose={handleCloseCancel}
          rowId={selectedRowId}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

export default SessionHistory;
