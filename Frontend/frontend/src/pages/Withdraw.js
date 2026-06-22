import React, { useState } from 'react';
import transactionService from '../services/transactionService';
import { getAccountById } from '../services/accountService';
import { useNavigate } from 'react-router-dom';

function Withdraw() {
  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    storedUser = null;
  }
  const [accountId, setAccountId] = useState(storedUser?.accountId || localStorage.getItem('accountId') || '');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleWithdraw = async () => {
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
      const response = await transactionService.createTransaction({
        accountId: effectiveAccountId,
        transactionType: 'Withdraw',
        amount: Number(amount)
      });

      alert('Withdrawal Successful');
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
      navigate('/user-dashboard');
    } catch (error) {
      alert(
        error.response?.data?.message || 'Withdrawal Failed'
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-header bg-danger text-white">
              Withdraw Money
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
              {storedUser?.accountId && (
                <div className="form-text mb-3">Using your account: {storedUser.accountNumber || storedUser.accountId}</div>
              )}

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button
                className="btn btn-danger w-100"
                onClick={handleWithdraw}
              >
                Withdraw
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Withdraw;
