import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Wallet, 
  ShoppingBag, 
  Sparkles, 
  Search, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import TiltCard from '../components/TiltCard';
import Footer from '../components/Footer';
import './Analytics.css';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [timeframe, setTimeframe] = useState('Weekly');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summaryData = await api.get('/summary');
        setSummary(summaryData);
      } catch (err) {
        console.error('Failed to fetch summary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 15, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loader-line">
          <motion.div className="loader-progress" />
        </div>
      </div>
    );
  }

  const expenseRatio = summary?.totalIncome > 0 
    ? (summary.totalExpense / summary.totalIncome) * 100 
    : 100;

  return (
    <motion.div 
      className="dashboard-container analytics-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="analytics-header" variants={itemVariants}>
        <div className="analytics-title-group">
          <span className="terminal-label">PRIVATE WEALTH TERMINAL</span>
          <h1 className="analytics-title">Financial Insights</h1>
        </div>
        <div className="toggle-group">
          <button 
            className={`toggle-btn ${timeframe === 'Weekly' ? 'active' : ''}`}
            onClick={() => setTimeframe('Weekly')}
          >
            Weekly
          </button>
          <button 
            className={`toggle-btn ${timeframe === 'Monthly' ? 'active' : ''}`}
            onClick={() => setTimeframe('Monthly')}
          >
            Monthly
          </button>
        </div>
      </motion.div>

      <div className="analytics-grid">
        <motion.div variants={itemVariants}>
          <TiltCard className="h-full">
            <div className="glass-card velocity-card">
              <div className="velocity-header">
                <div className="velocity-info">
                  <h3>Net Worth Velocity</h3>
                  <div className="velocity-amount">
                    ₹{(summary?.balance || 0).toLocaleString('en-IN')}<span>.00</span>
                  </div>
                </div>
                <div className="growth-badge">
                  <TrendingUp size={14} />
                  {summary?.totalIncome > summary?.totalExpense ? '+8.2%' : '-2.4%'}
                </div>
              </div>
              <div className="chart-bg">
                {[40, 65, 35, 85, 55, 75, 45].map((height, i) => (
                  <motion.div 
                    key={i} 
                    className="bar-column" 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                  >
                    <span className="bar-label">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <TiltCard className="h-full">
            <div className="glass-card allocation-card">
              <h2>Expense Allocation</h2>
              <div className="donut-container">
                <svg width="200" height="200" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="rgba(255,255,255,0.05)" 
                    strokeWidth="10" 
                  />
                  <motion.circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="var(--brand-teal)" 
                    strokeWidth="10" 
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * (1 - 0.7) }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <motion.circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="var(--brand-rose)" 
                    strokeWidth="10" 
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 * (1 - (expenseRatio / 100)) }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                    strokeLinecap="round"
                    transform="rotate(160 50 50)"
                  />
                </svg>
                <div className="donut-info">
                  <span>BURN RATE</span>
                  <h4>{Math.round(expenseRatio)}%</h4>
                </div>
              </div>
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-left">
                    <div className="dot" style={{ background: 'var(--brand-teal)' }}></div>
                    Income
                  </div>
                  <div className="legend-right">₹{(summary?.totalIncome || 0).toLocaleString('en-IN')}</div>
                </div>
                <div className="legend-item">
                  <div className="legend-left">
                    <div className="dot" style={{ background: 'var(--brand-rose)' }}></div>
                    Expenses
                  </div>
                  <div className="legend-right">₹{(summary?.totalExpense || 0).toLocaleString('en-IN')}</div>
                </div>
                <div className="legend-item">
                  <div className="legend-left">
                    <div className="dot" style={{ background: 'var(--text-dim)' }}></div>
                    Savings
                  </div>
                  <div className="legend-right">₹{(summary?.balance || 0).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <div className="bottom-grid">
        <div className="left-stack" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="glass-card insight-card-small">
                <div className="insight-header">
                  <div className="icon-box" style={{ background: 'rgba(25, 212, 168, 0.1)', color: 'var(--brand-teal)' }}>
                    <Wallet size={20} />
                  </div>
                  <div className="insight-meta">
                    <h4>Top Category</h4>
                    <p>{summary?.categoryBreakdown?.[0]?.category || 'None'}</p>
                  </div>
                </div>
                <div className="insight-amount" style={{ color: 'var(--brand-teal)' }}>
                  ₹{(summary?.categoryBreakdown?.[0]?.amount || 0).toLocaleString('en-IN')}
                </div>
              </div>
            </TiltCard>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="glass-card insight-card-small" style={{ borderLeft: '3px solid var(--brand-rose)' }}>
                <div className="insight-header">
                  <div className="icon-box" style={{ background: 'rgba(248, 113, 113, 0.1)', color: 'var(--brand-rose)' }}>
                    <ShoppingBag size={20} />
                  </div>
                  <div className="insight-meta">
                    <h4>Avg. Daily Burn</h4>
                    <p>Based on activity</p>
                  </div>
                </div>
                <div className="insight-amount">
                  ₹{Math.round((summary?.totalExpense || 0) / 30).toLocaleString('en-IN')}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <TiltCard className="h-full">
            <div className="glass-card intelligence-card">
              <div className="report-header">
                <Sparkles size={20} className="text-cyan" style={{ color: 'var(--brand-teal)' }} />
                <h2>Intelligence Report</h2>
              </div>
              <div className="report-content">
                <div className="report-text">
                  <p>
                    {(summary?.balance || 0) > 0 
                      ? `Your current trajectory shows a healthy ${Math.round(((summary?.balance || 0) / (summary?.totalIncome || 1)) * 100)}% savings rate. Keep this up to hit your goals early.`
                      : 'Your spending is currently exceeding your income. Our AI recommends reviewing your recurring bills and shopping habits.'}
                  </p>
                  <div className="stat-row">
                    <div className="mini-stat">
                      <label>Savings Potential</label>
                      <span className="teal">₹{Math.round((summary?.balance || 0) * 0.2).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="mini-stat">
                      <label>Burn Rate</label>
                      <span className="rose">₹{Math.round((summary?.totalExpense || 0) / 30).toLocaleString('en-IN')}/day</span>
                    </div>
                  </div>
                </div>
                <div className="outlook-card">
                  <div className="outlook-icon">
                    <Search size={20} />
                  </div>
                  <h3>Investment Outlook</h3>
                  <p>Based on your current balance of ₹{(summary?.balance || 0).toLocaleString('en-IN')}, you could diversify into low-risk bonds.</p>
                  <Link to="/settings" className="connect-link" style={{ textDecoration: 'none' }}>
                    Optimize Portfolio <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Analytics;
