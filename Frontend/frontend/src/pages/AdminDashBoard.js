import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashBoard() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accountsRes = await axios.get(
        'http://localhost:5000/api/accounts'
      );

      const transactionsRes = await axios.get(
        'http://localhost:5000/api/transactions'
      );

      setAccounts(accountsRes.data);
      setTransactions(transactionsRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );

  return (
  <div className="container py-4">

    <h2 className="mb-4 fw-bold">Admin Dashboard</h2>

    {/* TOP CARDS */}
    <div className="row g-4 mb-4">

      <div className="col-md-4">
        <div className="card p-4 text-center dashboard-card">
          <h5>Total Accounts</h5>
          <h2 className="text-primary">{accounts.length}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-4 text-center dashboard-card">
          <h5>Total Transactions</h5>
          <h2 className="text-success">{transactions.length}</h2>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-4 text-center dashboard-card">
          <h5>Total Balance</h5>
          <h2 className="text-warning">₹ {totalBalance}</h2>
        </div>
      </div>

    </div>

    {/* TABLE SECTION */}
    <div className="card shadow-sm p-3">

      <h5 className="mb-3">Accounts List</h5>

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead className="table-dark">
            <tr>
              <th>Account Number</th>
              <th>Account Holder</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => (
              <tr key={account._id}>
                <td>{account.accountNumber}</td>
                <td>{account.accountHolderName}</td>
                <td>₹ {account.balance}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>

  </div>
);
}

export default AdminDashBoard;