import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/GraduationIcon.svg";
import image from "../assets/images/staff.png";
const StudentCard = ({ user }) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"10px"}
      minHeight={"180px"}
    >
      <Grid item md={8} xs={12}>
        <Stack spacing={1}>
          {/* <Typography variant="h8" color={"rgba(44, 40, 41, 0.6)"}>
              {user?.user}
            </Typography> */}
          <Typography variant="h5" color={"#4A4647"}>
            {user?.form_id?.name}
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            {user?.type}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <PhoneIcon style={{ height: "20px", width: "20px" }} />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.form_id?.class}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.form_id?.email}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="h6"
              color={"#2C2829"}
              textTransform={"capitalize"}
            >
              Booked By :
            </Typography>
            <Typography
              variant="h6"
              color={"#2C2829"}
              textTransform={"capitalize"}
            >
              {user?.form_id?.refereeName
                ? user.form_id.refereeName + " (" + user?.form_id?.referee + ")"
                : user?.form_id?.referee}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default StudentCard;
