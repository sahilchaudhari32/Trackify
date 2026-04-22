import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './BalanceCard.css';

const BalanceCard = () => {
  return (
    <div className="balance-section">
      <div className="overview-label">
        <span className="label-text">OVERVIEW</span>
        <div className="greeting-row">
          <h1 className="greeting-text">Good Evening, Sahil 👋</h1>
          <div className="time-selector">
            <button className="time-btn active">Daily</button>
            <button className="time-btn">Weekly</button>
            <button className="time-btn">Monthly</button>
          </div>
        </div>
      </div>

      <div className="cards-main-row">
        <motion.div 
          className="balance-card-v2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="card-top">
            <span className="text-label">TOTAL AVAILABLE BALANCE</span>
            <div className="trend-badge">
              <ArrowUpRight size={14} />
              <span>+12.4%</span>
            </div>
          </div>
          
          <h1 className="main-balance">₹4,82,950.00</h1>

          <div className="sub-stats-grid">
            <div className="sub-stat">
              <span className="sub-label">INCOME</span>
              <span className="sub-value">₹1,24,000</span>
            </div>
            <div className="sub-stat">
              <span className="sub-label">EXPENSES</span>
              <span className="sub-value">₹42,300</span>
            </div>
            <div className="sub-stat">
              <span className="sub-label">INVESTMENTS</span>
              <span className="sub-value">₹65,000</span>
            </div>
            <div className="sub-stat">
              <span className="sub-label">TAX RESERVE</span>
              <span className="sub-value">₹12,400</span>
            </div>
          </div>
        </motion.div>

        <div className="ai-insight-card">
          <div className="insight-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
              <path d="M9 18h6"></path>
              <path d="M10 22h4"></path>
            </svg>
          </div>
          <p className="insight-text">You could save ₹12,400 this month by optimizing subscriptions.</p>
          <p className="insight-sub">Our AI analyzed 14 recurring charges and found 3 overlaps in your streaming services.</p>
          <button className="insight-link">VIEW DETAILS <span>→</span></button>
          
          <div className="net-prm-badge">
            <span>NET PRM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
