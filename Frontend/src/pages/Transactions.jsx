import React from 'react';
import { motion } from 'framer-motion';
import { 
  Hourglass, 
  Utensils, 
  Building2, 
  ShoppingBag, 
  Car, 
  CreditCard,
  Bell,
  Settings,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';
import TiltCard from '../components/TiltCard';
import './Transactions.css';

const Transactions = () => {
  const completedTransactions = [
    {
      id: 1,
      name: 'Swiggy Limited',
      category: 'Food & Beverages',
      time: '2:45 PM',
      amount: '842.00',
      bank: 'ICICI Bank',
      account: '**4291',
      icon: <Utensils size={20} />,
      color: '#f87171',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Swiggy'
    },
    {
      id: 2,
      name: 'Tech Corp Monthly',
      category: 'Income',
      time: 'Yesterday',
      amount: '1,24,500.00',
      bank: 'HDFC Savings',
      account: '**8821',
      icon: <Building2 size={20} />,
      color: '#19d4a8',
      type: 'income'
    },
    {
      id: 3,
      name: 'Amazon India',
      category: 'Shopping',
      time: 'Oct 24',
      amount: '4,299.00',
      bank: 'SBI Credit',
      account: '**1004',
      icon: <ShoppingBag size={20} />,
      color: '#a855f7'
    },
    {
      id: 4,
      name: 'Uber Ride',
      category: 'Transport',
      time: 'Oct 23',
      amount: '312.50',
      bank: 'Paytm Wallet',
      account: '',
      icon: <Car size={20} />,
      color: '#9ca3af'
    },
    {
      id: 5,
      name: 'Zomato Gold',
      category: 'Subscription',
      time: 'Oct 22',
      amount: '799.00',
      bank: 'ICICI Bank',
      account: '**4291',
      icon: <CreditCard size={20} />,
      color: '#f87171'
    }
  ];

  return (
    <div className="transactions-page">
      <header className="page-header animate-fade">
        <h1 className="page-title">Recent Activity</h1>
        <p className="page-subtitle text-label">CURATED FINANCIAL OVERVIEW</p>
      </header>

      <div className="transactions-grid">
        <div className="main-col">
          <section className="section-group">
            <div className="flex-between section-header">
              <h2 className="section-title">Pending</h2>
              <span className="badge-outline">VERIFICATION REQUIRED</span>
            </div>
            <div className="pending-empty-card">
              <div className="empty-content">
                <Hourglass className="empty-icon" size={32} />
                <p>No pending transactions</p>
              </div>
            </div>
          </section>

          <section className="section-group">
            <h2 className="section-title">Completed Transactions</h2>
            <div className="transaction-list">
              {completedTransactions.map((tx, index) => (
                <motion.div 
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="transaction-item"
                >
                  <div className="tx-left">
                    <div className="tx-icon-wrapper" style={{ backgroundColor: tx.color + '20', color: tx.color }}>
                      {tx.image ? <img src={tx.image} alt={tx.name} className="tx-avatar" /> : tx.icon}
                    </div>
                    <div className="tx-info">
                      <div className="tx-name-row">
                        <span className="tx-status-dot" style={{ backgroundColor: tx.color }}></span>
                        <h3 className="tx-name">{tx.name}</h3>
                      </div>
                      <p className="tx-details">{tx.category} • {tx.time}</p>
                    </div>
                  </div>
                  <div className="tx-right">
                    <div className="tx-amount-col">
                      <span className={`tx-amount ${tx.type === 'income' ? 'income' : ''}`}>
                        ₹ {tx.amount}
                      </span>
                      <span className="tx-bank">{tx.bank} {tx.account && `• ${tx.account}`}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <aside className="sidebar-col">
          <TiltCard className="balance-card-wrapper">
            <div className="balance-card-glass">
              <p className="text-label">NET BALANCE</p>
              <h2 className="balance-amount">₹ 2,45,890.10</h2>
              <div className="balance-progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
                <div className="progress-labels">
                  <span className="income-label">+ ₹ 1,24,500</span>
                  <span className="expense-label">- ₹ 42,310</span>
                </div>
              </div>
            </div>
          </TiltCard>

          <div className="stats-row">
            <TiltCard className="stat-card">
              <Zap className="stat-icon" size={18} />
              <p className="text-label">EFFICIENCY</p>
              <h3 className="stat-value">92%</h3>
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
              <p className="health-desc">You saved 12% more than last month. Excellent progress.</p>
              <button className="view-report-btn">
                VIEW REPORT <ArrowRight size={14} />
              </button>
            </div>
            <div className="health-bg-icon">
              <Building2 size={80} style={{ opacity: 0.05 }} />
            </div>
          </TiltCard>
        </aside>
      </div>

      <footer className="page-footer">
        <div className="footer-links">
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF SERVICE</a>
          <a href="#">SECURITY</a>
          <a href="#">SUPPORT</a>
        </div>
        <p className="copyright">© 2024 TRACKIFY ELITE. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default Transactions;
