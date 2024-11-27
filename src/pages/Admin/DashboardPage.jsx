import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import StyledFilter from "../../components/StyledFilter";
import DashboardData from "../../components/DashboardData";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { useListStore } from "../../store/listStore";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
const DashboardPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const { dashboardLists } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [search, setSearch] = useState("");
  const [lastSynced, setLastSynced] = useState("0 minutes ago");
  const navigate = useNavigate();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const userColumns = [
    { title: "Session No", field: "session_id", padding: "none" },

    { title: "Student Name", field: "user_name" },
    { title: "Counselor Name", field: "counsellor_name" },
    { title: "Type", field: "type" },
    { title: "Date  ", field: "session_date" },
    { title: "Time ", field: "session_time" },
    { title: "Status", field: "status" },
  ];
  const handleView = (id) => {
    navigate(`/cases/session/${id}`);
  };

  const handleRefresh = () => {
    let filter = { status: "pending" };
    if (search) {
      filter.searchQuery = search;
      setPageNo(1);
    }
    filter.page = pageNo;
    filter.limit = row;
    dashboardLists(filter);

    const currentTime = new Date();
    setLastSynced(
      `${currentTime?.getHours()}:${String(currentTime?.getMinutes())?.padStart(
        2,
        "0"
      )} ${currentTime?.getHours() >= 12 ? "PM" : "AM"}`
    );
  };

  useEffect(() => {
    handleRefresh();
  }, [pageNo, search, row]);

  return (
    <>
      <Box
        padding={"30px"}
        bgcolor={"#FFFFFF"}
        paddingBottom={0}
        borderBottom={"1px solid #E0E0E0"}
      >
        <Typography variant="h4" color={"#4A4647"}>
          Dashboard
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography color="#828282" fontSize={"12px"}>
            Last synced: {lastSynced}
          </Typography>
          <IconButton size="12px" onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box padding="30px" marginBottom={4}>
        <Box marginBottom={4}>
          <DashboardData />
        </Box>{" "}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          paddingBottom={4}
          alignItems={"center"}
        >
          <Typography variant="h6" color={"#828282"} fontWeight={900}>
            Awaiting for approval session list
          </Typography>{" "}
          <Stack direction={"row"} spacing={2}>
            <StyledSearchbar
              placeholder={"Search Student Name"}
              onchange={(e) => setSearch(e.target.value)}
            />
          </Stack>
        </Stack>
        <Box
          padding="2px"
          marginBottom={4}
          bgcolor={"white"}
          borderRadius={"15px"}
          boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
        >
          <StyledTable
            columns={userColumns}
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            setRowPerSize={setRow}
            onView={handleView}
          />{" "}
        </Box>
      </Box>{" "}
      <StyledFilter open={filterOpen} onClose={handleCloseFilter} />
    </>
  );
};

export default DashboardPage;
