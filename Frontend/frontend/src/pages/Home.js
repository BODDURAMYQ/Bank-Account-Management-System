import React, { useState } from "react";
import { register } from '../services/authService';

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData.name, formData.email, formData.password);
      alert(res.message || 'Registration successful');

      const userData = {
        _id: res._id,
        name: res.name,
        email: res.email,
        role: res.role || 'user',
        token: res.token,
        accountId: res.accountId,
        accountNumber: res.accountNumber,
        balance: res.balance ?? 0,
      };

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("user", JSON.stringify(userData));

      if (res.accountId) {
        localStorage.setItem("accountId", res.accountId);
      }

      localStorage.setItem("accountBalance", res.balance ?? 0);
      window.location.href = "/user-dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
  <div className="container mt-4">

    {/* Hero Section */}
    <div className="hero-section text-center shadow-lg">
      <i className="bi bi-bank display-1"></i>

      <h1 className="mt-3">
        Bank Account Management System
      </h1>

      <p className="lead">
        Secure Banking, Easy Deposits, Fast Withdrawals and Transaction Tracking
      </p>

      {!user && (
        <a href="/login" className="btn btn-light btn-lg mt-3">
          <i className="bi bi-box-arrow-in-right me-2"></i>
          Login
        </a>
      )}
    </div>

    {/* Feature Cards */}
    <div className="row mt-5">

      <div className="col-md-4 mb-3">
        <div className="card dashboard-card text-center p-4">
          <i className="bi bi-shield-lock-fill text-primary display-4"></i>
          <h4 className="mt-3">Secure Banking</h4>
          <p>Your account is protected with authentication and secure access.</p>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card dashboard-card text-center p-4">
          <i className="bi bi-cash-stack text-success display-4"></i>
          <h4 className="mt-3">Easy Deposits</h4>
          <p>Deposit money instantly and keep track of your balance.</p>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card dashboard-card text-center p-4">
          <i className="bi bi-arrow-left-right text-info display-4"></i>
          <h4 className="mt-3">Fast Transactions</h4>
          <p>Withdraw and transfer money with complete transaction history.</p>
        </div>
      </div>

    </div>

    {user ? (
      <div className="card shadow-lg mt-5 p-4 text-center">
        <h3>
          Welcome, {user.name}
        </h3>

        <h4 className="text-success">
          Balance: ₹ {user.balance ?? 0}
        </h4>

        <a
          href="/user-dashboard"
          className="btn btn-primary mt-3"
        >
          Go To Dashboard
        </a>
      </div>
    ) : (
      <div className="row justify-content-center mt-5">

        <div className="col-md-6">

          <div className="card shadow-lg">

            <div className="card-header bg-primary text-white">
              <h3 className="mb-0 text-center">
                <i className="bi bi-person-plus-fill me-2"></i>
                Create Account
              </h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3 text-start">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3 text-start">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3 text-start">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Register Now
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    )}

  </div>
);
}
export default Home;