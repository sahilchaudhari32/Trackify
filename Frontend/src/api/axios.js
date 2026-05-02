import axios from 'axios';
import * as mock from './mockData';

// Set this to true to disconnect from the backend and use local mock data
const IS_DISCONNECTED = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Intercept requests for standalone mode
api.interceptors.request.use(async (config) => {
  if (IS_DISCONNECTED) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const transactions = mock.getLocalStorageData('transactions', mock.MOCK_TRANSACTIONS);
    const budgets = mock.getLocalStorageData('budgets', mock.MOCK_BUDGETS);

    // Mock responses based on URL
    let mockResponse = null;

    if (config.url === '/summary') {
      const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      
      const categories = [...new Set(transactions.map(t => t.category))];
      const categoryBreakdown = categories.map(cat => ({
        category: cat,
        amount: transactions.filter(t => t.category === cat && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
      })).sort((a, b) => b.amount - a.amount);

      mockResponse = {
        balance: totalIncome - totalExpense,
        totalIncome,
        totalExpense,
        categoryBreakdown
      };
    } else if (config.url === '/transactions') {
      if (config.method === 'get') {
        mockResponse = transactions;
      } else if (config.method === 'post') {
        const newTransaction = { ...config.data, _id: Date.now().toString(), date: new Date().toISOString() };
        const updated = [newTransaction, ...transactions];
        mock.setLocalStorageData('transactions', updated);
        mockResponse = newTransaction;
      }
    } else if (config.url === '/budgets') {
      mockResponse = budgets;
    } else if (config.url === '/analytics/spending-overview') {
      // Return simple categories breakdown
      const categories = [...new Set(transactions.map(t => t.category))];
      mockResponse = categories.map(cat => ({
        name: cat,
        value: transactions.filter(t => t.category === cat && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
      }));
    } else if (config.url === '/auth/login') {
      mockResponse = {
        token: 'mock-token-456',
        _id: mock.MOCK_USER.id,
        name: mock.MOCK_USER.name,
        email: mock.MOCK_USER.email
      };
    } else if (config.url === '/auth/signup') {
      mockResponse = {
        token: 'mock-token-456',
        _id: 'new-user-id',
        name: config.data.name,
        email: config.data.email
      };
    }

    if (mockResponse) {
      // Throw a custom object that axios-mock-adapter or our custom logic can handle
      // But since we are not using an adapter, we can return a "fake" successful response
      config.adapter = (config) => {
        return Promise.resolve({
          data: { data: mockResponse },
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      };
    }
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data?.data ?? response.data,
  (error) => {
    if (IS_DISCONNECTED) return Promise.reject(error); // Should not happen with mock adapter

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

