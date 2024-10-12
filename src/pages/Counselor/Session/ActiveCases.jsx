import { Box, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledButton } from "../../../ui/StyledButton";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";
import { useNavigate } from "react-router-dom";

const ActiveCases = () => {
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
    }
    if (status) {
      filter.status = status;
    }
    filter.page = pageNo;
    filter.limit = row;
    counselorSessions(filter);
  }, [counselorSessions, search, pageNo, status, row]);
  return (
    <>
      <Box
        padding="2px"
        marginBottom={4}
        bgcolor={"white"}
        borderRadius={"15px"}
      >
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
