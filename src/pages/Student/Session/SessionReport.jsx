import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserCard from "../../../ui/UserCard";
import imag from "../../../assets/images/staff.png";
import CaseCard from "../../../ui/CaseCard";
import { useParams } from "react-router-dom";
import { useSessionStore } from "../../../store/counselor/SessionStore";
import CounselorCard from "../../../ui/CounselorCard";
import CaseDetails from "../../../ui/CaseDetails";
const SessionReport = () => {
  const { id } = useParams();
  const { sessions, fetchReport } = useSessionStore();

  useEffect(() => {
    if (id) {
      fetchReport(id);
    }
  }, [id, fetchReport]);

  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Cases / Case ID / Session No
        </Typography>
      </Box>
      <Grid container spacing={6} padding={4}>
        <Grid item md={5}>
          <Stack marginBottom={4}>
            {" "}
            <Box marginBottom={4}>
              <Typography variant="h6" fontWeight="900" color={"#828282"}>
                Counselor
              </Typography>
            </Box>
            <CounselorCard user={sessions} />
            {sessions.case_details && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Case Details
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.case_details} />
              </>
            )}{" "}
            {sessions.cancel_remark && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Cancel remark 
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.cancel_remark} />
              </>
            )}{" "}
            {sessions.c_cancel_remark && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Cancel remark  by Counselor
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.c_cancel_remark} />
              </>
            )}{" "}
            {sessions.c_reschedule_remark && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Reschedule remark by Counselor
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.c_reschedule_remark} />
              </>
            )}
            {sessions.reschedule_remark && (
              <>
                <Box marginBottom={4} marginTop={4}>
                  <Typography variant="h6" fontWeight="900" color={"#828282"}>
                    Reschedule remark
                  </Typography>
                </Box>
                <CaseDetails case_details={sessions.reschedule_remark} />
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

export default SessionReport;
