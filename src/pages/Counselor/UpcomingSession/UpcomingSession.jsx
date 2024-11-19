import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/CalendarIcon.svg";
import { ReactComponent as DashboardIcon } from "../../../assets/icons/DashboardIcon.svg";
import { useNavigate } from "react-router-dom";
import StyledTable from "../../../ui/StyledTable";
import BigCalendar from "../../../ui/BigCalendar";
import { useListStore } from "../../../store/listStore";
import { set } from "date-fns";
const UpcomingSession = () => {
  const navigate = useNavigate();
  const {  counselorSessions } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleOpenCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleView = (id) => {
    console.log("View item:", id);
    // navigate(`/counselor/upcomminSession/${id}`);
  };
  const userColumns = [
    { title: "Case ID", field: "case_id" },
    { title: "Session No", field: "id" },
    { title: "Student Name", field: "user_name" },
    { title: "Type of Counselling", field: "type" },
    { title: "Session Time", field: "session_time" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "sessions", status: "pending" };
    if (search) {
      filter.searchQuery = search;
      setPageNo(1);
      
    }
    filter.page = pageNo;
    filter.limit = row;
    counselorSessions(filter);
  }, [counselorSessions, search, pageNo,row]);
  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Upcoming Sessions
        </Typography>
      </Box>
      <Box padding="30px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            paddingBottom={3}
            alignItems={"center"}
          >
            {" "}
            <Typography variant="h4" color={"#4A4647"}>
              Session list
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <StyledSearchbar
                placeholder={"Search Student Name"}
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
              <Box
                bgcolor={"#FFFFFF"}
                borderRadius={"50%"}
                width={"48px"}
                height={"48px"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid rgba(0, 0, 0, 0.12)"
                onClick={handleOpenCalendar}
                style={{ cursor: "pointer" }}
              >
                {" "}
                {calendarOpen ? <DashboardIcon /> : <CalendarIcon />}
              </Box>
            </Stack>
          </Stack>
          {calendarOpen ? (
            <Box bgcolor={"white"} padding={4}>
              <BigCalendar />
            </Box>
          ) : (
            <StyledTable
              columns={userColumns}
              onSelectionChange={handleSelectionChange}
              onView={handleView}
              pageNo={pageNo}
              setPageNo={setPageNo}
              rowPerSize={row}
              setRowPerSize={setRow}
            />
          )}
        </>
      </Box>
    </>
  );
};

export default UpcomingSession;
