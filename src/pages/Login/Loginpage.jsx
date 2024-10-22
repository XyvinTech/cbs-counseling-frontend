import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";
import image from "../../assets/images/logo.jpg";
import { useForm, Controller } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { getLogin, sendOtp, verifyOtp } from "../../api/admin/adminapi";
import { ArrowBack } from "@mui/icons-material";

function LoginPage() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [open, setOpen] = useState(false);
  const [succes, setSucces] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const user = await getLogin(data);
      localStorage.setItem("userType", user.data.userType);
      localStorage.setItem("token", user.data.token);

      if (user?.data.userType) {
        switch (user?.data.userType) {
          case "admin":
            navigate("/dashboard");
            break;
          case "counsellor":
            navigate("/counselor/session");
            break;
          case "student":
            navigate("/student/bookappoinment");
            break;
          default:
            navigate("/");
            break;
        }
      }
      reset();
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    const email = getValues("email");
    if (!email) {
      console.error("Email is required to send OTP");
      return;
    }

    try {
      setOtpLoading(true);
      const response = await sendOtp({ email });

      if (response) {
        setSucces(true);
      }
    } catch (error) {
      console.error("Error sending OTP", error);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (data) => {
    const otp = data.otp;
    const password = data.password;
    const email = data.email;

    try {
      setVerify(true);
      const response = await verifyOtp({ otp, password, email });
      if (response) {
        setSucces(false);
        setOpen(false);
        navigate("/");
        reset();
      }
    } catch (error) {
      console.error("Error verifying OTP", error);
    } finally {
      setVerify(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("userType") === "admin") {
        navigate("/dashboard");
      }
      if (localStorage.getItem("userType") === "counsellor") {
        navigate("/counselor/session");
      }
      if (localStorage.getItem("userType") === "student") {
        navigate("/student/bookappoinment");
      }
    }
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {open && !succes ? (
          <Container maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h2" sx={{ mb: 3 }}>
                Log In
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ width: "100%" }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      autoFocus
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      {...field}
                    />
                  )}
                />
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  width={"100%"}
                >
                  <Button
                    variant="outlined"
                    onClick={handleSendOtp}
                    sx={{
                      mt: 2,
                      mb: 2,
                      borderRadius: "20px",
                      width: "50%",
                    }}
                  >
                    {otpLoading ? (
                      <CircularProgress size={24} sx={{ color: "#fff" }} />
                    ) : (
                      "Send Otp"
                    )}
                  </Button>{" "}
                  <Typography
                    variant="body2"
                    onClick={() => setOpen(false)}
                    sx={{
                      width: "50%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "blue",
                      mt: 2,
                      mb: 1,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <ArrowBack sx={{ mr: 1 }} /> Back to Login
                  </Typography>
                </Stack>{" "}
              </Box>
            </Box>
          </Container>
        ) : succes ? (
          <Container maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h2" sx={{ mb: 3 }}>
                Verify OTP
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(handleVerifyOtp)}
                noValidate
                sx={{ width: "100%" }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      autoFocus
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="otp"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Otp is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="otp"
                      label="Otp"
                      autoComplete="otp"
                      autoFocus
                      error={!!errors.otp}
                      helperText={errors.otp?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      {...field}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{
                      mt: 2,
                      mb: 2,
                      borderRadius: "20px",
                    }}
                  >
                    {verify ? (
                      <CircularProgress size={24} sx={{ color: "#fff" }} />
                    ) : (
                      "Verify Otp"
                    )}
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Container>
        ) : (
          <Container maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h2" sx={{ mb: 3 }}>
                Log In
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ width: "100%" }}
              >
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email or GRP Number is required",
                  }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Enter Email or GRP Number"
                      autoFocus
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      {...field}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: "100%" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      mb: 2,
                      borderRadius: "20px",
                      width: "50%",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "#fff" }} />
                    ) : (
                      "Log In"
                    )}
                  </Button>

                  <Box
                    onClick={handleClickOpen}
                    sx={{ width: "50%", textAlign: "center" }}
                  >
                    <Typography
                      variant="body2"
                      color={"primary"}
                      sx={{
                        cursor: "pointer",
                        color: "blue",

                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Forget Password
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Container>
        )}
      </Box>{" "}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Box sx={{ margin: 4 }}>
          <div style={{ marginBottom: "8px" }}>
            <Typography variant="h7" color={"#B4B5B6"} sx={{ ml: 1 }}>
              Powered by
            </Typography>
          </div>
          <div>
            <img src={image} alt="Powered by" style={{ maxWidth: "200px" }} />
          </div>
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
