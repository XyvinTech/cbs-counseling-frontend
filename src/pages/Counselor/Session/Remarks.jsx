import { Box } from "@mui/material";
import StyledTable from "../../../ui/StyledTable";
import AddRemarks from "./AddRemarks";
import { useNavigate } from "react-router-dom";
import { useListStore } from "../../../store/listStore";
import { useEffect, useState } from "react";

const Remarks = ({refreshTrigger, setLastSynced}) => {
  const navigate = useNavigate();
  const { counselorSessions } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);
  const [showAddRemark, setShowAddRemark] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const userColumns = [
    { title: "Case ID", field: "case_id" },
    // { title: "Session ID", field: "session_id" },
    { title: "Student Name", field: "user_name" },
    { title: "Type of Counseling", field: "couselling_type" },
    { title: "Status", field: "status" },
  ];

  useEffect(() => {
    let filter = { type: "remarks" };
    filter.page = pageNo;
    filter.limit = row;
    counselorSessions(filter);
    const currentTime = new Date();
    setLastSynced(
      `${currentTime?.getHours()}:${String(currentTime?.getMinutes())?.padStart(
        2,
        "0"
      )} ${currentTime?.getHours() >= 12 ? "PM" : "AM"}`
    );
  }, [refreshTrigger, setLastSynced, pageNo, isChange, row]);

  const handleAddEntry = (rowData) => {
    setSelectedRowData(rowData);
    setShowAddRemark(true);
  };

  return (
    <Box
      padding="2px"
      marginBottom={4}
      bgcolor={"white"}
      borderRadius={"15px"}
      boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
    >
      {showAddRemark ? (
        <AddRemarks
          rowData={selectedRowData}
          onSubmitSuccess={() => {
            setShowAddRemark(false);
            setIsChange((prev) => !prev);
          }}
        />
      ) : (
        <StyledTable
          columns={userColumns}
          menu
          remark
          onEntry={handleAddEntry}
          pageNo={pageNo}
          setPageNo={setPageNo}
          rowPerSize={row}
          setRowPerSize={setRow}
        />
      )}
    </Box>
  );
};

export default Remarks;
