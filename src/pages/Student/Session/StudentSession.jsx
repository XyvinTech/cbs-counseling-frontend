import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SessionHistory from "./SessionHistory";
import StudentCaseTable from "../../../components/StudentCaseTable";
const StudentSession = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // console.log(lists);
  return (
    <>
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
        {" "}
        <Tab label="Sessions" />
        <Tab label="Cases" />
      </Tabs>{" "}
      <Box padding="30px" marginBottom={4}>
        {selectedTab === 0 && <SessionHistory />}
        {selectedTab === 1 && <StudentCaseTable />}{" "}
      </Box>
    </>
  );
};

export default StudentSession;
