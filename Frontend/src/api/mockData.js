// Mock data for Trackify standalone mode
export const MOCK_USER = {
  id: 'mock-user-123',
  name: 'Sahil Chaudhari',
  email: 'sahil@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sahil'
};

export const MOCK_TRANSACTIONS = [
  {
    _id: '1',
    amount: 1200,
    type: 'expense',
    category: 'Food',
    merchant: 'Zomato',
    date: new Date().toISOString(),
    description: 'Dinner with friends'
  },
  {
    _id: '2',
    amount: 45000,
    type: 'income',
    category: 'Salary',
    merchant: 'Tech Corp',
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    description: 'Monthly Salary'
  },
  {
    _id: '3',
    amount: 800,
    type: 'expense',
    category: 'Transport',
    merchant: 'Uber',
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    description: 'Office commute'
  },
  {
    _id: '4',
    amount: 2500,
    type: 'expense',
    category: 'Shopping',
    merchant: 'Amazon',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    description: 'Books'
  }
];

export const MOCK_BUDGETS = [
  { _id: 'b1', category: 'Food', limit: 5000, spent: 1200 },
  { _id: 'b2', category: 'Transport', limit: 3000, spent: 800 },
  { _id: 'b3', category: 'Shopping', limit: 10000, spent: 2500 }
];

export const getLocalStorageData = (key, defaultValue) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Initialize localStorage with mock data if empty
if (!localStorage.getItem('transactions')) {
  setLocalStorageData('transactions', MOCK_TRANSACTIONS);
}
if (!localStorage.getItem('budgets')) {
  setLocalStorageData('budgets', MOCK_BUDGETS);
}
if (!localStorage.getItem('user')) {
  setLocalStorageData('user', MOCK_USER);
}
