import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAccountById } from '../services/accountService';
import transactionService from '../services/transactionService';

function Deposit() {
  const location = useLocation();
  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    storedUser = null;
  }
  const [accountId, setAccountId] = useState(
    location.state?.accountId || storedUser?.accountId || localStorage.getItem('accountId') || ''
  );
  const [amount, setAmount] = useState(location.state?.amount || '');

  const handleDeposit = async () => {
    const effectiveAccountId = accountId || storedUser?.accountId || localStorage.getItem('accountId') || '';
    if (!effectiveAccountId) {
      alert('Please provide an Account ID');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      // verify account exists before creating transaction
      const checkRes = await getAccountById(effectiveAccountId).catch(err => err.response);
      if (!checkRes || checkRes.status === 404) {
        alert('Account not found');
        return;
      }

      const response = await transactionService.createTransaction({
        accountId: effectiveAccountId,
        transactionType: 'Deposit',
        amount: Number(amount)
      });

      alert('Deposit Successful');
      console.log(response.data);

      const accountResponse = await getAccountById(effectiveAccountId);

      localStorage.setItem('accountId', effectiveAccountId);
      localStorage.setItem('accountBalance', accountResponse.data.balance);
      const latestStoredUser = JSON.parse(localStorage.getItem('user'));
      if (latestStoredUser) {
        localStorage.setItem(
          'user',
          JSON.stringify({ ...latestStoredUser, balance: accountResponse.data.balance })
        );
      }

      setAmount('');
      alert(`Updated balance: Rs. ${accountResponse.data.balance}`);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              Deposit Money
            </div>
            <div className="card-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Account ID"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                disabled={!!storedUser?.accountId}
              />
              {storedUser?.accountId ? (
                <div className="form-text mb-3">Using your account: {storedUser.accountNumber || storedUser.accountId}</div>
              ) : (
                <div className="form-text mb-3">Enter your Account ID or leave blank to use the account on file.</div>
              )}
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="btn btn-success w-100"
                onClick={handleDeposit}
              >
                Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
