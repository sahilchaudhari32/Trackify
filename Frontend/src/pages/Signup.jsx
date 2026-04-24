import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, AtSign, TrendingUp, Shield, User, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }
    setError('');
    navigate('/dashboard');
  };

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'];
  const chartData = [35, 55, 45, 65, 60, 85, 100];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Brand & Hero */}
      <div className="login-left">
        <motion.div 
          className="brand-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src="https://www.image2url.com/r2/default/images/1776834249896-92b9b25d-757c-478a-99f8-2c6279cdb58e.png" alt="Trackify Logo" className="brand-icon" />
          <span>Trackify</span>
        </motion.div>

        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1>Take control of <br /><span className="stat-green">your money.</span></h1>
          <p>
            Precision-grade wealth management for the modern investor. Track assets, 
            monitor transactions, and grow your net worth with institutional-grade tools.
          </p>
        </motion.div>

        {/* Portfolio Stats Card */}
        <motion.div 
          className="login-stats-card"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <div className="stats-card-main">
            <div>
              <div className="stats-card-label">TOTAL PORTFOLIO VALUE</div>
              <h2>$1,284,592.40</h2>
            </div>
            <motion.div 
              className="growth-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <TrendingUp size={12} /> +12.4%
            </motion.div>
          </div>

          <div className="stats-chart-signup">
            {chartData.map((h, i) => (
              <div key={i} className="chart-bar-wrapper-signup">
                <motion.div 
                  className={`chart-bar chart-bar-signup ${i === chartData.length - 1 ? 'active' : ''}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                />
                <span className="chart-label-signup">{months[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          className="social-proof-signup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="avatar-group-signup">
            {[1, 2, 3].map((i) => (
              <motion.img 
                key={i}
                src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`} 
                alt="user" 
                className="avatar-img-signup"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + (i * 0.1) }}
                whileHover={{ y: -5, scale: 1.1, zIndex: 10 }}
              />
            ))}
          </div>
          <span className="social-proof-text-signup">
            Trusted by 10,000+ users worldwide
          </span>
        </motion.div>

        <motion.div 
          className="left-security-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div className="security-item">
            <Shield size={14} className="stat-green" /> Bank-level security
          </div>
          <span>•</span>
          <div className="security-item">
            <Lock size={14} className="stat-green" /> Encrypted financial data
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="login-right">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="tabs-container" variants={itemVariants}>
            <Link to="/login" className="tab">Login</Link>
            <div className="tab active">Sign Up</div>
          </motion.div>

          <motion.div className="form-header form-header-signup" variants={itemVariants}>
            <h2>Create your account</h2>
            <p>Start managing your wealth with precision today.</p>
          </motion.div>

          <form className="login-form" onSubmit={handleSignup}>
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="error-message-auth"
                  style={{ 
                    color: '#f87171', 
                    fontSize: '0.85rem', 
                    background: 'rgba(248, 113, 113, 0.1)', 
                    padding: '0.75rem', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="input-group" variants={itemVariants}>
              <label>Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input type="text" placeholder="Enter your full name" required />
              </div>
            </motion.div>

            <motion.div className="input-group" variants={itemVariants}>
              <label>Email Address</label>
              <div className="input-wrapper">
                <AtSign className="input-icon" size={18} />
                <input type="email" placeholder="name@company.com" required />
              </div>
            </motion.div>

            <motion.div className="password-grid-signup" variants={itemVariants}>
              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </motion.div>

            <motion.div className="checkbox-group" variants={itemVariants}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#" className="forgot-link">Terms of Service</a> and <a href="#" className="forgot-link">Privacy Policy</a>.
              </label>
            </motion.div>

            <motion.button 
              type="submit" 
              className="btn-login-main" 
              variants={itemVariants}
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>
          </form>

          <motion.div className="divider-container" variants={itemVariants}>
            <span className="divider-text">OR CONTINUE WITH</span>
          </motion.div>

          <motion.button 
            className="btn-google" 
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" width="16" height="16" />
            Continue with Google
          </motion.button>

          <motion.div className="form-footer" variants={itemVariants}>
            Already have an account? <Link to="/login" className="forgot-link">Log In</Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
