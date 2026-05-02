import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, AtSign, TrendingUp, Shield, User, AlertCircle, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { loginSuccess, loginStart, loginFailure } from '../store/slices/authSlice';
import api from '../api/axios';
import './Login.css';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(loginStart());
      try {
        const userData = await api.post('/auth/signup', { 
          name: values.name, 
          email: values.email, 
          password: values.password 
        });

        dispatch(loginSuccess({
          user: { _id: userData._id, name: userData.name, email: userData.email },
          token: userData.token
        }));

        toast.success('Account created successfully!');
        navigate('/dashboard');
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Something went wrong. Please try again.';
        dispatch(loginFailure(errorMsg));
        toast.error(errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'];
  const chartData = [35, 55, 45, 65, 60, 85, 100];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Sign Up | Trackify</title>
        <meta name="description" content="Create a new Trackify account." />
      </Helmet>
      {/* Left Side - Brand & Hero */}
      <div className="login-left">
        <Link to="/" className="brand-logo" style={{ textDecoration: 'none' }}>
          <motion.img 
            src="https://www.image2url.com/r2/default/images/1776834249896-92b9b25d-757c-478a-99f8-2c6279cdb58e.png" 
            alt="Trackify Logo" 
            className="brand-icon"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
          />
          <motion.span whileHover={{ x: 5 }}>Trackify</motion.span>
        </Link>

        <motion.div className="hero-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <h1>Take control of <br /><span className="stat-green">your money.</span></h1>
          <p>
            Precision-grade wealth management for the modern investor. Track assets, 
            monitor transactions, and grow your net worth with institutional-grade tools.
          </p>
        </motion.div>

        {/* Portfolio Stats Card */}
        <motion.div className="login-stats-card" initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} whileHover={{ y: -5, transition: { duration: 0.3 } }}>
          <div className="stats-card-main">
            <div>
              <div className="stats-card-label">TOTAL PORTFOLIO VALUE</div>
              <h2>$1,284,592.40</h2>
            </div>
            <motion.div className="growth-tag" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}>
              <TrendingUp size={12} /> +12.4%
            </motion.div>
          </div>

          <div className="stats-chart-signup">
            {chartData.map((h, i) => (
              <div key={i} className="chart-bar-wrapper-signup">
                <motion.div className={`chart-bar chart-bar-signup ${i === chartData.length - 1 ? 'active' : ''}`} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: 0.8 + (i * 0.1) }} />
                <span className="chart-label-signup">{months[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div className="social-proof-signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <div className="avatar-group-signup">
            {[1, 2, 3].map((i) => (
              <motion.img key={i} src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`} alt="user" className="avatar-img-signup" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 + (i * 0.1) }} whileHover={{ y: -5, scale: 1.1, zIndex: 10 }} />
            ))}
          </div>
          <span className="social-proof-text-signup">Trusted by 10,000+ users worldwide</span>
        </motion.div>

        <motion.div className="left-security-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          <div className="security-item"><Shield size={14} className="stat-green" /> Bank-level security</div>
          <span>•</span>
          <div className="security-item"><Lock size={14} className="stat-green" /> Encrypted financial data</div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="login-right">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="tabs-container" variants={itemVariants}>
            <Link to="/login" className="tab">Login</Link>
            <div className="tab active">Sign Up</div>
          </motion.div>

          <motion.div className="form-header form-header-signup" variants={itemVariants}>
            <h2>Create your account</h2>
            <p>Start managing your wealth with precision today.</p>
          </motion.div>

          <form className="login-form" onSubmit={formik.handleSubmit}>
            <motion.div className="input-group" variants={itemVariants}>
              <label>Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input type="text" name="name" placeholder="Enter your full name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} style={formik.touched.name && formik.errors.name ? { borderColor: '#f87171' } : {}} />
              </div>
              {formik.touched.name && formik.errors.name && <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>{formik.errors.name}</div>}
            </motion.div>

            <motion.div className="input-group" variants={itemVariants}>
              <label>Email Address</label>
              <div className="input-wrapper">
                <AtSign className="input-icon" size={18} />
                <input type="email" name="email" placeholder="name@company.com" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} style={formik.touched.email && formik.errors.email ? { borderColor: '#f87171' } : {}} />
              </div>
              {formik.touched.email && formik.errors.email && <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>{formik.errors.email}</div>}
            </motion.div>

            <motion.div className="password-grid-signup" variants={itemVariants}>
              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} style={formik.touched.password && formik.errors.password ? { borderColor: '#f87171' } : {}} />
                  <Eye className="input-icon-right" size={18} style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)} />
                </div>
                {formik.touched.password && formik.errors.password && <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>{formik.errors.password}</div>}
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="••••••••" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} style={formik.touched.confirmPassword && formik.errors.confirmPassword ? { borderColor: '#f87171' } : {}} />
                  <Eye className="input-icon-right" size={18} style={{ cursor: 'pointer' }} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>{formik.errors.confirmPassword}</div>}
              </div>
            </motion.div>

            <motion.div className="checkbox-group" variants={itemVariants}>
              <input type="checkbox" id="terms" name="terms" checked={formik.values.terms} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              <label htmlFor="terms">
                I agree to the <a href="#" className="forgot-link">Terms of Service</a> and <a href="#" className="forgot-link">Privacy Policy</a>.
              </label>
              {formik.touched.terms && formik.errors.terms && <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.25rem' }}>{formik.errors.terms}</div>}
            </motion.div>

            <motion.button type="submit" className="btn-login-main" variants={itemVariants} whileHover={{ scale: 1.02, translateY: -2 }} whileTap={{ scale: 0.98 }} disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          <motion.div className="divider-container" variants={itemVariants}>
            <span className="divider-text">OR CONTINUE WITH</span>
          </motion.div>

          <motion.button className="btn-google" variants={itemVariants} whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }} whileTap={{ scale: 0.98 }}>
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
