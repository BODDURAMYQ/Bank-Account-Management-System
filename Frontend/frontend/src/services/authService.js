import api from './api';

const AUTH_PATH = '/auth';

export const login = async (email, password) => {
  try {
    const response = await api.post(`${AUTH_PATH}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post(`${AUTH_PATH}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    throw error;
  }
};
