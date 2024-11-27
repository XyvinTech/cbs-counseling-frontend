import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import image from "../assets/images/staff.png";
const UserCard = ({ user }) => {
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
      <Grid item md={8} xs={6}>
        <Stack spacing={1}>
          {/* {user?.id ? (
            <Typography variant="h8" color={"rgba(44, 40, 41, 0.6)"}>
              {user?.id}
            </Typography>
          ) : null} */}
          <Typography variant="h5" color={"#4A4647"}>
            {user?.name}
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            {user?.designation}{user?.division}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.mobile}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h6" color={"#2C2829"}>
              {user?.email}
            </Typography>
          </Stack>
          {user?.StudentReferencesCode && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6" color={"#2C2829"}>
                References Code :
              </Typography>
              <Typography variant="h6" color={"#2C2829"}>
                {user?.StudentReferencesCode}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserCard;
