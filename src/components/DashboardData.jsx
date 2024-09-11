import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import DashboardCard from "../ui/DashboardCard";
import { useAdminStore } from "../store/admin/AdminStore";

const DashboardData = () => {
  const { dashboard, getData } = useAdminStore();

  useEffect(() => {
    getData();
  }, []);

  const dashboardMetrics = [
    { title: "Students", value: dashboard?.student_count },
    { title: "Counselors", value: dashboard?.counsellor_count },
    { title: "Cases", value: dashboard?.case_count },
    { title: "Sessions", value: dashboard?.session_count },
    { title: "Events", value: dashboard?.event_count },
  ];

  return (
    <>
      <Grid container spacing={2} marginBottom={2}>
        {dashboardMetrics.map((data, index) => (
          <Grid item md={2} key={index}>
            <DashboardCard data={data} />
          </Grid>
        ))}
      </Grid>

      {/* <Typography variant="h6" color={"#828282"} fontWeight={900} padding={2}>
        Events
      </Typography> */}

      {/* <Grid container spacing={2}>
        {eventData?.map((event) => (
          <Grid item md={2} key={event.id}>
            <DashboardCard data={event} />
          </Grid>
        ))}
      </Grid> */}
    </>
  );
};

export default DashboardData;
