import React from 'react';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useAppSelector } from './Redux/hooks';
import type { RootState } from './Redux/store';
import Login from './Containers/Login';


const RequireAuth = () => {
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();
  
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
};


const Dashboard = () => {
  return (
    <div>dashboard</div>
  );
};

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
            <Route path="" element={<Dashboard />} />
            <Route path="/">
              <Route path="dashboard" element={<Dashboard />} />
              {/* <Route path="details" element={<Details />} /> */}
            </Route>
        </Route>
        <Route path="*" element={<>Nothing here yet!</>} />
      </Routes>
    </div>
  );
}

export default App;
