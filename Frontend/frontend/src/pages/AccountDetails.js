import React, { useState } from 'react';
import axios from 'axios';

function AccountDetails() {
  const [accountId, setAccountId] = useState('');
  const [account, setAccount] = useState(null);

  const getAccountDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/accounts/${accountId}`
      );

      setAccount(response.data);
    } catch (error) {
      alert('Account Not Found');
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">

        <div className="card-header bg-info text-white">
          Account Details
        </div>

        <div className="card-body">

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />

          <button
            className="btn btn-info text-white mb-3"
            onClick={getAccountDetails}
          >
            Get Details
          </button>

          {account && (
            <div className="mt-3">

              <h5>Account Information</h5>
              <hr />

              <p>
                <strong>Account Number:</strong>{' '}
                {account.accountNumber}
              </p>

              <p>
                <strong>Account Holder:</strong>{' '}
                {account.accountHolderName}
              </p>

              <p>
                <strong>Balance:</strong> ₹
                {account.balance}
              </p>

              <p>
                <strong>Created At:</strong>{' '}
                {new Date(
                  account.createdAt
                ).toLocaleDateString()}
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AccountDetails;