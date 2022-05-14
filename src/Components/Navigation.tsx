import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { authSliceActions } from '../Redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const { username } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box component='nav' sx={{ flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar sx={{ justifyContent: 'space-between'}}>
          { username.length ?
            (<Typography variant="h6" component="div">
              Hello, {username}
            </Typography>) : null
            }
          <Button
          color="inherit"
          onClick={() => {
            dispatch(authSliceActions.setIsLoggedIn(false));
            dispatch(authSliceActions.setUsername(''));
            navigate('/')
          }}
          >Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;