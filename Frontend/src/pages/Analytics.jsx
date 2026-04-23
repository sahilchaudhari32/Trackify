import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  ShoppingBag, 
  Sparkles, 
  Search, 
  ArrowRight 
} from 'lucide-react';
import TiltCard from '../components/TiltCard';
import './Analytics.css';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('Weekly');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
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

  return (
    <motion.div 
      className="dashboard-container analytics-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
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

      {/* Main Grid */}
      <div className="analytics-grid">
        {/* Net Worth Velocity Card */}
        <motion.div variants={itemVariants}>
          <TiltCard className="h-full">
            <div className="glass-card velocity-card">
              <div className="velocity-header">
                <div className="velocity-info">
                  <h3>Net Worth Velocity</h3>
                  <div className="velocity-amount">
                    ₹4,82,450<span>.00</span>
                  </div>
                </div>
                <div className="growth-badge">
                  <TrendingUp size={14} />
                  +12.4%
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

        {/* Allocation Card */}
        <motion.div variants={itemVariants}>
          <TiltCard className="h-full">
            <div className="glass-card allocation-card">
              <h2>Allocation</h2>
              
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
                    animate={{ strokeDashoffset: 251.2 * (1 - 0.3) }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                    strokeLinecap="round"
                    transform="rotate(160 50 50)"
                  />
                </svg>
                <div className="donut-info">
                  <span>EXPENSES</span>
                  <h4>30%</h4>
                </div>
              </div>

              <div className="legend">
                <div className="legend-item">
                  <div className="legend-left">
                    <div className="dot" style={{ background: 'var(--brand-teal)' }}></div>
                    Income
                  </div>
                  <div className="legend-right">₹1,24,000</div>
                </div>
                <div className="legend-item">
                  <div className="legend-left">
                    <div className="dot" style={{ background: 'var(--brand-rose)' }}></div>
                    Expenses
                  </div>
                  <div className="legend-right">₹42,500</div>
                </div>
                <div className="legend-item">
                  <div className="legend-left">
                    <div className="dot" style={{ background: 'var(--text-dim)' }}></div>
                    Investments
                  </div>
                  <div className="legend-right no-insights">No insights yet</div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="bottom-grid">
        <div className="left-stack">
          {/* Salary Credit Card */}
          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="glass-card insight-card-small">
                <div className="insight-header">
                  <div className="icon-box" style={{ background: 'rgba(25, 212, 168, 0.1)', color: 'var(--brand-teal)' }}>
                    <Wallet size={20} />
                  </div>
                  <div className="insight-meta">
                    <h4>Salary Credit</h4>
                    <p>Corporate Payout • 14:20</p>
                  </div>
                </div>
                <div className="insight-amount" style={{ color: 'var(--brand-teal)' }}>
                  +₹85,000.00
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Luxury Retails Card */}
          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="glass-card insight-card-small" style={{ borderLeft: '3px solid var(--brand-rose)' }}>
                <div className="insight-header">
                  <div className="icon-box" style={{ background: 'rgba(248, 113, 113, 0.1)', color: 'var(--brand-rose)' }}>
                    <ShoppingBag size={20} />
                  </div>
                  <div className="insight-meta">
                    <h4>Luxury Retails</h4>
                    <p>Apple Store • 10:45</p>
                  </div>
                </div>
                <div className="insight-amount">
                  -₹1,24,900.00
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Intelligence Report Card */}
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
                    Your spending in <b>Dining Out</b> has decreased by <span className="highlight">18%</span> compared to last week. This trajectory puts you on track to save an extra ₹12,000 this month.
                  </p>
                  
                  <div className="stat-row">
                    <div className="mini-stat">
                      <label>Savings Potential</label>
                      <span className="teal">₹45,200</span>
                    </div>
                    <div className="mini-stat">
                      <label>Burn Rate</label>
                      <span className="rose">₹2,400/day</span>
                    </div>
                  </div>
                </div>

                <div className="outlook-card">
                  <div className="outlook-icon">
                    <Search size={20} />
                  </div>
                  <h3>Investment Outlook</h3>
                  <p>No insights yet. Sync your portfolio to see personalized growth trends.</p>
                  <div className="connect-link">
                    Connect Portfolio <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
      
      {/* Footer */}
      <motion.footer 
        className="analytics-footer" 
        variants={itemVariants}
        style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
      >
        <span>© 2024 TRACKIFY ELITE. ALL RIGHTS RESERVED.</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security</span>
          <span>Support</span>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Analytics;
