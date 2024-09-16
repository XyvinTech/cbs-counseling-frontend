import { Box, Grid, LinearProgress, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserCard from "../../../../ui/UserCard";
import StyledTable from "../../../../ui/StyledTable";
import CounsellingTypeCard from "../../../../ui/CouncellingCard";
import DescriptionCard from "../../../../ui/DescriptionCard";
import Review from "../../../../components/Review";
import { useCounselorStore } from "../../../../store/admin/CounselorStore";
import { useParams } from "react-router-dom";
import { useListStore } from "../../../../store/listStore";
import CounsellingSessionTable from "../../../../components/CounsellingSessionTable";
import CounselorCaseTable from "../../../../components/CounselorCaseTable";
const CounselorSinglePage = () => {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const { counselor, fetchUser,loading } = useCounselorStore();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const Reports = [
    { title: "Certificate name", field: "Certificate name", padding: "none" },
    { title: "Recieved on ", field: "Recieved on " },
    { title: "By whom ", field: "By whom" },
  ];
  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id, fetchUser]);

  return (
    <>
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Counselor / {counselor?.name}
        </Typography>
      </Box>{" "}
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container spacing={4} padding={4}>
            <Grid item md={4} spacing={2} xs={12}>
              <UserCard user={counselor} />
            </Grid>
            {/* <Grid item md={4} spacing={2} xs={12}>
          <CounsellingTypeCard user={counselor} />
        </Grid> */}
            {/* <Grid item md={4} spacing={2} xs={12}>
          <DescriptionCard />
        </Grid> */}
          </Grid>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            aria-label="tabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#0072BC",
                height: 4,
                borderRadius: "4px",
              },
            }}
            sx={{
              bgcolor: "white",
              paddingTop: "34px",
              "& .MuiTabs-indicator": {
                backgroundColor: "#0072BC",
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "16px",
                fontWeight: 600,
              },
              "& .Mui-selected": {
                color: "#0072BC",
              },
            }}
          >
            <Tab label="Counseling Sessions" />
            <Tab label="Reports" />
            <Tab label="Cases" />
            <Tab label="Reviews" />
          </Tabs>
          <Box padding="30px" marginBottom={4}>
            {selectedTab === 0 && <CounsellingSessionTable id={id} />}
            {selectedTab === 1 && (
              <Typography>
                {" "}
                <StyledTable columns={Reports} />
              </Typography>
            )}
            {selectedTab === 2 && <CounselorCaseTable id={id} />}
            {selectedTab === 3 && (
              <Typography>
                <Review />
              </Typography>
            )}
          </Box>{" "}
        </>
      )}
    </>
  );
};

export default CounselorSinglePage;
