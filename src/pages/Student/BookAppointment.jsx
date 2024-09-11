import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import BookAppointmentForm from "../../components/BookAppointmentForm";

const BookAppointment = () => {
  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Book Appointment/ New Appointment
        </Typography>
      </Box>
      <Grid container padding={4}>
        <Grid item xs={12}>
          <BookAppointmentForm />
        </Grid>
      </Grid>
    </>
  );
};

export default BookAppointment;
