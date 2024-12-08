import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { StyledButton } from "../../../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import { useSessionStore } from "../../../store/counselor/SessionStore";
import { toast } from "react-toastify";
import { StyledMultilineTextField } from "../../../ui/StyledMultilineTextField ";

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
      };
      await refereeRemark(rowData._id, formData);
      reset();
      onSubmitSuccess();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding="30px" marginBottom={4}>
      {/* User Details Section */}
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight={600}
            color="primary"
            gutterBottom
          >
            User Details
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography variant="h6" fontWeight={500}>
                Name:
              </Typography>
              <Typography variant="h6">{rowData?.form_id?.name}</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h6" fontWeight={500}>
                Email:
              </Typography>
              <Typography variant="h6">{rowData?.form_id?.email}</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h6" fontWeight={500}>
                Referee
              </Typography>
              <Typography variant="h6" textTransform={"capitalize"}>{rowData?.form_id?.referee}</Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item md={4}>
              <Typography variant="h6" fontWeight={500}>
                Class :
              </Typography>
              <Typography variant="h6">{rowData?.form_id?.class}</Typography>
            </Grid>

        
          </Grid>
        </CardContent>
      </Card>

      {/* Counseling Details Section */}
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight={600}
            color="secondary"
            gutterBottom
          >
            Counseling Details
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="h6" fontWeight={500}>
                Counseling Type:
              </Typography>
              <Typography variant="h6">{rowData?.couselling_type}</Typography>
            </Grid>
            <Grid item md={6}>
              <Typography variant="h6" fontWeight={500}>
                Description:
              </Typography>
              <Typography variant="h6">{rowData?.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Session Details Section */}
      {rowData?.session_ids?.map((session) => (
        <Card key={session._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={500}>
              Session ID: {session?.session_id}
            </Typography>
            <Typography variant="h6" mt={1}>
              <strong>Case Details:</strong> {session?.case_details}
            </Typography>
            <Typography variant="h6" mt={1}>
              <strong>Session Date:</strong>{" "}
              {new Date(session.session_date).toLocaleDateString()}
            </Typography>
            <Typography variant="h6" mt={1}>
              <strong>Session Time:</strong> {session.session_time.start} -{" "}
              {session.session_time.end}
            </Typography>
            <Typography variant="h6" mt={1}>
              <strong>Interaction:</strong> {session.interactions}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {/* Referer Remarks Section */}
      {rowData?.referer_remark?.length > 0 && (
        <Card sx={{ marginBottom: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={500} mb={2}>
              Referer Remarks
            </Typography>
            {rowData?.referer_remark?.map((remark, index) => (
              <Box key={index} mb={2}>
                <Typography variant="h6" fontWeight={500}>
                  Name: {remark?.name}
                </Typography>
                <Typography variant="h6">{remark?.remark}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Remarks Input Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={500} mb={2}>
            Add Remarks
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="remark"
              control={control}
              rules={{ required: "Remark is required" }}
              render={({ field }) => (
                <StyledMultilineTextField
                  {...field}
                  error={Boolean(errors.remark)}
                  helperText={errors.remark?.message}
                  label="Enter Remark"
                  fullWidth
                />
              )}
            />

            <Stack direction="row" justifyContent="flex-end" mt={2}>
              <StyledButton
                variant="primary"
                name={loading ? "Submitting..." : "Submit"}
                type="submit"
                disabled={loading}
              />
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddRemarks;
