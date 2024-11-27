import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserCard from "../../../../ui/UserCard";
import StyledTable from "../../../../ui/StyledTable";
import CounsellingTypeCard from "../../../../ui/CouncellingCard";
import DescriptionCard from "../../../../ui/DescriptionCard";
import Review from "../../../../components/Review";
import { useCounselorStore } from "../../../../store/admin/CounselorStore";
import { useParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import CounsellingSessionTable from "../../../../components/CounsellingSessionTable";
import CounselorCaseTable from "../../../../components/CounselorCaseTable";
const CounselorSinglePage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const { counselor, fetchUser, loading } = useCounselorStore();

  const [lastSynced, setLastSynced] = useState("0 minutes ago");
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const Reports = [
    { title: "Certificate name", field: "Certificate name", padding: "none" },
    { title: "Recieved on ", field: "Recieved on " },
    { title: "By whom ", field: "By whom" },
  ];
  const handleRefresh = () => {
    if (id) {
      fetchUser(id);
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
  }, [id]);
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
            paddingBottom={0}
            borderBottom={"1px solid #E0E0E0"}
          >
            <Typography variant="h4" color={"#4A4647"}>
              Counselor / {counselor?.name}
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
          <Grid container spacing={4} padding={4}>
            <Grid item md={4} spacing={2} xs={12}>
              <UserCard user={counselor} />
            </Grid>
            {/* <Grid item md={4} spacing={2} xs={12}>
          <CounsellingTypeCard user={counselor} />
        </Grid> */}
            {/* <Grid item md={4} spacing={2} xs={12}>
          <DescriptionCard />
        </Grid> */}
          </Grid>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="tabs"
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
            <Tab label="Counseling Sessions" />
            <Tab label="Reports" />
            <Tab label="Cases" />
            <Tab label="Reviews" />
          </Tabs>
          <Box padding="30px" marginBottom={4}>
            {selectedTab === 0 && <CounsellingSessionTable id={id} />}
            {selectedTab === 1 && <Typography>Not Found</Typography>}
            {selectedTab === 2 && <CounselorCaseTable id={id} />}
            {selectedTab === 3 && (
              <Typography>
                <Review />
              </Typography>
            )}
          </Box>{" "}
        </>
      )}
    </>
  );
};

export default CounselorSinglePage;
