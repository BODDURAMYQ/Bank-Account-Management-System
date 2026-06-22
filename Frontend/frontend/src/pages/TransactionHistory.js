import React, { useEffect, useState } from "react";
import transactionService from "../services/transactionService";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await transactionService.getTransactionHistory();
        const accountId = localStorage.getItem('accountId');
        // filter by account on client-side
        const txns = (res.data || []).filter(txn => {
          const txnAccountId = txn.accountId?._id || txn.accountId;
          return accountId ? txnAccountId === accountId : true;
        });
        setTransactions(txns);
      } catch (err) {
        setError("Failed to load transaction history");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <h4 className="text-center mt-4">Loading...</h4>;
  if (error) return <h4 className="text-center text-danger mt-4">{error}</h4>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Transaction History</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((txn, index) => (
              <tr key={txn._id || index}>
                <td>{index + 1}</td>
                <td>{txn.transactionType}</td>
                <td>₹ {txn.amount}</td>
                <td>
                  {txn.createdAt
                    ? new Date(txn.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  <span
                    className={
                      txn.status === "Success"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {txn.status || "Completed"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionHistory;