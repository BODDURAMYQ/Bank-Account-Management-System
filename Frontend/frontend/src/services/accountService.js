import api from './api';

export const getAccountById = (id) => api.get(`/accounts/${id}`);

export const getAccounts = () => api.get('/accounts');

export const createAccount = (payload) => api.post('/accounts', payload);

const accountService = { getAccountById, getAccounts, createAccount };

export default accountService;
