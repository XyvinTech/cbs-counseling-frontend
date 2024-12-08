import React, { useEffect } from "react";
import { Box, Dialog, Grid, Typography } from "@mui/material";
import { useNotificationStore } from "../store/notificationStore";
import { Link } from "react-router-dom";

const Notification = ({ open, onClose }) => {
  const { noti, getNotification, isChange, updateChange, update } =
    useNotificationStore();

  useEffect(() => {
    getNotification();
  }, [getNotification]);

  const handleNotificationClick = (caseId) => {
    update(caseId);
    updateChange(isChange);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: "21px",
          position: "absolute",
          top: "0%",
          right: "0",
          transform: "translateX(0)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        },
      }}
    >
      <Grid container spacing={2} padding={3}>
        {noti && noti.length > 0 ? (
          noti?.map((notification) => (
            <Grid item xs={12} key={notification?.id}>
              <Box
                component={Link}
                to={`/counselor/session/case/${notification?.case_id}`}
                style={{ textDecoration: "none" }}
                onClick={() => handleNotificationClick(notification?._id)}
                sx={{
                  display: "block",
                  padding: 2,
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="#333333">
                  {notification?.details}
                </Typography>
                <Typography variant="body2" color="#333333">
                  {new Date(notification?.createdAt).toLocaleString()}
                </Typography>{" "}
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ textAlign: "center", padding: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" color="#333333" fontWeight="bold">
                No new notifications
              </Typography>
              <Typography variant="body2" color="textSecondary">
                You're all caught up!
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
};

export default Notification;
