import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';
import api from '../api/axios';
import './BalanceCard.css';

const BalanceCard = () => {
  const [totals, setTotals] = useState({ balance: 0, income: 0, expense: 0 });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await api.get('/summary');

        setTotals({
          balance: summary.balance || 0,
          income: summary.totalIncome || 0,
          expense: summary.totalExpense || 0
        });
      } catch (err) {
        console.error('Error fetching summary:', err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="balance-section">
      <div className="overview-label">
        <span className="label-text">OVERVIEW</span>
        <div className="greeting-row">
          <h1 className="greeting-text">Welcome back, {user.name?.split(' ')[0] || 'User'} 👋</h1>
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
            <div className="trend-badge" style={{ background: totals.balance >= 0 ? 'rgba(25, 212, 168, 0.1)' : 'rgba(248, 113, 113, 0.1)', color: totals.balance >= 0 ? 'var(--brand-teal)' : '#f87171' }}>
              {totals.balance >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{totals.balance >= 0 ? '+5.2%' : '-2.1%'}</span>
            </div>
          </div>
          
          <h1 className="main-balance">₹{totals.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h1>

          <div className="sub-stats-grid">
            <div className="sub-stat">
              <span className="sub-label">TOTAL INCOME</span>
              <span className="sub-value" style={{ color: 'var(--brand-teal)' }}>₹{totals.income.toLocaleString('en-IN')}</span>
            </div>
            <div className="sub-stat">
              <span className="sub-label">TOTAL EXPENSES</span>
              <span className="sub-value" style={{ color: '#f87171' }}>₹{totals.expense.toLocaleString('en-IN')}</span>
            </div>
            <div className="sub-stat">
              <span className="sub-label">INVESTMENTS</span>
              <span className="sub-value">₹0</span>
            </div>
            <div className="sub-stat">
              <span className="sub-label">TAX RESERVE</span>
              <span className="sub-value">₹{(totals.income * 0.1).toLocaleString('en-IN')}</span>
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
          <p className="insight-text">
            {totals.expense > totals.income ? 'Your spending exceeds your income.' : 'You are on track with your savings!'}
          </p>
          <p className="insight-sub">
            {totals.expense > totals.income 
              ? 'Try reducing non-essential expenses like Shopping or Dining.' 
              : 'Our AI suggests increasing your Investment allocation by 5%.'}
          </p>
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
