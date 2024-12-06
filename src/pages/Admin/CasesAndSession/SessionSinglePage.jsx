import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../../../ui/StudentCard";
import imag from "../../../assets/images/staff.png";
import CaseCard from "../../../ui/CaseCard";
import { useSessionStore } from "../../../store/counselor/SessionStore";
import CounselorCard from "../../../ui/CounselorCard";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getReport } from "../../../api/admin/adminapi";
import { StyledButton } from "../../../ui/StyledButton";
import { saveAs } from "file-saver";
import * as base64js from "base64-js";
const SessionSinglePage = () => {
  const { id } = useParams();
  const { sessions, adminSessionReport } = useSessionStore();

  const [lastSynced, setLastSynced] = useState("0 minutes ago");

  const handleRefresh = () => {
    if (id) {
      adminSessionReport(id);
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
  const handleDownloadReport = async () => {
    try {
      const response = await getReport({session: id});
      const base64Data = response.data;
      const byteArray = base64js.toByteArray(base64Data);
      const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
      saveAs(pdfBlob, "report.pdf");
    } catch (error) {
      console.error("Failed to download report:", error);
    }
  };
  return (
    <>
      <Box
        padding={"30px"}
        bgcolor={"#FFFFFF"}
        paddingBottom={0}
        borderBottom={"1px solid #E0E0E0"}display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
       <Typography variant="h4" color={"#4A4647"}>
          Cases / Case ID / Session No
          <Stack direction="row" alignItems="center">
          <Typography color="#828282" fontSize={"12px"}>
            Last synced: {lastSynced}
          </Typography>
          <IconButton size="12px" onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Stack>
        </Typography>
      
        <StyledButton
          variant={"filter"}
          name={"Download report"}
          onClick={handleDownloadReport}
        />
      </Box>
      <Grid container spacing={6} padding={4}>
        <Grid item md={5}>
          <Stack
            marginBottom={4}
            bgcolor={"#FFE5F2"}
            padding={4}
            borderRadius={"15px"}
            boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
          >
            {" "}
            <Box marginBottom={4}>
              <Typography variant="h6" fontWeight="900" color={"#828282"}>
                Student
              </Typography>
            </Box>
            <StudentCard user={sessions} />{" "}
            <Box marginBottom={4} marginTop={4}>
              <Typography variant="h6" fontWeight="900" color={"#828282"}>
                Counselor
              </Typography>
            </Box>
            <CounselorCard user={sessions} />
          </Stack>
        </Grid>
        <Grid item md={6}>
          <CaseCard data={sessions} />
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </>
  );
};

export default SessionSinglePage;
