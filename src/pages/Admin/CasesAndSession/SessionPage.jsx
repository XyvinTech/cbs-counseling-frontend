import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate, useParams } from "react-router-dom";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import { useListStore } from "../../../store/listStore";
const SessionPage = () => {
  const navigate = useNavigate();
  const { pageNo, adminSesssionsByCaseId } = useListStore();
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
  useEffect(() => {
    let filter = {};
    filter.page = pageNo;
    if (id) {
      adminSesssionsByCaseId(id, filter);
    }
  }, [id, adminSesssionsByCaseId, pageNo]);
  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Cases / Session
        </Typography>
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
          </Stack>{" "}
          <Box
            padding="2px"
            paddingBottom={0}
            marginBottom={4}
            bgcolor={"white"}
            borderRadius={"15px"}
          >
            <StyledTable columns={userColumns} onView={handleView} dashboard />{" "}
          </Box>
        </>
      </Box>
    </>
  );
};

export default SessionPage;
