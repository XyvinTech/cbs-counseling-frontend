import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledTable from "../../../ui/StyledTable";

import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { useListStore } from "../../../store/listStore";
export default function CasesSection() {
  const navigate = useNavigate();
  const { fetchLists } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleView = (id) => {
    navigate(`/cases/case/${id}`);
  };
  const userColumns = [
    { title: "Case ID", field: "case_id", padding: "none" },

    { title: "Created on", field: "createdAt" },
    { title: "Student Name", field: "user_name" },
    { title: "Counselor Name", field: "counsellor_name" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "cases" };
    if (search) {
  
      filter.searchQuery = search;
      setPageNo(1);
    }
    filter.page = pageNo;
    filter.limit = row;
    fetchLists(filter);
  }, [fetchLists, search, pageNo, row]);
  return (
    <>
      {" "}
      <Box padding={"30px"} bgcolor={"#FFFFFF"} borderBottom={"1px solid #E0E0E0"}>
        <Typography variant="h4" color={"#4A4647"}>
          Cases
        </Typography>
      </Box>
      <Box padding="30px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            paddingBottom={3}
            alignItems={"center"}
          >
            <Stack direction={"row"} spacing={2}>
              <StyledSearchbar
                placeholder={"Search Student Name"}
                onchange={(e) => setSearch(e.target.value)}
              />
              {/* <Box
                bgcolor={"#FFFFFF"}
                borderRadius={"50%"}
                width={"48px"}
                height={"48px"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid rgba(0, 0, 0, 0.12)"
                onClick={handleOpenFilter}
                style={{ cursor: "pointer" }}
              >
                <FilterIcon />
              </Box> */}
            </Stack>
          </Stack>{" "}
          <Box
            padding="2px"
            marginBottom={4}
            bgcolor={"white"}
            borderRadius={"15px"}
            boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
          >
            <StyledTable
              columns={userColumns}
              pageNo={pageNo}
              setPageNo={setPageNo}
              rowPerSize={row}
              setRowPerSize={setRow}
              onView={handleView}
            />{" "}
          </Box>
        </>
      </Box>
    </>
  );
}
