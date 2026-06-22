import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    user = null;
  }

  const rawRole =
    localStorage.getItem('role') ||
    (user && (user.role || user.data?.role || user.user?.role));

  const role = rawRole === 'customer' ? 'user' : rawRole;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('accountId');
    localStorage.removeItem('accountBalance');
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background: 'linear-gradient(90deg, #0d6efd, #0dcaf0)'
      }}
    >
      <div className="container">

        <Link className="navbar-brand fw-bold fs-4" to="/">
          🏦 Bank Management System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-center gap-2">

            <li className="nav-item">
              <Link className="nav-link nav-btn home-btn" to="/">
                <i className="bi bi-house-fill me-1"></i>
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link nav-btn dashboard-btn"
                    to="/user-dashboard"
                  >
                    <i className="bi bi-speedometer2 me-1"></i>
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link nav-btn deposit-btn"
                    to="/deposit"
                  >
                    <i className="bi bi-cash-stack me-1"></i>
                    Deposit
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link nav-btn withdraw-btn"
                    to="/withdraw"
                  >
                    <i className="bi bi-wallet2 me-1"></i>
                    Withdraw
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link nav-btn transfer-btn"
                    to="/transfer"
                  >
                    <i className="bi bi-arrow-left-right me-1"></i>
                    Transfer
                  </Link>
                </li>

                {(role === 'admin' || user?.isAdmin) && (
                  <li className="nav-item">
                    <Link
                      className="nav-link nav-btn admin-btn"
                      to="/admin-dashboard"
                    >
                      <i className="bi bi-shield-lock-fill me-1"></i>
                      Admin
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <span className="badge bg-warning text-dark fs-6 p-2">
                    👋 {user.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn logout-btn ms-2"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link nav-btn login-btn"
                    to="/login"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link nav-btn register-btn"
                    href="/#register"
                  >
                    <i className="bi bi-person-plus-fill me-1"></i>
                    Register
                  </a>
                </li>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;