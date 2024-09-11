import React from "react";
import { Stack, Typography, Grid, Divider, Box } from "@mui/material";
import moment from "moment-timezone";
import { useAuthStore } from "../store/counselor/AuthStore";

const CaseCard = ({ data }) => {
  const formatDate = (dateString, format = "MMM DD, YYYY ") => {
    return moment.tz(dateString, "Asia/Muscat").format(format);
  };
  const { counselor } = useAuthStore();
  const userType = localStorage.getItem("userType");
  return (
    <Stack bgcolor={"white"} borderRadius={"15px"}>
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Stack justifyContent="space-between">
          <Typography variant="h6" color={"#828282"}>
            Case ID
          </Typography>
          <Typography variant="h4" color={"#4F4F4F"}>
            {" "}
            {data?.case_id?.case_id}   
          </Typography>
        </Stack>
        <Stack justifyContent="space-between">
          <Typography variant="h6" color={"#828282"}>
            Session No
          </Typography>
          <Typography variant="h5" color={"#4F4F4F"}>
            {data?.session_id}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Typography variant="h6" color={"#828282"}>
          Grade
        </Typography>
        <Typography variant="h6" color={"#23262F"}>
          {data.user?.designation} {data.user?.division}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor={"#F0F8FF"}
        padding={2}
      >
        <Typography variant="h6" color={"#828282"}>
          Appointment Date
        </Typography>
        <Stack>
          <Typography variant="h6" color={"#23262F"}>
            {data?.session_date ? formatDate(data.session_date) : "-"}
          </Typography>
          <Typography variant="h6" color={"#23262F"}>
            {data?.session_time
              ? `${data.session_time.start} - ${data.session_time.end}`
              : "-"}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Typography variant="h6" color={"#828282"}>
          Type of counseling
        </Typography>
        <Typography variant="h6" color={"#23262F"}>
          {data?.type}
        </Typography>
      </Stack>{" "}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        bgcolor={"#F0F8FF"}
        padding={2}
      >
        <Typography variant="h6" color={"#828282"} sx={{ width: "50%" }}>
          Reason for Counseling/Referral
        </Typography>
        <Typography
          variant="h6"
          color={"#23262F"}
          sx={{ width: "50%" }}
          textAlign={"end"}
        >
          {data?.description}
        </Typography>
      </Stack>{" "}
      {/* <Stack
        direction="row"
        justifyContent="space-between"
        bgcolor={"#F0F8FF"}
        padding={2}
      >
        <Typography variant="h6" color={"#828282"} sx={{ width: "50%" }}>
          Referee’s Remark
        </Typography>
        <Typography
          variant="h6"
          color={"#23262F"}
          sx={{ width: "50%" }}
          textAlign={"end"}
        >
          {data?.referer_remark ? data.referer_remark : "-"}
        </Typography>
      </Stack> */}
      <Stack direction="row" justifyContent="space-between" padding={2}>
        <Typography variant="h6" color={"#828282"}>
          Session status
        </Typography>
        <Typography variant="h6" color={"#23262F"}>
          {" "}
          {data?.status}
        </Typography>
      </Stack>{" "}
      {userType !== "student" && (
        <Stack
          direction="row"
          justifyContent="space-between"
          padding={2}
          bgcolor={"#F0F8FF"}
        >
          <Typography variant="h6" color={"#828282"}>
            Referer
          </Typography>
          <Typography variant="h6" color={"#23262F"}>
            {" "}
            {counselor?.name === data?.counsellor_name
              ? "-"
              : data?.counsellor_name}
          </Typography>
        </Stack>
      )}
      {userType !== "student" &&
        data?.referer_remark &&
        data.referer_remark.length > 0 &&
        data.referer_remark[0] !== null && (
          <Stack padding={2}>
            <Typography variant="h6" color={"#828282"}>
              Referee’s Remark
            </Typography>
            <Stack spacing={1}>
              {data.referer_remark.map((remark, index) => (
                <Typography key={index} variant="h6" color={"#23262F"}>
                  {remark.name}: {remark.remark}
                </Typography>
              ))}
            </Stack>
          </Stack>
        )}
    </Stack>
  );
};

export default CaseCard;
