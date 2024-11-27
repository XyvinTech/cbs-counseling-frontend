import React, { useState } from "react";
import { Box, Typography, Grid, Stack, IconButton } from "@mui/material";
import AddTime from "../../../components/AddTime";
import RefreshIcon from "@mui/icons-material/Refresh";

const AddAvailability = () => {
  const [lastSynced, setLastSynced] = useState("Never");
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const handleRefresh = () => {
    const currentDate = new Date();
    const formattedDate = currentDate?.toLocaleString();
    setLastSynced(formattedDate);
    setRefreshTrigger((prev) => !prev);
  };
  return (
    <>
      <Box
        padding={"30px"}
        bgcolor={"#FFFFFF"}
        paddingBottom={0}
        borderBottom={"1px solid #E0E0E0"}
      >
        <Typography variant="h4" color={"#4A4647"}>
          Availability
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography color="#828282" fontSize={"12px"}>
            Last synced: {lastSynced}
          </Typography>
          <IconButton size="12px" onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box padding="30px" marginBottom={4}>
        <Grid container>
          <Grid item md={12}>
            <AddTime
              refreshTrigger={refreshTrigger}
              setLastSynced={setLastSynced}
            />
          </Grid>
        </Grid>{" "}
      </Box>
    </>
  );
};

export default AddAvailability;
