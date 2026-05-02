import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Header from './components/Header';

// Lazy loaded pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Budgets = lazy(() => import('./pages/Budgets'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

import './App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen w-full bg-[#0c0d0e]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-root">
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1a1b1e',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }} />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Header /><div className="main-content"><Dashboard /></div>
              </ProtectedRoute>
            } />
            <Route path="/transactions" element={
              <ProtectedRoute>
                <Header /><div className="main-content"><Transactions /></div>
              </ProtectedRoute>
            } />
            <Route path="/budgets" element={
              <ProtectedRoute>
                <Header /><div className="main-content"><Budgets /></div>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Header /><div className="main-content"><Analytics /></div>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Header /><div className="main-content"><Settings /></div>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;


