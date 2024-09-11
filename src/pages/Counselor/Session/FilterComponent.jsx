import React from "react";
import StyledSelectField from "../../../ui/StyledSelectField";
import { StyledButton } from "../../../ui/StyledButton";
import { Box, Grid } from "@mui/material";

const FilterComponent = () => {
  return (
    <Grid
      container
      bgcolor={"white"}
      spacing={2}
      borderRadius={"16px"}
      padding={3}
    >
      {" "}
      <Grid item md={6}>
        <StyledSelectField placeholder={"Student: All"} />{" "}
      </Grid>{" "}
      <Grid item md={6}>
        {/* <StyledSelectField />{" "} */}
      </Grid>
      <Grid item md={2}>
        <StyledButton variant="filter" name="Apply Filter" />
      </Grid>
      <Grid item md={8}></Grid>
      <Grid item md={2}>
        <StyledButton variant="reset" name="Reset" />
      </Grid>
    </Grid>
  );
};

export default FilterComponent;
