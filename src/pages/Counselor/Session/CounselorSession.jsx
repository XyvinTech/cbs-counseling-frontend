import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import CounsellorCases from "./CounsellorCases";
import ActiveCases from "./ActiveCases";
import Remarks from "./Remarks";

const CounselorSession = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
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
      </Tabs>
      <Box padding="30px" marginBottom={4}>
        {" "}
        {selectedTab === 0 && <CounsellorCases />}
        {selectedTab === 1 && <ActiveCases />}{" "}
        {selectedTab === 2 && <Remarks />}{" "}
      </Box>
    </>
  );
};

export default CounselorSession;
