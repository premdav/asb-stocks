import React from 'react';
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAppSelector } from './Redux/hooks';
import type { RootState } from './Redux/store';


const RequireAuth = () => {
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth);
  const location = useLocation();
  
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
};

const Login = () => {
  return (
    <div>LOGIN PAGE</div>
  );
};

const Dashboard = () => {
  return (
    <div>dashboard</div>
  );
};

const App = () => {
  return (
    <div className="App">
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
