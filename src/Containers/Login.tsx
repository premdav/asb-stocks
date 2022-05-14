import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '../Redux/hooks';
import { authSliceActions } from '../Redux/slices/authSlice';

interface LoginData {
  username: string,
  password: string,
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [missing, setMissing] = useState<{
    username: boolean, password: boolean,
  }>({ username: false, password: false });

  const validateLogin = ({ username, password }: LoginData): boolean => {
    let usernameMissing = false, passwordMissing = false;
    if (!username.length) usernameMissing = true;
    if (!password.length) passwordMissing = true;
    setMissing({ username: usernameMissing, password: passwordMissing });
    return !(usernameMissing || passwordMissing);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { username, password }: LoginData = Object.fromEntries(data.entries()) as unknown as LoginData;
    if (validateLogin({ username, password})) {
      dispatch(authSliceActions.setUsername(username));
      dispatch(authSliceActions.setIsLoggedIn(true));
      navigate('/dashboard', { replace: true });
    }
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'white',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error={missing.username}
                helperText='Username is required'
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={missing.password}
                helperText='Password is required'
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
};

export default Login;