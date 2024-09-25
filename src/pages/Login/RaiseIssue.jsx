import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import image from "../../assets/images/logo.jpg";

function RaiseIssuePage() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showNotification, setShowNotification] = useState(false);

  const onSubmit = (data) => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showNotification && (
  <Box
    sx={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'primary.main',
      color: 'white',
      padding: '15px 30px',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease-out',
      '@keyframes fadeIn': {
        from: { opacity: 0, transform: 'translate(-50%, -20px)' },
        to: { opacity: 1, transform: 'translate(-50%, 0)' },
      },
      minWidth: '200px',
      textAlign: 'center',
    }}
  >
    Issue Submitted Sucessfully!
  </Box>
)}
      
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2"  sx={{ mb: 3 }}>
            Raise an Issue
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  autoComplete="name"
                  autoFocus
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Issue Description"
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: '20px',
        
              }}
            >
              Submit Issue
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link to="/" variant="body2">
                Back to Login
              </Link>
            </Box>
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
        <Box sx={{margin:4}}>
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

export default RaiseIssuePage;