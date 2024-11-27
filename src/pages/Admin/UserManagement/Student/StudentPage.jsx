import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../../../ui/StyledTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ReactComponent as FilterIcon } from "../../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../../ui/StyledSearchbar";
import { useListStore } from "../../../../store/listStore";
import AddStudent from "../../../../components/AddStudent";
import EditStudent from "../../../../components/EditStudent";
import { useAdminStore } from "../../../../store/admin/AdminStore";
import AddBulk from "../../../../components/AddBulk";

const StudentPage = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const { deleteUsers } = useAdminStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(
    parseInt(searchParams.get("tab") || "0")
  );

  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { fetchLists } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [lastSynced, setLastSynced] = useState("0 minutes ago");
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleEdit = (rowData) => {
    setSelectedRowId(rowData);

    setEditOpen(true);
  };
  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedRowId(null);
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSuccess = () => {
    navigate("/user/student?tab=0");
  };
  const handleIsChange = () => {
    setIsChange((prev) => !prev);
  };
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        const deleteData = {
          ids: selectedRows,
        };
        await deleteUsers(deleteData);
        setIsChange(!isChange);
        setSelectedRows([]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleRow = async (id) => {
    try {
      const deleteData = {
        ids: [id],
      };
      await deleteUsers(deleteData);
      setIsChange(!isChange);
    } catch (error) {
      console.log(error);
    }
  };
  const handleView = (id) => {
    navigate(`/user/student/${id}`);
  };
  const userColumns = [
    // { title: "Student ID", field: "id", padding: "none" },

    { title: "Student Name", field: "name" },

    { title: "Class", field: "designation" },
    { title: "Email Id  ", field: "email" },
    { title: "Contact info", field: "mobile" },
    { title: "GRP Number", field: "StudentReferencesCode" },
    { title: "Parent Contact", field: "parentContact" },
  ];

  const handleRefresh = () => {
    let filter = { type: "students" };
    if (search) {
      filter.searchQuery = search;
      setPageNo(1);
    }
    filter.page = pageNo;
    filter.limit = row;
    fetchLists(filter);
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
  }, [search, isChange, pageNo, selectedTab, row]);
  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#864DF4",
            height: 4,
            borderRadius: "4px",
          },
        }}
        sx={{
          bgcolor: "white",
          paddingTop: "34px",
          borderBottom: "1px solid #E0E0E0",
          "& .MuiTabs-indicator": {
            backgroundColor: "#864DF4",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "16px",
            color: "#828282",
          },
          "& .Mui-selected": {
            color: "#864DF4",
          },
        }}
      >
        <Tab label="Student" />
        <Tab label="Add Student" />
        <Tab label="Add Bulk" />
        <Stack direction="row" alignItems="center" justifyContent={"end"}>
          <Typography color="#828282" fontSize={"12px"}>
            Last synced: {lastSynced}
          </Typography>
          <IconButton size="12px" onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Tabs>
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
            </Stack>
            <EditStudent
              open={editOpen}
              onClose={handleCloseEdit}
              rowData={selectedRowId}
              setIsChange={handleIsChange}
            />{" "}
            <Box
              padding="2px"
              marginBottom={4}
              bgcolor={"white"}
              borderRadius={"15px"}
              boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
            >
              <StyledTable
                columns={userColumns}
                onSelectionChange={handleSelectionChange}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDeleteRow={handleRow}
                pageNo={pageNo}
                setPageNo={setPageNo}
                rowPerSize={row}
                setRowPerSize={setRow}
                menu
                student
              />{" "}
            </Box>
          </>
        )}
        {selectedTab === 1 && (
          <AddStudent
            onChange={handleIsChange}
            setSelectedTab={setSelectedTab}
          />
        )}
        {selectedTab === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AddBulk member={"student"} onSuccess={handleSuccess} />
            </Grid>{" "}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default StudentPage;
