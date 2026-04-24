import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft, Shield, Eye, AtSign, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      {/* Left Side - Brand & Hero */}
      <div className="login-left">
        <div className="brand-logo">
          <img src="https://www.image2url.com/r2/default/images/1776834249896-92b9b25d-757c-478a-99f8-2c6279cdb58e.png" alt="Trackify Logo" className="brand-icon" />
          <span>Trackify</span>
        </div>

        <div className="hero-text">
          <h1>Take control of your money.</h1>
          <p>The precision-grade wealth platform for data-literate professionals.</p>
        </div>

        {/* Stats Card */}
        <motion.div 
          className="login-stats-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="stats-card-label">TOTAL NET WORTH</div>
          <div className="stats-card-main">
            <h2>₹4,82,950</h2>
            <div className="growth-tag">
              <TrendingUp size={12} /> +12.4%
            </div>
          </div>

          <div className="stats-chart">
            {[40, 60, 50, 70, 65, 90, 80].map((h, i) => (
              <motion.div 
                key={i} 
                className={`chart-bar ${i === 5 ? 'active' : ''}`}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
              />
            ))}
          </div>

          <div className="stats-footer-row">
            <div className="footer-stat-item">
              <span>Growth</span>
              <span className="stat-green">+12.4%</span>
            </div>
            <div className="footer-stat-item">
              <span>Income</span>
              <span>₹1,24,000</span>
            </div>
            <div className="footer-stat-item">
              <span>Expenses</span>
              <span>₹42,300</span>
            </div>
          </div>
        </motion.div>

        <div className="left-security-footer">
          <div className="security-item">
            <Shield size={14} className="stat-green" /> Bank-level security
          </div>
          <span>•</span>
          <div className="security-item">
            <Lock size={14} className="stat-green" /> Encrypted financial data
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="login-right">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="form-header">
            <h2>Welcome back</h2>
            <p>Please enter your details to access your account.</p>
          </div>

          <div className="tabs-container">
            <div className="tab active">Login</div>
            <Link to="/signup" className="tab">Sign Up</Link>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <AtSign className="input-icon" size={18} />
                <input type="email" placeholder="name@company.com" required />
              </div>
            </div>

            <div className="input-group">
              <div className="label-row">
                <label>Password</label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input type="password" placeholder="••••••••" required />
                <Eye className="input-icon-right" size={18} />
              </div>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me logged in for 30 days</label>
            </div>

            <button type="submit" className="btn-login-main">
              Login to Dashboard
            </button>
          </form>

          <div className="divider-container">
            <span className="divider-text">OR CONTINUE WITH</span>
          </div>

          <button className="btn-google">
            <img src="https://www.google.com/favicon.ico" alt="Google" width="16" height="16" />
            Continue with Google
          </button>

          <div className="form-footer">
            Don't have an account? <Link to="/signup" style={{ color: 'var(--brand-teal)', fontWeight: '700' }}>Start your 14-day free trial</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;