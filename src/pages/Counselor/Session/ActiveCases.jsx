import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";
import { useNavigate } from "react-router-dom";

const ActiveCases = ({refreshTrigger, setLastSynced}) => {
  const navigate = useNavigate();
  const { counselorSessions } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [status, setStatus] = useState("pending");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState("");

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleView = (id) => {
    navigate(`/counselor/session/case/${id}`);
  };
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    switch (newValue) {
      case 0:
        setStatus("pending");
        break;
      case 1:
        setStatus("completed");
        break;
      case 2:
        setStatus("cancelled");
        break;
      case 3:
        setStatus("referred");
        break;
      case 4:
        setStatus(null);
        break;
      default:
        setStatus(null);
        break;
    }
  };
  const userColumns = [
    { title: "Case ID", field: "case_id" },
    { title: "Session Count", field: "session_count" },
    { title: "Student Name", field: "user_name" },

    { title: "Type of Counseling", field: "type" },
    // { title: "Session Time", field: "session_time" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "cases" };
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
  }, [refreshTrigger, setLastSynced, search, pageNo, status, row]);
  return (
    <>
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
          <Tab label="Upcoming Cases" />
          <Tab label="Closed" />
          <Tab label="Cancelled" />
          <Tab label="Referred" /> <Tab label="All Cases" />
        </Tabs>{" "}
        <StyledTable
          columns={userColumns}
          // data={activeSessionData}
          onSelectionChange={handleSelectionChange}
          onView={handleView}
          pageNo={pageNo}
          setPageNo={setPageNo}
          rowPerSize={row}
          setRowPerSize={setRow}
        />
      </Box>
    </>
  );
};

export default ActiveCases;
