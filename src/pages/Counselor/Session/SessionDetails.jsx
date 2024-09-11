import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserCard from "../../../ui/UserCard";
import imag from "../../../assets/images/staff.png";
import CaseCard from "../../../ui/CaseCard";
import { useParams } from "react-router-dom";
import { useSessionStore } from "../../../store/counselor/SessionStore";
import CounselorCard from "../../../ui/CounselorCard";
import CaseDetails from "../../../ui/CaseDetails";
import StudentCard from "../../../ui/StudentCard";
import { StyledButton } from "../../../ui/StyledButton";
import { getPdfReport } from "../../../api/admin/counselorapi";
import { saveAs } from "file-saver";
import * as base64js from "base64-js";
const SessionDetails = () => {
  const { id } = useParams();
  const { sessions, counsellorReport } = useSessionStore();

  useEffect(() => {
    if (id) {
      counsellorReport(id);
    }
  }, [id, counsellorReport]);
  const handleDownloadReport = async () => {
    try {
      const response = await getPdfReport();
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
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Grid container>
          {" "}
          <Grid item md={10}>
            <Typography variant="h4" color={"#4A4647"}>
              Cases / Case ID / Session No
            </Typography>{" "}
          </Grid>{" "}
          <Grid item md={2}>
            <StyledButton
              variant={"filter"}
              name={"Download report"}
              onClick={handleDownloadReport}
            />
          </Grid>{" "}
        </Grid>
      </Box>
      <Grid container spacing={6} padding={4}>
        <Grid item md={5}>
          <Stack marginBottom={4}>
            {" "}
            <Box marginBottom={4}>
              <Typography variant="h6" fontWeight="900" color={"#828282"}>
                Student
              </Typography>
            </Box>
            <StudentCard user={sessions} />
            {sessions.case_details && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Case Details
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.case_details} />
              </>
            )}
            {sessions.reschedule_remark && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Reschedule remark by Student
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.reschedule_remark} />
              </>
            )}
            {sessions.c_reschedule_remark && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Reschedule remark
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.c_reschedule_remark} />
              </>
            )}
            {sessions.cancel_remark && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Cancel remark by Student
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.cancel_remark} />
              </>
            )}
            {sessions.c_cancel_remark && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Cancel remark
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.c_cancel_remark} />
              </>
            )}
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

export default SessionDetails;
