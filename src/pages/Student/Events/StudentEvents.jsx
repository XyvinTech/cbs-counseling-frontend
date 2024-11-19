import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledTable from "../../../ui/StyledTable";
import { useListStore } from "../../../store/listStore";
import ViewEvent from "../../../components/ViewEvent";

const StudentEvents = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { fetchLists } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleView = (rowData) => {
    setSelectedRowId(rowData);

    setViewOpen(true);
  };
  const handleCloseEvent = () => {
    setViewOpen(false);
    setSelectedRowId(null);
    // setIsChange(!isChange);
  };

  const userColumns = [
    { title: "Event Date", field: "date", padding: "none" },

    { title: "Time", field: "time" },
    { title: "Event Name", field: "title" },
    { title: "Event image", field: "event_image" },
    // { title: "Designation", field: "designation" },
    // { title: "Experience Level", field: "experience" },
    // { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "events" };
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
      <Box padding={"30px"} bgcolor={"#FFFFFF"}>
        <Typography variant="h4" color={"#4A4647"}>
          Events / Events list
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
                placeholder={"Search Event Name"}
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
          >
            <StyledTable
              columns={userColumns}
              onIcon={handleView}
              pageNo={pageNo}
              setPageNo={setPageNo}
              rowPerSize={row}
              setRowPerSize={setRow}
            />{" "}
          </Box>
          <ViewEvent
            open={viewOpen}
            onClose={handleCloseEvent}
            rowData={selectedRowId}
            onIcon={handleView}
          />
        </>
      </Box>
    </>
  );
};

export default StudentEvents;
