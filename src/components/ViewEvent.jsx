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
        </Grid>
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
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{ marginTop: 0 }}
            variant="h6"
            fontWeight={500}
            color="#333333"
            align="center"
          >
            {rowData?.date ? formatDate(rowData.date) : ""}
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
            Venue: {rowData?.venue}
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ViewEvent;

function formatDate(dateString) {
  // Parse the ISO date string
  const date = moment(dateString);

  // Format the date to "August 15, 2024"
  return date.format("MMMM D, YYYY");
}
