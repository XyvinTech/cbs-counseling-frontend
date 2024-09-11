import React, { useEffect, useState } from "react";
import StyledTable from "../ui/StyledTable";
import { useListStore } from "../store/listStore";
import { Box } from "@mui/material";

const CounselorCaseTable = ({ id }) => {
  const { fetchCounselorCase } = useListStore();
  const Cases = [
    { title: "Case ID", field: "case_id", padding: "none" },
    { title: "Created on", field: "case_date" },
    { title: "Student Name ", field: "student_name" },
    { title: "Status", field: "status" },
  ];

  useEffect(() => {
    if (id) {
      fetchCounselorCase(id);
    }
  }, [id, fetchCounselorCase]);
  return (
    <Box padding="2px" paddingBottom={0} marginBottom={4} bgcolor={"white"} borderRadius={"15px"}>
      <StyledTable columns={Cases} dashboard />
    </Box>
  );
};

export default CounselorCaseTable;
