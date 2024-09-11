import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { ReactComponent as FilterIcon } from "../../assets/icons/FilterIcon.svg";
import StyledFilter from "../../components/StyledFilter";
import DashboardData from "../../components/DashboardData";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { useAdminStore } from "../../store/admin/AdminStore";
import { useListStore } from "../../store/listStore";
import { useNavigate } from "react-router-dom";
const DashboardPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
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
  const { dashboardLists, pageNo } = useListStore();

  useEffect(() => {
    let filter = { status: "pending" };
    if (search) {
      filter.searchQuery = search;
    }
    filter.page = pageNo;
    dashboardLists(filter);
  }, [dashboardLists, pageNo, search]);

  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Dashboard
        </Typography>
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
            Session List
          </Typography>{" "}
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
              onClick={handleOpenFilter}style={{ cursor: "pointer" }}
            >
              <FilterIcon />
            </Box> */}
          </Stack>
        </Stack><Box padding="2px" marginBottom={4} bgcolor={'white'}borderRadius={'15px'}>
        <StyledTable
          columns={userColumns}
          // data={dashboard}
          onView={handleView}
        />  </Box>
      </Box>{" "}
      <StyledFilter open={filterOpen} onClose={handleCloseFilter} />
    </>
  );
};

export default DashboardPage;
