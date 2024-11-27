import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import image from "../assets/images/staff.png";
const CounselorCard = ({ user }) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"15px"}
      padding={"10px"}
      minHeight={"180px"}
      boxShadow={"0px 4px 20px rgba(0, 0, 0, 0.1)"}
    >
      <Grid item md={8} xs={12}>
        <Stack spacing={1}>
          <Typography variant="h5" color={"#4A4647"}>
            {user?.counsellor?.name}
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            {user?.type}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.counsellor?.mobile}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.counsellor?.email}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CounselorCard;
