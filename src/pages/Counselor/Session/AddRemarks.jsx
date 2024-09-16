import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import initialChats from "../../../assets/json/RemarksData";
import { StyledMultilineTextField } from "../../../ui/StyledMultilineTextField ";
import { StyledButton } from "../../../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { useSessionStore } from "../../../store/counselor/SessionStore";
const AddRemarks = ({ rowData, onSubmitSuccess }) => {
  const { refereeRemark } = useSessionStore();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        remark: data?.remark,
      }
      await refereeRemark(rowData._id, formData);
      reset();
      onSubmitSuccess();

    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box padding="30px" marginBottom={4}>
        {" "}
        <Grid container spacing={2}>
          {" "}
          <Grid item md={6}>
            <Grid item md={6}>
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={500}>
                  Name: {rowData?.user_name}
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  Counselling Type: {rowData?.couselling_type}
                </Typography>
                <Typography variant="h6" paddingBottom={5}>
                  Description: {rowData?.description}
                </Typography>
              </Stack>
            </Grid>{" "}
            <Grid item md={6}>
              {" "}
            </Grid>
            {/* Session Details Section */}
            {rowData?.sessions?.map((session) => (
              <Grid item md={12} key={session.id}>
                <Card sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={500}>
                      Session ID: {session.session_id}
                    </Typography>
                    <Typography variant="h6" sx={{ marginTop: 1 }}>
                      <strong>Case Details:</strong> {session.case_details}
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Session Date: {session.session_date}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Time: {session.session_time.start} -{" "}
                      {session.session_time.end}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Grid item md={6}>
            <>
              <Box p={4}>
                {rowData.referer_remark && rowData.referer_remark.length > 0 ? (
                  rowData.referer_remark.map((chat, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#f1f1f1",
                        borderRadius: 2,
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="h5" fontWeight={600} mb={2}>
                        {chat.name}:
                      </Typography>
                      <Typography variant="h6">{chat.remark}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="h6" textAlign="center">
                    No remarks available.
                  </Typography>
                )}
              </Box>{" "}
              <Box padding="30px" >
                <form onSubmit={handleSubmit(onSubmit)}>
                  {" "}
                  <Controller
                    name="remark"
                    control={control}
                    defaultValue=""
                    rules={{ required: " Remark is required" }}
                    render={({ field }) => (
                      <>
                        <StyledMultilineTextField
                          placeholder={"Add Your Remarks"}
                          {...field}
                        />{" "}
                        {errors.remark && (
                          <span style={{ color: "red" }}>
                            {errors.remark.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                  <Box
                    sx={{ mt: 4 }}
                    display={"flex"}
                    justifyContent={"flex-end"}
                  >
                    <StyledButton
                      name={"Add"}
                      variant={"primary"}
                      disabled={loading}
                      type="submit"
                    />
                  </Box>{" "}
                </form>
              </Box>{" "}
            </>{" "}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddRemarks;
