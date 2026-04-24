import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<><Header /><div className="main-content"><Dashboard /></div></>} />
          <Route path="/transactions" element={<><Header /><div className="main-content"><Transactions /></div></>} />
          <Route path="/budgets" element={<><Header /><div className="main-content"><Budgets /></div></>} />
          <Route path="/analytics" element={<><Header /><div className="main-content"><Analytics /></div></>} />
          <Route path="/settings" element={<><Header /><div className="main-content"><Settings /></div></>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



