import { useState, useCallback } from "react";
import DropZone from "../ui/DropZone";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { StyledButton } from "../ui/StyledButton";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { addCounselorBulk } from "../api/admin/counselorapi";
import { addStudentBulk } from "../api/admin/studentapi";


const AddBulk = ({ member ,onSuccess}) => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (file) => {
    setFiles([file]);
  };

  const handleCancel = () => {
    setFiles([]);
  };

  const parseFile = (file, callback) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;

      if (file.type === "text/csv") {
        // Parse CSV file using PapaParse
        const parsedData = Papa.parse(data, { header: true });
          const filteredData = parsedData.data.filter(row => 
        Object.values(row).some(value => value !== null && value !== "")
      );
      callback(filteredData);
      } else if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Parse XLS/XLSX file using XLSX
        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const filteredData = jsonData.filter(row => 
          Object.values(row).some(value => value !== null && value !== "")
        );
        callback(filteredData);
      }
    };

    if (file.type === "text/csv") {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const handleSave = async () => {
    if (files.length > 0) {
      const file = files[0]?.file;
      if (file) {
        parseFile(file, async (parsedData) => {
          console.log("Parsed Data:", parsedData);
          if (member == "councelor") {
            await addCounselorBulk(parsedData);

          }else{
            console.log('Student',member)
            await addStudentBulk(parsedData);
          }
          onSuccess();
        });
      } else {
        alert("No file uploaded yet!");
      }
    } else {
      alert("No file uploaded yet!");
    }
  };
  return (
    <Box bgcolor={"white"}>
      <Box padding={9}>
        <DropZone files={files} onFileUpload={handleFileUpload} />
        <Stack spacing={2} mt={4}>
          <Typography variant="h6">Instructions for bulk import:</Typography>
          <ul style={{ fontSize: "12px" }}>
            <li>Don't remove headers.</li>
            <li>Maximum of 50 entries allowed at a time.</li>
          </ul>
        </Stack>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Stack
          direction={"row"}
          spacing={2}
          width={"50%"}
          justifyContent={"end"}
        >
          <StyledButton
            name="Cancel"
            variant="secondary"
            style={{ width: "auto" }}
            onClick={handleCancel}
          >
            Cancel
          </StyledButton>
          <StyledButton
            name="Save"
            variant="primary"
            style={{ width: "auto" }}
            onClick={handleSave}
          >
            Save
          </StyledButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddBulk;
