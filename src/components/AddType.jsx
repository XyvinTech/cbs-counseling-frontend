import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListStore } from "../store/listStore";
import StyledTable from "../ui/StyledTable";
import { StyledButton } from "../ui/StyledButton";
import CreateType from "./CreateType";
import EditType from "./EditType";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useCounsellorTypeStore } from "../store/admin/CounsellorTypeStore";
export default function AddType() {
  const navigate = useNavigate();
  const { fetchLists } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const { deleteTypes } = useCounsellorTypeStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const [lastSynced, setLastSynced] = useState("0 minutes ago");
  const [isChange, setIsChange] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleIsChange = () => {
    setIsChange(!isChange);
  };
  const handleEdit = (rowData) => {
    setSelectedRowId(rowData);

    setEditOpen(true);
    // setIsChange(!isChange);
  };
  const handleAddType = () => {
    setCreateOpen(true);
  };
  const handleCloseCreate = () => {
    setCreateOpen(false);
    setSelectedRowId(null);
  };
  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedRowId(null);
    setIsChange(!isChange);
  };

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    // console.log("Selected items:", newSelectedIds);
  };

  const handleDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        const deleteData = {
          ids: selectedRows,
        };
        await deleteTypes(deleteData);
        setIsChange(!isChange);
        setSelectedRows([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRow = async (id) => {
    try {
      const deleteData = {
        ids: [id],
      };
      await deleteTypes(deleteData);
      setIsChange(!isChange);
    } catch (error) {
      console.log(error);
    }
  };

  const userColumns = [
    { title: "Couselling Type", field: "name", padding: "none" },

    { title: "Created At", field: "createdAt" },
  ];
 const handleRefresh = () => {
    let filter = { type: "counselling-type" };
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

  }
  useEffect(() => {
    handleRefresh();
  }, [isChange, search, pageNo, row]);
  return (
    <>
      {" "}
      <Box
        padding={"30px"}
        bgcolor={"#FFFFFF"}
        paddingBottom={0}
        borderBottom="1px solid #E0E0E0"
      >
        <Typography variant="h4" color={"#4A4647"}>
          Counseling Type
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography color="#828282" fontSize={"12px"}>
            Last synced: {lastSynced}
          </Typography>
          <IconButton size="12px" onClick={handleRefresh} color="primary">
            <RefreshIcon />
          </IconButton>
        </Stack>
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
              <StyledButton
                variant={"primary"}
                name={"Add Type"}
                onClick={handleAddType}
              />
            </Stack>
          </Stack>
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
              menu
              pageNo={pageNo}
              setPageNo={setPageNo}
              rowPerSize={row}
              setRowPerSize={setRow}
              student
              onDeleteRow={handleRow}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />{" "}
            <CreateType
              open={createOpen}
              onClose={handleCloseCreate}
              rowId={selectedRowId}
              setIsChange={setIsChange}
            />
            <EditType
              open={editOpen}
              onClose={handleCloseEdit}
              rowData={selectedRowId}
              onChange={handleIsChange}
            />
          </Box>
        </>
      </Box>
    </>
  );
}
