import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Hourglass, 
  Utensils, 
  Building2, 
  ShoppingBag, 
  Car, 
  CreditCard,
  Zap,
  Shield,
  ArrowRight,
  Plus,
  Briefcase,
  TrendingUp,
  HelpCircle,
  Wallet
} from 'lucide-react';
import api from '../api/axios';
import TiltCard from '../components/TiltCard';
import Footer from '../components/Footer';
import './Transactions.css';

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transRes, summaryRes] = await Promise.all([
          api.get('/transactions'),
          api.get('/transactions/summary')
        ]);
        setTransactions(transRes.data);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIcon = (category, type) => {
    if (type === 'income') return { icon: <Wallet size={20} />, color: '#19d4a8' };
    switch (category) {
      case 'Food': return { icon: <Utensils size={20} />, color: '#f87171' };
      case 'Travel': return { icon: <Car size={20} />, color: '#9ca3af' };
      case 'Bills': return { icon: <CreditCard size={20} />, color: '#fbbf24' };
      case 'Shopping': return { icon: <ShoppingBag size={20} />, color: '#a855f7' };
      case 'Investment': return { icon: <TrendingUp size={20} />, color: '#60a5fa' };
      default: return { icon: <HelpCircle size={20} />, color: '#94a3b8' };
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
    <div className="transactions-page">
      <header className="page-header animate-fade">
        <h1 className="page-title">Financial Ledger</h1>
        <p className="page-subtitle text-label">REAL-TIME ACTIVITY MONITORING</p>
      </header>

      <div className="transactions-grid">
        <div className="main-col">
          <section className="section-group">
            <h2 className="section-title">Transaction History</h2>
            <div className="transaction-list">
              {transactions.length === 0 ? (
                <div className="pending-empty-card">
                  <div className="empty-content">
                    <Hourglass className="empty-icon" size={32} />
                    <p>No transactions found. Start by adding one from the Dashboard!</p>
                  </div>
                </div>
              ) : (
                transactions.map((tx, index) => {
                  const { icon, color } = getIcon(tx.category, tx.type);
                  return (
                    <motion.div 
                      key={tx._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="transaction-item"
                    >
                      <div className="tx-left">
                        <div className="tx-icon-wrapper" style={{ backgroundColor: color + '15', color: color }}>
                          {icon}
                        </div>
                        <div className="tx-info">
                          <div className="tx-name-row">
                            <span className="tx-status-dot" style={{ backgroundColor: color }}></span>
                            <h3 className="tx-name">{tx.description}</h3>
                          </div>
                          <p className="tx-details">{tx.category} • {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="tx-right">
                        <div className="tx-amount-col">
                          <span className={`tx-amount ${tx.type === 'income' ? 'income' : ''}`}>
                            {tx.type === 'income' ? '+' : '-'} ₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                          </span>
                          <span className="tx-bank">Self-Reported Account</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </section>
        </div>

        <aside className="sidebar-col">
          <TiltCard className="balance-card-wrapper">
            <div className="balance-card-glass">
              <p className="text-label">NET BALANCE</p>
              <h2 className="balance-amount">₹ {summary?.balance.toLocaleString('en-IN')}</h2>
              <div className="balance-progress-container">
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill" 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((summary?.totalExpense / summary?.totalIncome) * 100, 100) || 0}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <div className="progress-labels">
                  <span className="income-label">IN: ₹ {summary?.totalIncome.toLocaleString('en-IN')}</span>
                  <span className="expense-label">OUT: ₹ {summary?.totalExpense.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </TiltCard>

          <div className="stats-row">
            <TiltCard className="stat-card">
              <Zap className="stat-icon" size={18} />
              <p className="text-label">EFFICIENCY</p>
              <h3 className="stat-value">{summary?.totalIncome > 0 ? Math.round((summary.balance / summary.totalIncome) * 100) : 0}%</h3>
            </TiltCard>
            <TiltCard className="stat-card">
              <Shield className="stat-icon" size={18} />
              <p className="text-label">PRIVACY</p>
              <h3 className="stat-value">Elite</h3>
            </TiltCard>
          </div>

          <TiltCard className="health-card">
            <div className="health-content">
              <h3 className="health-title">Financial Health</h3>
              <p className="health-desc">
                {summary?.balance > 0 
                  ? "You've successfully maintained a positive cash flow this period. Excellent management." 
                  : "Attention: Your liquidity is trending negative. Consider reviewing your top spending categories."}
              </p>
              <button className="view-report-btn">
                VIEW FULL REPORT <ArrowRight size={14} />
              </button>
            </div>
            <div className="health-bg-icon">
              <Building2 size={80} style={{ opacity: 0.05 }} />
            </div>
          </TiltCard>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default Transactions;

export default Transactions;
