import api from "./api";

const AUTH_PATH = "/auth";
const TXN_PATH = "/transactions";

// ✅ Login user
export const login = async (email, password) => {
  try {
    const response = await api.post(`${AUTH_PATH}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Register new user
export const register = async (name, email, password) => {
  try {
    const response = await api.post(`${AUTH_PATH}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch transactions for the logged-in user
export const getTransactions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(TXN_PATH, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Transaction fetch error:", error.response?.data || error.message);
    throw error;
  }
};
