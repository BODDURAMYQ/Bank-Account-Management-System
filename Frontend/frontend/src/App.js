import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
//import Register from './pages/Register';
import UserDashBoard from './pages/UserDashBoard';
import AdminDashBoard from './pages/AdminDashBoard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transaction from './pages/Transaction';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="main-content">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          

            {/* Protected User Route */}
            <Route
              path="/user-dashboard"
              element={
                <PrivateRoute role="user">
                  <UserDashBoard />
                </PrivateRoute>
              }
            />

            {/* Protected Admin Route */}
            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute role="admin">
                  <AdminDashBoard />
                </PrivateRoute>
              }
            />

            {/* User Functional Routes (optional protection) */}
            <Route
              path="/deposit"
              element={
                <PrivateRoute role="user">
                  <Deposit />
                </PrivateRoute>
              }
            />

            <Route
              path="/withdraw"
              element={
                <PrivateRoute role="user">
                  <Withdraw />
                </PrivateRoute>
              }
            />

            <Route
              path="/transfer"
              element={
                <PrivateRoute role="user">
                  <Transaction />
                </PrivateRoute>
              }
            />

          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;