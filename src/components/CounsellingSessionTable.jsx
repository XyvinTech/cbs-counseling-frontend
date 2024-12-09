import React, { useEffect, useState } from "react";
import StyledTable from "../ui/StyledTable";
import { useListStore } from "../store/listStore";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CounsellingSessionTable = ({ id }) => {
  const { fetchCounselorSession } = useListStore();
  const navigate = useNavigate();
  const sessions = [
    { title: "Session No", field: "session_id", padding: "none" },

    { title: "Student Name", field: "student_name" },
    { title: "Type ", field: "counsellor_type" },
    { title: "Date", field: "session_date" },
    { title: "Time", field: "session_time" },

    { title: "Status", field: "status" },
  ];
  const handleView = (id) => {
    navigate(`/cases/session/${id}`);
  };
  useEffect(() => {
    if (id) {
      fetchCounselorSession(id);
    }
  }, [id, fetchCounselorSession]);
  return (
    <Box
      padding="2px"
      paddingBottom={0}
      marginBottom={4}
      bgcolor={"white"}
      borderRadius={"15px"}
      boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
    >
      {" "}
      <StyledTable columns={sessions} onView={handleView} dashboard />{" "}
    </Box>
  );
};

export default CounsellingSessionTable;
