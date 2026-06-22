import React, { useState } from 'react';
import api from '../services/api';

function Transaction() {
  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    storedUser = null;
  }
  const [fromAccountId, setFromAccountId] = useState(storedUser?.accountId || localStorage.getItem('accountId') || '');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = async () => {
    if (!fromAccountId || !toAccountId) {
      alert('Please provide sender and receiver account IDs');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const response = await api.post(
        '/accounts/transfer',
        {
          fromAccountId,
          toAccountId,
          amount: Number(amount)
        }
      );

      alert(response.data.message);

      setAmount('');
      setToAccountId('');
    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Transfer Failed'
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">

        <div className="card-header bg-warning">
          <h4>Transfer Money</h4>
        </div>

        <div className="card-body">

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Sender Account ID"
            value={fromAccountId}
            onChange={(e) =>
              setFromAccountId(e.target.value)
            }
            disabled={!!storedUser?.accountId}
          />
          {storedUser?.accountId && (
            <div className="form-text mb-3">Using your account: {storedUser.accountNumber || storedUser.accountId}</div>
          )}

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Receiver Account ID"
            value={toAccountId}
            onChange={(e) =>
              setToAccountId(e.target.value)
            }
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <button
            className="btn btn-warning w-100"
            onClick={handleTransfer}
          >
            Transfer Money
          </button>

        </div>

      </div>
    </div>
  );
}

export default Transaction;
