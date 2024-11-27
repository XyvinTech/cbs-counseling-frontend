import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import CounsellorCases from "./CounsellorCases";
import ActiveCases from "./ActiveCases";
import Remarks from "./Remarks";
import RefreshIcon from "@mui/icons-material/Refresh";

const CounselorSession = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [lastSynced, setLastSynced] = useState("Never");
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleRefresh = () => {
    const currentDate = new Date();
    const formattedDate = currentDate?.toLocaleString();
    setLastSynced(formattedDate);
    setRefreshTrigger((prev) => !prev);
  };
  return (
    <>
      {" "}
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
        <Tab label="Sessions" />
        <Tab label="Active Cases" />
        <Tab label="Add Remarks" />
        <Stack direction="row" alignItems="center">
          <Typography color="#828282" fontSize={"12px"}>
            Last synced: {lastSynced}
          </Typography>
          <IconButton size="12px" onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        {" "}
        {selectedTab === 0 && (
          <CounsellorCases
            refreshTrigger={refreshTrigger}
            setLastSynced={setLastSynced}
          />
        )}
        {selectedTab === 1 && (
          <ActiveCases
            refreshTrigger={refreshTrigger}
            setLastSynced={setLastSynced}
          />
        )}{" "}
        {selectedTab === 2 && (
          <Remarks
            refreshTrigger={refreshTrigger}
            setLastSynced={setLastSynced}
          />
        )}{" "}
      </Box>
    </>
  );
};

export default CounselorSession;
