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
import { useAppDispatch } from '../../Redux/hooks';
import { authSliceActions } from '../../Redux/slices/authSlice';


const Dashboard = () => {
  const dispatch = useAppDispatch();

  return (
      <Box className='content'>
        Dashboard
      </Box>
  );
};

export default Dashboard;