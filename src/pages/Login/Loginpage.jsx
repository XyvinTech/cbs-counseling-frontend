import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  List,
  CircularProgress,
} from "@mui/material";
import image from "../../assets/images/logo.jpg";

import { useForm, Controller } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { getLogin } from "../../api/admin/adminapi";

function LoginPage() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const user = await getLogin(data);
      // console.log(user.data);
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

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" sx={{ mb: 3 }}>
            Log 
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                borderRadius: "20px",
              }}
            >
               {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} /> 
              ) : (
                "Sign In"
              )}
            </Button>
          </Box>
          <Box sx={{ textAlign: "right", mt: 1, mb: 2 }}>
            <Link to="/raiseissue" variant="body2">
              Not able to Login, Contact admin
            </Link>
          </Box>
        </Box>
      </Container>
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
    </Box>
  );
}

export default LoginPage;
