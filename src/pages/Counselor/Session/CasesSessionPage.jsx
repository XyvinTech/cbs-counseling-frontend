import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate, useParams } from "react-router-dom";
import { useListStore } from "../../../store/listStore";
import { StyledButton } from "../../../ui/StyledButton";
import { useCounselorStore } from "../../../store/admin/CounselorStore";
const CasesSessionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { counselorSesssionsByCaseId } = useListStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const { showBackButton, setShowBackButton } = useCounselorStore();
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleView = (sid) => {
    // console.log("View item:", id);
    navigate(`/counselor/session/report/${sid}`);
  };
  const userColumns = [
    { title: "Session No", field: "session_id", padding: "none" },
    { title: "Student Name", field: "user_name" },
    { title: "Counselor Name", field: "counsellor_name" },
    { title: "Type of Counseling", field: "type" },
    { title: "Created on", field: "createdAt" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    if (id) {
      counselorSesssionsByCaseId(id);
    }
  }, [id, counselorSesssionsByCaseId]);
  const handleBack = () => {
    setShowBackButton(false);
    navigate(-1);
  };
  return (
    <>
      <Box
        padding={"30px"}
        bgcolor={"#FFFFFF"}
        borderBottom={"1px solid #E0E0E0"}
      >
        <Typography variant="h4" color={"#4A4647"}>
          Cases / session
        </Typography>
      </Box>{" "}
      <Box padding="30px" marginBottom={4} bgcolor={"#FFFFFF"}>
        <>
          <Stack
            direction={"row"}
            // justifyContent={"space-between"}
            spacing={4}
            paddingBottom={3}
            alignItems={"center"}
          >
            {" "}
            {showBackButton && (
              <StyledButton
                name="Back"
                variant="primary"
                onClick={handleBack}
              />
            )}
            <Typography variant="h4" color={"#4A4647"}>
              Session List
            </Typography>
          </Stack>{" "}
          <Box
            padding="2px"
            paddingBottom={0}
            marginBottom={4}
            bgcolor={"white"}
            borderRadius={"15px"}
            boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
          >
            <StyledTable
              columns={userColumns}
              // data={userData}
              onSelectionChange={handleSelectionChange}
              onView={handleView}
              dashboard
            />{" "}
          </Box>
        </>
      </Box>
    </>
  );
};

export default CasesSessionPage;
