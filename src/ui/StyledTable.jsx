import { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Divider,
  Stack,
  TablePagination,
  IconButton,
  Checkbox,
  Menu,
  Skeleton,
  MenuItem,
  Typography,
} from "@mui/material";
import { ReactComponent as ViewIcon } from "../assets/icons/ViewIcon.svg";
import { ReactComponent as LeftIcon } from "../assets/icons/LeftIcon.svg";
import { ReactComponent as RightIcon } from "../assets/icons/RightIcon.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useListStore } from "../store/listStore";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { StyledButton } from "./StyledButton";
const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    padding: 16px;
    text-align: center;
    font-weight: 600;
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    padding: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #ffffff; /* White for odd rows */
  }
  &:nth-of-type(even) {
    background-color: #FFE5F2; /* Gray for even rows */
  }
  &:last-child td,
  &:last-child th {
    border: 0;
  }
  cursor: ${({ showEdit }) => (showEdit ? "pointer" : "default")};
  &:hover {
    background-color:#FBBFDE;
  }
`;

const formatDate = (dateString, format = "MMM DD, YYYY ") => {
  return moment.tz(dateString, "Asia/Muscat").format(format);
};
const StyledTable = ({
  columns,
  onSelectionChange,
  onView,
  onDelete,
  onAdd,
  dashboard,
  menu,
  onIcon,
  counselor,
  onReschedule,
  reschedule,
  onEntry,
  onCancel,
  onEdit,
  pageNo,
  setPageNo,
  onDeleteRow,
  student,
  remark,
  rowPerSize,
  setRowPerSize,
}) => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [rowData, setRowData] = useState(null);

  const { lists, totalCount } = useListStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching

    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false once data is fetched
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectAllClick = (event) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked ? lists.map((row) => row._id) : [];
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };

  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked
      ? [...selectedIds, id]
      : selectedIds.filter((selectedId) => selectedId !== id);
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };
  const handleIcon = (data) => {
    onIcon(data);
    console.log(data);
    // handleMenuClose();
  };

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setRowId(row._id);
    setRowData(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setRowId(null);
    setRowData(null);
  };

  const handleView = () => {
    onView(rowId);
    handleMenuClose();
  };

  const handleEdit = () => {
    if (rowData) {
      onEdit(rowData);
    }
    handleMenuClose();
  };
  const handleDelete = () => {
    onDelete();
    setSelectedIds([]);
    handleMenuClose();
  };
  const handleRowDelete = (id) => {
    onDeleteRow(id);
    handleMenuClose();
  };

  const handleReschedule = () => {
    if (rowData) {
      onReschedule(rowData);
    }
    handleMenuClose();
  };
  const handleAddLink = () => {
    if (rowData) {
      onAdd(rowData);
    }
    handleMenuClose();
  };
  const handleCancel = () => {
    if (rowData) {
      onCancel(rowData);
    }
    handleMenuClose();
  };
  const handleAddEntry = () => {
    if (rowData) {
      onEntry(rowData);
    }
    handleMenuClose();
  };
  const handleRowClick = (id) => {
    onView(id);
  };

  const isSelected = (id) => selectedIds.includes(id);

  const getStatusVariant = (status) => {
    if (typeof status === "boolean") {
      return status ? "#2E7D32" : "#BFBABA";
    }
    switch (status) {
      case "active":
        return "#2E7D32";
      case "inactive":
        return "green";
      case "pending":
        return "#FFA500"; // Orange
      case "rescheduled":
        return "#FFC107"; // Yellow
      case "ongoing":
        return "green";
      case "closed":
        return "#938F8F";
      case "completed":
        return "#007BFF"; // Blue
      case "referred":
        return "orange";
      case "Recording Available":
        return "green";
      case "published":
        return "green";
      case "progress":
        return "#28A745"; // Green
      case "cancelled":
        return "#DC3545"; // Red
      case "draft":
        return "#BFBABA";
      default:
        return "default";
    }
  };
  const pageInc = () => {
    setPageNo((prev) => prev + 1);
  };
  const pageDec = () => {
    setPageNo((prev) => prev - 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowPerSize(parseInt(event.target.value, 10));
    setPageNo(1);
  };
  return (
    <Box bgcolor={"white"} borderRadius={"16px"}>
      <TableContainer sx={{ border: "none" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  checked={
                    lists.length > 0 && selectedIds.length === lists.length
                  }
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.field}
                  padding={column.padding || "normal"}
                >
                  {column.title}
                </StyledTableCell>
              ))}
              <StyledTableCell padding="normal"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Display skeletons while loading

              Array.from(new Array(5)).map((_, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell padding="checkbox">
                    <Skeleton variant="rectangular" width={24} height={24} />
                  </StyledTableCell>

                  {columns.map((column) => (
                    <StyledTableCell key={column.field}>
                      <Skeleton variant="text" width="100%" height={20} />
                    </StyledTableCell>
                  ))}

                  <StyledTableCell>
                    <Box display="flex" alignItems="center">
                      <Skeleton variant="circular" width={24} height={24} />

                      <Skeleton
                        variant="circular"
                        width={24}
                        height={24}
                        sx={{ marginLeft: 1 }}
                      />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : lists.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length + 2}>
                  <Typography variant="h6" textAlign="center">
                    No data
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              lists?.map((row) => (
                <StyledTableRow
                  role="checkbox"
                  key={row._id}
                  selected={isSelected(row._id)}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row._id)}
                      onChange={(event) =>
                        handleRowCheckboxChange(event, row._id)
                      }
                    />
                  </StyledTableCell>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.field}
                      padding={column.padding || "normal"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(row._id)}
                    >
                      {" "}
                      {column.field === "session_time" ? (
                        // Special handling for sessiontime column
                        <>
                          {row[column.field] && (
                            <Box>
                              <Typography variant="body2">
                                {row[column.field].start}-
                                {row[column.field].end}
                              </Typography>
                            </Box>
                          )}
                        </>
                      ) : column.field === "requisition_image" ? (
                        <img
                          src={row[column.field]}
                          alt={row[column.field]}
                          style={{ width: "100px", height: "auto" }}
                        />
                      ) : column.field === "status" ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <span
                            style={{
                              backgroundColor: getStatusVariant(
                                row[column.field]
                              ),
                              padding: "3px 8px",
                              borderRadius: "100px",
                              color: "#fff",
                            }}
                          >
                            {row[column.field] === "pending"
                              ? "awaiting"
                              : row[column.field] === "completed"
                              ? "closed"
                              : typeof row[column.field] === "boolean"
                              ? row[column.field]
                                ? "active"
                                : "inactive"
                              : row[column.field]}
                          </span>
                        </Box>
                      ) : [
                          "createdAt",
                          "updatedAt",
                          "date",
                          "session_date",
                          "case_date",
                        ].includes(column.field) ? (
                        formatDate(row[column.field])
                      ) : (
                        row[column.field]
                      )}
                    </StyledTableCell>
                  ))}

                  <StyledTableCell padding="normal">
                    <Box display="flex" alignItems="center">
                      {onIcon && (
                        <IconButton
                          aria-controls="simple-view"
                          aria-haspopup="true"
                          onClick={() => handleIcon(row)}
                        >
                          <ViewIcon />
                        </IconButton>
                      )}
                      {menu &&
                        row.status !== "cancelled" &&
                        row.status !== "completed" && (
                          <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => handleMenuOpen(event, row)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        )}

                      <Menu
                        id="row-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && rowId === row._id}
                        onClose={handleMenuClose}
                      >
                        {counselor ? (
                          <>
                            {rowData?.status === "pending" ||
                            row.status === "rescheduled" ? (
                              <>
                                {" "}
                                <MenuItem onClick={handleAddLink}>
                                  Accept Session
                                </MenuItem>
                                <MenuItem onClick={handleReschedule}>
                                  Reschedule
                                </MenuItem>
                                <MenuItem onClick={handleCancel}>
                                  Cancel
                                </MenuItem>
                              </>
                            ) : rowData?.status === "progress" ? (
                              <MenuItem onClick={handleAddEntry}>
                                Add Session Entry
                              </MenuItem>
                            ) : null}
                          </>
                        ) : reschedule ? (
                          <>
                            {rowData?.status === "pending" ||
                            rowData?.status === "rescheduled" ? (
                              <>
                                <MenuItem onClick={handleReschedule}>
                                  Reschedule
                                </MenuItem>
                                <MenuItem onClick={handleCancel}>
                                  Cancel
                                </MenuItem>
                              </>
                            ) : rowData?.status === "progress" ? (
                              <MenuItem onClick={handleCancel}>Cancel</MenuItem>
                            ) : null}
                          </>
                        ) : student ? (
                          <>
                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                            <MenuItem onClick={() => handleRowDelete(row._id)}>
                              Delete
                            </MenuItem>
                          </>
                        ) : remark ? (
                          <>
                            <MenuItem onClick={handleAddEntry}>
                              Add Remark
                            </MenuItem>
                          </>
                        ) : (
                          <>
                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                            <MenuItem onClick={handleReschedule}>
                              Activate
                            </MenuItem>
                            <MenuItem onClick={() => handleRowDelete(row._id)}>
                              Delete
                            </MenuItem>
                            {/* <MenuItem onClick={handleDelete}>Delete</MenuItem> */}
                          </>
                        )}
                      </Menu>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Divider />
        {!dashboard && (
          <Stack
            padding={2}
            component="div"
            direction={"row"}
            justifyContent={
              selectedIds.length > 0 && onDelete ? "space-between" : "flex-end"
            }
            alignItems="center"
          >
            {selectedIds.length > 0 && onDelete && (
              <Stack direction="row" alignItems="center">
                <Typography paddingRight={3}>
                  {`${selectedIds.length} item${
                    selectedIds.length > 1 ? "s" : ""
                  } selected`}
                </Typography>
                <StyledButton
                  variant="red"
                  name="Delete"
                  onClick={() => handleDelete(selectedIds)}
                />
              </Stack>
            )}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <TablePagination
                  component="div"
                  rowsPerPage={rowPerSize}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelDisplayedRows={({ from, to }) =>
                    `${pageNo}-${Math.ceil(
                      totalCount / rowPerSize
                    )} of ${totalCount}`
                  }
                  ActionsComponent={({ onPageChange }) => (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      marginLeft={2}
                    >
                      {" "}
                      <Box
                        onClick={pageNo > 1 ? pageDec : null}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: pageNo > 1 ? "pointer" : "not-allowed",
                          opacity: pageNo > 1 ? 1 : 0.5,
                        }}
                      >
                        <LeftIcon />{" "}
                      </Box>
                      <Box
                        onClick={
                          pageNo < Math.ceil(totalCount / rowPerSize)
                            ? pageInc
                            : null
                        }
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor:
                            pageNo < Math.ceil(totalCount / rowPerSize)
                              ? "pointer"
                              : "not-allowed",
                          opacity:
                            pageNo < Math.ceil(totalCount / rowPerSize)
                              ? 1
                              : 0.5,
                        }}
                      >
                        {" "}
                        <RightIcon />{" "}
                      </Box>
                    </Stack>
                  )}
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </TableContainer>
    </Box>
  );
};

export default StyledTable;
