import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate, useParams } from "react-router-dom";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import { useListStore } from "../../../store/listStore";
const SessionPage = () => {
  const navigate = useNavigate();
  const { adminSesssionsByCaseId } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);

  const [lastSynced, setLastSynced] = useState("0 minutes ago");
  const { id } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleView = (id) => {
    navigate(`/cases/session/${id}`);
  };
  const userColumns = [
    { title: "Session No", field: "session_id", padding: "none" },

    { title: "Student Name", field: "user" },
    { title: "Counselor Name", field: "counsellor" },
    { title: "Type", field: "type" },
    { title: "Date", field: "session_date" },
    { title: "Time", field: "session_time" },
    { title: "Status", field: "status" },
  ];
  const handleRefresh = () => {
    let filter = {};
    filter.page = pageNo;
    filter.limit = row;
    if (id) {
      adminSesssionsByCaseId(id, filter);
    }
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
  }, [id, pageNo, row]);
  return (
    <>
      <Box
        padding={"30px"}
        bgcolor={"#FFFFFF"}
        borderBottom={"1px solid #E0E0E0"}
        paddingBottom={0}
      >
        <Typography variant="h4" color={"#4A4647"}>
          Cases / Session
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography color="#828282" fontSize={"12px"}>
            Last synced: {lastSynced}
          </Typography>
          <IconButton size="12px" onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Box>{" "}
      <Box padding="30px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            paddingBottom={3}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={2}>
              <StyledSearchbar />
            </Stack>
          </Stack>{" "}
          <Box
            padding="2px"
            paddingBottom={0}
            marginBottom={4}
            bgcolor={"white"}
            borderRadius={"15px"}
            boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
          >
            <StyledTable
              columns={userColumns}
              onView={handleView}
              pageNo={pageNo}
              setPageNo={setPageNo}
              rowPerSize={row}
              setRowPerSize={setRow}
              dashboard
            />{" "}
          </Box>
        </>
      </Box>
    </>
  );
};

export default SessionPage;
