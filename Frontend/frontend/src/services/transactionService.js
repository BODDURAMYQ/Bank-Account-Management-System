import api from './api';

export const getTransactionHistory = (userId) => {
  // backend currently exposes /transactions, filter client-side by account or user
  return api.get('/transactions');
};

export const createTransaction = (payload) => {
  return api.post('/transactions', payload);
};

const transactionService = { getTransactionHistory, createTransaction };

export default transactionService;
