import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../ui/StyledTable";
import { useNavigate } from "react-router-dom";
import AddEvent from "../../../components/AddEvent";
import { ReactComponent as FilterIcon } from "../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../ui/StyledSearchbar";
import { useListStore } from "../../../store/listStore";
import EditEvent from "../../../components/EditEvent";
import { useEventStore } from "../../../store/eventStore";
import ViewEvent from "../../../components/ViewEvent";
export default function Events() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const {  fetchLists } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const { deleteEvents, updateChange, change } = useEventStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleIsChange = () => {
    setIsChange(!isChange);
  };
  const handleEdit = (rowData) => {
    setSelectedRowId(rowData);

    setEditOpen(true);
    // setIsChange(!isChange);
  };
  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedRowId(null);
  };
  const handleCloseEvent = () => {
    setViewOpen(false);
    setSelectedRowId(null);
    // setIsChange(!isChange);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    // console.log("Selected items:", newSelectedIds);
  };

  const handleView = (rowData) => {
    setSelectedRowId(rowData);

    setViewOpen(true);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      const deleteData = {
        ids: selectedRows,
      };
      await deleteEvents(deleteData);
      updateChange();
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  
  const handleRow = async (id) => {
    const deleteData = {
      ids: [id],
    };
    await deleteEvents(deleteData);
    updateChange();
    setIsChange(!isChange);
  };
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const userColumns = [
    { title: "Event Date", field: "date", padding: "none" },
    { title: "Event Name", field: "title" },
    { title: "Venue", field: "venue" },
    // { title: "Experience Level", field: "experience" },
    // { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "events" };
    if (search) {
      filter.searchQuery = search;
    }
    filter.page = pageNo;
    filter.limit = row;
    fetchLists(filter);
  }, [isChange, fetchLists, search, pageNo,row]);

  return (
    <>
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
            fontWeight: 600,
          },
          "& .Mui-selected": {
            color: "#0072BC",
          },
        }}
      >
        <Tab label="Events" />
        <Tab label="Add Event" />
      </Tabs>{" "}
      <Box padding="30px" marginBottom={4}>
        {selectedTab === 0 && (
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
            </Stack>
            <Box
              padding="2px"
              paddingBottom={0}
              marginBottom={4}
              bgcolor={"white"}
              borderRadius={"15px"}
            >
              <StyledTable
                columns={userColumns}
                // data={userData}
                onSelectionChange={handleSelectionChange}
                onIcon={handleView}
                menu
                student
                pageNo={pageNo}
                setPageNo={setPageNo}
                rowPerSize={row}
                setRowPerSize={setRow}
                onDeleteRow={handleRow}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />{" "}
            </Box>
            <EditEvent
              open={editOpen}
              onClose={handleCloseEdit}
              rowData={selectedRowId}
              onChange={handleIsChange}
            />
            <ViewEvent
              open={viewOpen}
              onClose={handleCloseEvent}
              rowData={selectedRowId}
            />
          </>
        )}
        {selectedTab === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {" "}
              <AddEvent
                onChange={handleIsChange}
                setSelectedTab={setSelectedTab}
              />
            </Grid>{" "}
          </Grid>
        )}
      </Box>
    </>
  );
}
