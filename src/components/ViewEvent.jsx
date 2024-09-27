import React from "react";
import { Dialog, Grid, Typography } from "@mui/material";
import moment from "moment";
const ViewEvent = ({ open, onClose, rowData }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "21px" },
      }}
    >
      <Grid container spacing={4} padding={5}>
        <Grid item xs={12}>
          {rowData?.requisition_image ? (
            <img
              src={`https://able.iswkoman.com/images/${rowData?.requisition_image}`}
              alt="Event"
              style={{
                maxWidth: "400px",
                height: "auto",
                display: "block",
                margin: "0 auto",
                borderRadius: "8px",
              }}
            />
          ) : (
            <Typography color="textSecondary" align="center">
              No image available
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ marginTop: 0 }}
            variant="h4"
            fontWeight={600}
            color="#333333"
            align="center"
          >
            {rowData?.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ marginTop: 2 }}
            variant="body1"
            color="black"
            align="center"
            paragraph
          >
            {rowData?.description}
          </Typography>
        </Grid>{" "}
        <Grid item xs={12}>
          <Typography
            sx={{ marginTop: 0 }}
            variant="h4"
            fontWeight={600}
            color="#333333"
            align="center"
          >
            {rowData?.details}
          </Typography>
        </Grid>{" "}
        <Grid item xs={6}>
          <Typography
            sx={{ marginTop: 0 }}
            variant="h6"
            fontWeight={500}
            color="#333333"
            align="center"
          >
            {rowData?.date && rowData?.time
              ? formatDateTime(rowData.date, rowData.time)
              : ""}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{ marginTop: 0 }}
            variant="h4"
            fontWeight={600}
            color="#333333"
            align="center"
          >
            Venu: {rowData?.venue}
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ViewEvent;

function formatDateTime(dateString, timeString) {
  // Parse the ISO date string
  const date = moment(dateString);

  // Format the date to "August 15, 2024"
  const formattedDate = date.format("MMMM D, YYYY");

  // Combine the date with the provided time
  const dateTime = moment(dateString).set({
    hour: timeString.split(":")[0],
    minute: timeString.split(":")[1],
  });

  // Format the time to "3:00 AM" or "3:00 PM"
  const formattedTime = dateTime.format("h:mm A");

  return `${formattedDate} at ${formattedTime}`;
}
