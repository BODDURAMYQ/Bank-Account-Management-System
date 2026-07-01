import React, { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    return null;
  }
};

function UserDashBoard() {
  const [user, setUser] = useState(getStoredUser);
  const [accountId, setAccountId] = useState(localStorage.getItem('accountId') || user?.accountId || '');
  const [balance, setBalance] = useState(Number(localStorage.getItem('accountBalance') || user?.balance || 0));
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [prevUserId, setPrevUserId] = useState(user?._id || '');

  const loadDashboard = useCallback(async () => {
    const effectiveAccountId = accountId || user?.accountId || localStorage.getItem('accountId') || '';

    if (!effectiveAccountId) {
      setLoading(false);
      setError('No account associated. Please register or login again.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const accountResponse = await api.get(`/accounts/${effectiveAccountId}`);
      const accountData = accountResponse.data;

      setAccountId(effectiveAccountId);
      setBalance(accountData.balance);
      localStorage.setItem('accountId', effectiveAccountId);
      localStorage.setItem('accountBalance', accountData.balance);

      setUser((currentUser) => {
        if (!currentUser) return currentUser;
        const updatedUser = { ...currentUser, accountId: effectiveAccountId, balance: accountData.balance };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      });

      // ✅ Fetch transactions
      const transactionResponse = await api.get('/transactions');
      const accountTransactions = transactionResponse.data.filter((txn) => {
        const txnAccountId = txn.accountId?._id || txn.accountId;
        return txnAccountId === effectiveAccountId;
      });

      setTransactions(accountTransactions);

      const deposits = accountTransactions
        .filter((txn) => txn.transactionType === 'Deposit')
        .reduce((sum, txn) => sum + Number(txn.amount), 0);

      const withdrawals = accountTransactions
        .filter((txn) => txn.transactionType === 'Withdraw')
        .reduce((sum, txn) => sum + Number(txn.amount), 0);

      setTotalDeposits(deposits);
      setTotalWithdrawals(withdrawals);
    } catch (err) {
      console.error('Dashboard load error:', err);
      setError('Unable to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [accountId, user?.accountId]);

  useEffect(() => {
    const currentUserId = user?._id || '';
    if (currentUserId !== prevUserId) {
      setAccountId(user?.accountId || '');
      setBalance(Number(user?.balance || 0));
      setTotalDeposits(0);
      setTotalWithdrawals(0);
      setPrevUserId(currentUserId);
    }
  }, [user?._id, user?.accountId, user?.balance, prevUserId]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0">Welcome, {user?.name}</h2>
        <button className="btn btn-outline-primary" onClick={loadDashboard}>
          Refresh
        </button>
      </div>

      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : error ? (
        <div className="alert alert-info text-center" role="alert">
          <h4>{error}</h4>
          <p>Logout and login again if your account details are missing.</p>
        </div>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Account Balance</h5>
                  <h3>Rs. {balance}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Total Deposits</h5>
                  <h3>Rs. {totalDeposits}</h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body text-center">
                  <h5>Total Withdrawals</h5>
                  <h3>Rs. {totalWithdrawals}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Transaction History Table */}
          <div className="card shadow mt-4">
            <div className="card-body">
              <h5 className="text-secondary">Transaction History</h5>
              {transactions.length > 0 ? (
                <table className="table table-striped mt-2">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn, index) => (
                      <tr key={index}>
                        <td>{txn.date ? new Date(txn.date).toLocaleString() : '-'}</td>
                        <td>{txn.transactionType}</td>
                        <td>Rs. {txn.amount}</td>
                        <td>{txn.status || 'Success'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">No transactions found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDashBoard;
