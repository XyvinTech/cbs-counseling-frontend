import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "../../../ui/StudentCard";
import imag from "../../../assets/images/staff.png";
import CaseCard from "../../../ui/CaseCard";
import { useSessionStore } from "../../../store/counselor/SessionStore";
import CounselorCard from "../../../ui/CounselorCard";
const SessionSinglePage = () => {
  const { id } = useParams();
  const { sessions, adminSessionReport } = useSessionStore();

  useEffect(() => {
    if (id) {
      adminSessionReport(id);
    }
  }, [id, adminSessionReport]);
  return (
    <>
      <Box
        padding={"30px"}
        bgcolor={"#FFFFFF"}
        borderBottom={"1px solid #E0E0E0"}
      >
        <Typography variant="h4" color={"#4A4647"}>
          Cases / Case ID / Session No
        </Typography>
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
