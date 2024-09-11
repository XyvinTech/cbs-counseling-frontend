import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import image from "../assets/images/staff.png";
const ParentCard = ({ user }) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"15px"}
      padding={"10px"}
      minHeight={"180px"}
    >
      <Grid item md={12} xs={12}>
        <Stack spacing={1}>
          <Typography variant="h8" color={"rgba(44, 40, 41, 0.6)"}>
            Guardian
          </Typography>

          <Typography variant="h5" color={"#4A4647"}>
          Prabodhan Fitzgerald
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.parentcontact}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h6" color={"#2C2829"}>
            Prabfitz@gmail.com
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ParentCard;
