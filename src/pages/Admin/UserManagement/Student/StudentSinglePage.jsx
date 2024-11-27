import {
  Box,
  Grid,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserCard from "../../../../ui/UserCard";
import StyledTable from "../../../../ui/StyledTable";
import imag from "../../../../assets/images/staff.png";
import { useParams } from "react-router-dom";
import { useListStore } from "../../../../store/listStore";
import { useCounselorStore } from "../../../../store/admin/CounselorStore";

const StudentSinglePage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const { fetchSession } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const { counselor, fetchUser, loading } = useCounselorStore();

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleView = (id) => {
    console.log("View item:", id);
  };
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);
  useEffect(() => {
    let filter = {};
    filter.page = pageNo;
    filter.limit = row;
    if (counselor?.StudentReferencesCode) {
      fetchSession(counselor?.StudentReferencesCode, filter);
    }
  }, [counselor?.StudentReferencesCode, pageNo, row]);
  console.log("StudentReferencesCode", counselor?.StudentReferencesCode);

  const sessions = [
    { title: "Session Date", field: "session_date" },
    { title: "Session Time", field: "session_time" },
    { title: "Session Name", field: "name" },
    { title: "Counselor Name", field: "counsellor_name" },
    { title: "Counseling Type", field: "counsellor_type" },
  ];
  return (
    <>
      {" "}
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Box
            padding={"30px"}
            bgcolor={"#FFFFFF"}
            borderBottom={"1px solid #E0E0E0"}
          >
            <Typography variant="h4" color={"#4A4647"}>
              Student List / {counselor.name}
            </Typography>
          </Box>

          <Grid container spacing={4} padding={4}>
            <Grid item md={5} spacing={2} xs={12}>
              <UserCard user={counselor} />
            </Grid>
            {/* <Grid item md={4} spacing={2} xs={12}>
          <ParentCard user={counselor} />
        </Grid> */}
          </Grid>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="tabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#0072BC",
                height: 4,
                borderRadius: "4px",
              },
            }}
            sx={{
              bgcolor: "white",
              paddingTop: "34px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
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
            }}
          >
            <Tab label="Counseling Sessions" />
            <Tab label="Reports" />
          </Tabs>
          <Box padding="30px" marginBottom={4}>
            <>
              <Stack
                direction={"row"}
                justifyContent={"end"}
                paddingBottom={3}
                alignItems={"center"}
              ></Stack>

              {selectedTab === 0 && (
                <Box
                  padding="2px"
                  marginBottom={4}
                  bgcolor={"white"}
                  borderRadius={"15px"}
                  boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
                >
                  {" "}
                  <StyledTable
                    columns={sessions}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                    rowPerSize={row}
                    setRowPerSize={setRow}
                    dashboard
                  />
                </Box>
              )}
              {selectedTab === 1 && <Typography>Not Found</Typography>}
            </>{" "}
          </Box>
        </>
      )}
    </>
  );
};

export default StudentSinglePage;
