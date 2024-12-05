import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate, useParams } from "react-router-dom";
import { useListStore } from "../../../store/listStore";
import { StyledButton } from "../../../ui/StyledButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useCounselorStore } from "../../../store/admin/CounselorStore";
import { getExcelData } from "../../../api/admin/counselorapi";
const CasesSessionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { counselorSesssionsByCaseId } = useListStore();
  const [selectedRows, setSelectedRows] = useState([]);

  const [lastSynced, setLastSynced] = useState("0 minutes ago");
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
  const handleRefresh = () => {
    if (id) {
      counselorSesssionsByCaseId(id);
    }
    const currentTime = new Date();
    setLastSynced(
      `${currentTime?.getHours()}:${String(currentTime?.getMinutes())?.padStart(
        2,
        "0"
      )} ${currentTime?.getHours() >= 12 ? "PM" : "AM"}`
    );
  };
  useEffect(() => {
    handleRefresh();
  }, [id]);
  const fetchAndSetCsvData = async () => {
    try {
      const response = await getExcelData({ case_id: id });
      const data = response.data;

      const flattenedData = data.data.map((item) => [
        item.case_id,
        item.session_id,
        item.student_name,
        item.counsellor_name,
        item.counseling_type?.map((type) => type).join(", "),
        item.session_date,
        item.session_time,
        item.description,
        item.status,
      ]);

      const csvHeaders = data.headers.join(",");
      const csvRows = [
        csvHeaders,
        ...flattenedData.map((row) => row.join(",")),
      ];
      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "counselor_sessions.csv");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to fetch CSV data:", error);
    }
  };
  const handleBack = () => {
    setShowBackButton(false);
    navigate(-1);
  };
  return (
    <>
      <Stack
        direction={"row"}
        padding={"30px"}
        bgcolor={"#FFFFFF"}
        paddingBottom={0}
        justifyContent={"space-between"}
        borderBottom={"1px solid #E0E0E0"}
      >
        <Stack>
          <Typography variant="h4" color={"#4A4647"}>
            Cases / session
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography color="#828282" fontSize={"12px"}>
              Last synced: {lastSynced}
            </Typography>
            <IconButton size="12px" onClick={handleRefresh} color="primary">
              <RefreshIcon />
            </IconButton>
          </Stack>
        </Stack>{" "}
        <Stack>
          {" "}
          <StyledButton
            variant="filter"
            name="Download CSV"
            onClick={fetchAndSetCsvData}
          />
        </Stack>
      </Stack>{" "}
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
