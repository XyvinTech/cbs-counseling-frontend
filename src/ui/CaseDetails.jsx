import React from "react";
import { Stack, Box, Typography, Grid } from "@mui/material";

export default function CaseDetails({ case_details }) {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"15px"}
      padding={"20px"}
      justifyContent={"flex-start"} 
      alignItems={" flex-start"}minHeight={'160px'}
    >
      <Typography variant="h7" color={"#2C2829"}>
        {case_details}
      </Typography>
    </Grid>
  );
}
