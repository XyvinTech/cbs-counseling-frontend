import {
  Box,
  Card,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSelectField from "../ui/StyledSelectField";
import { StyledButton } from "../ui/StyledButton";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../ui/StyledInput";
import { useSessionStore } from "../store/counselor/SessionStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addForm, getGrDetails } from "../api/admin/adminapi";
import bg from "../assets/images/BG-form.jpg";
import logo from "../assets/images/schoolLogo.png";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function StudentRegForm() {
  const { control, reset, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const { setSessionId } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const [grDetails, setGrDetails] = useState(null);
  const [type, setType] = useState(null);

  const options = [
    { label: "Student", value: "student" },
    { label: "Teacher", value: "teacher" },
    { label: "Parent", value: "parent" },
  ];
  const grNumber = watch("grNumber");

  useEffect(() => {
    if (!grNumber) return;

    const timer = setTimeout(async () => {
      try {
        const details = await getGrDetails(grNumber);
        setGrDetails(details.data);
      } catch (error) {
        console.error("Failed to fetch GR details");
        setGrDetails(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [grNumber]);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        name: grDetails?.name,
        grNumber: data?.grNumber,
        email: data?.email,
        referee: data?.referee.value,
        class: grDetails?.designation + " " + grDetails?.division,
      };
      if (data?.refereeName) {
        formData.refereeName = data?.refereeName;
      }
      const user = await addForm(formData);
      setSessionId(user.data._id);
      navigate(`/book`);
      reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    reset();
  };
  const handleBookedBy = (selectedOption) => {
    setType(selectedOption.value);
  };
  console.log("grDetails", grDetails);

  return (
    <Grid
      container
      height="100vh"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {" "}
      <Grid
        item
        md={12}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {" "}
        <img src={logo} width={"80x"} height={"80px"} objectFit="fill" />
        <Typography
          variant="h2"
          fontWeight={600}
          color={"#fff"}
          textAlign={"center"}
        >
          Welcome to the ABLE Team's Workspace
        </Typography>
      </Grid>
      {/* <Grid
        item
        md={6}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack paddingLeft={5}>
          {" "}
          <img src={logo} width={"300x"} height={"80px"} objectFit="fill" />
          <Stack justifyContent={"center"}>
            {" "}
            <img
              src={bg}
              width="100%"
              height="100%"
              style={{ objectFit: "contain" }}
            />
          </Stack>
        </Stack>
      </Grid> */}
      <Grid item md={6}>
        <Card
          sx={{
            p: 4,
            maxWidth: "900px",
            width: "100%",
            boxShadow: 3,
            // height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight={800}
              textAlign="center"
              mb={5}
              color="primary.main"
            >
              To talk to the Counselor, book an appointment here
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                {" "}
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" fontWeight={500} mb={1}>
                    GR Number
                  </Typography>
                  <Controller
                    name="grNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <StyledInput {...field} />}
                  />
                </Grid>
                <>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" fontWeight={500} mb={1}>
                      Enter Student Name
                    </Typography>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          disabled={grDetails === null}
                          value={grDetails ? grDetails.name : ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" fontWeight={500} mb={1}>
                      Class and Section
                    </Typography>
                    <Controller
                      name="class"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <StyledInput
                          disabled={grDetails === null}
                          {...field}
                          value={
                            grDetails
                              ? grDetails.designation + " " + grDetails.division
                              : ""
                          }
                        />
                      )}
                    />
                  </Grid>{" "}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" fontWeight={500} mb={1}>
                      Email
                    </Typography>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => <StyledInput {...field} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" fontWeight={500} mb={1}>
                      Booked By
                    </Typography>
                    <Controller
                      name="referee"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <StyledSelectField
                          options={options}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleBookedBy(e);
                          }}
                        />
                      )}
                    />
                  </Grid>
                  {type === "parent" && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" fontWeight={500} mb={1}>
                        Parent Name
                      </Typography>
                      <Controller
                        name="refereeName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <StyledInput {...field} />}
                      />
                    </Grid>
                  )}
                  {type === "teacher" && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" fontWeight={500} mb={1}>
                        Teacher Name
                      </Typography>
                      <Controller
                        name="refereeName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <StyledInput {...field} />}
                      />
                    </Grid>
                  )}
                </>
              </Grid>

              <Stack
                spacing={2}
                mt={8}
                direction={"row"}
                justifyContent={"flex-end"}
              >
                <StyledButton
                  name={
                    <>
                      {" "}
                      Next
                      <KeyboardDoubleArrowRightIcon />
                    </>
                  }
                  variant="form"
                  type="submit"
                  disabled={loading}
                />{" "}
                <StyledButton
                  name="Clear"
                  variant="formClear"
                  disabled={loading}
                  onClick={(event) => handleClear(event)}
                />
              </Stack>
            </form>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
