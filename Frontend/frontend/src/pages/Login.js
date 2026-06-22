import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      const data = await login(email, password);

      localStorage.setItem('token', data.token);

      // Normalize role: backend uses 'customer' by default
      const rawRole = data.role || (data.user && data.user.role) || 'customer';
      const role = rawRole === 'customer' ? 'user' : rawRole;
      localStorage.setItem('role', role);

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role,
        token: data.token,
        accountId: data.accountId,
        accountNumber: data.accountNumber,
        balance: data.balance ?? 0,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      if (data.accountId) {
        localStorage.setItem('accountId', data.accountId);
      }
      localStorage.setItem('accountBalance', data.balance ?? 0);


      alert('Login Successful');

      if (role === 'admin') navigate('/admin-dashboard');
      else navigate('/user-dashboard');
    } catch (error) {
      const msg = error?.response?.data?.message || 'Invalid Email or Password';
      alert(msg);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow-lg">

            <div className="card-header bg-primary text-white text-center">
              <h3>Login</h3>
            </div>

            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Login
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
