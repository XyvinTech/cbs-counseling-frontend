import React, { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, Stack, Grid } from "@mui/material";
import StyledTable from "../../../../ui/StyledTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddCounselor from "../../../../components/AddCounselor";
import { ReactComponent as FilterIcon } from "../../../../assets/icons/FilterIcon.svg";
import StyledSearchbar from "../../../../ui/StyledSearchbar";
import AddBulk from "../../../../components/AddBulk";
import { useListStore } from "../../../../store/listStore";
import ActivateCounsellor from "../../../../components/ActivateCounsellor";
import EditCounselor from "../../../../components/EditCounselor";
import { useAdminStore } from "../../../../store/admin/AdminStore";

export const Counselor = () => {
  const navigate = useNavigate();
  const { fetchLists } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const { deleteUsers } = useAdminStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(
    parseInt(searchParams.get("tab") || "0")
  );
  const [search, setSearch] = useState("");
  const [isChange, setIsChange] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  const handleIsChange = () => {
    setIsChange(!isChange);
  };
  const handleActivate = (rowData) => {
    setSelectedRowId(rowData);

    setActivateOpen(true);
    // setIsChange(!isChange);
  };
  const handleCloseActivate = () => {
    setActivateOpen(false);
    setSelectedRowId(null);
    setIsChange(!isChange);
  };
  const handleEdit = (rowData) => {
    setSelectedRowId(rowData);

    setEditOpen(true);
    // setIsChange(!isChange);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        const deleteData = {
          ids: selectedRows,
        };
        await deleteUsers(deleteData);
        // console.log(selectedRows);
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
      // console.log(selectedRows);
      setIsChange(!isChange);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedRowId(null);
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    // console.log("Selected items:", newSelectedIds);
  };
  const handleSuccess = () => {
    navigate("/user/counselor?tab=0");
  };

  const handleView = (id) => {
    navigate(`/user/counselor/${id}`);
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSearchParams({ tab: newValue });
  };
  const userColumns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Contact Info", field: "mobile" },
    { title: "Designation", field: "designation" },
    // { title: "Experience Level", field: "location" },
    // { title: "Status", field: "status" },
  ];
  useEffect(() => {
    let filter = { type: "counsellers" };
    if (search) {
      filter.searchQuery = search;
    }
    filter.page = pageNo;
    filter.limit = row;
    fetchLists(filter);
  }, [isChange, fetchLists, search, pageNo, selectedTab, row]);
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
            fontSize: "16px",
          },
          "& .Mui-selected": {
            color: "#0072BC",
          },
        }}
      >
        <Tab label="Counselor" />
        <Tab label="Add Counselor" />
        <Tab label="Add Bulk" />
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
                  placeholder={"Search Counselor Name"}
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
                onSelectionChange={handleSelectionChange}
                onView={handleView}
                menu
                pageNo={pageNo}
                setPageNo={setPageNo}
                rowPerSize={row}
                setRowPerSize={setRow}
                onDeleteRow={handleRow}
                onReschedule={handleActivate}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />{" "}
            </Box>
            <ActivateCounsellor
              open={activateOpen}
              onClose={handleCloseActivate}
              rowData={selectedRowId}
            />
            <EditCounselor
              open={editOpen}
              onClose={handleCloseEdit}
              rowData={selectedRowId}
              onChange={handleIsChange}
            />
          </>
        )}
        {selectedTab === 1 && (
          <AddCounselor
            onChange={handleIsChange}
            setSelectedTab={setSelectedTab}
          />
        )}
        {selectedTab === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AddBulk member={"councelor"} onSuccess={handleSuccess} />{" "}
            </Grid>{" "}
          </Grid>
        )}
      </Box>
    </>
  );
};
