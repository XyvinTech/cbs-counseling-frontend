import React from "react";
import { Typography, Stack, Box, Grid } from "@mui/material";

export default function CounsellingTypeCard({ user }) {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"15px"}
      padding={"16px"}
      minHeight={"180px"}
    >
      <Grid item md={6} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={2}>
          {" "}
          <Typography variant="h6" color={"#2C2829"}>
            Counseling Type
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            Experience level
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            No: of Sessions
          </Typography>{" "}
        </Stack>
      </Grid>
      <Grid item md={6} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={2}>
          {" "}
          <span
            style={{
              border: "2px solid #2196f3",
              borderRadius: "20px",
              padding: "2px ",
              fontSize: "13px",
              color: "#0288D1",
              display: "inline-block",
              textAlign: "center",
            }}
          >
            {user?.counsellortype} Counseling
          </span>
          <Typography variant="h5" fontWeight={400} color={"#004797"}>
            {user?.experience}
          </Typography>
          <Typography variant="h5" color={"#686465"}>
            5
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
