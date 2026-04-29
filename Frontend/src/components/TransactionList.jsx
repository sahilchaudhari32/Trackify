import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Briefcase, Utensils, ShoppingBag, CreditCard, Wallet, TrendingUp, HelpCircle } from 'lucide-react';
import api from '../api/axios';
import './TransactionList.css';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getIcon = (category) => {
    switch (category) {
      case 'Food': return <Utensils size={20} />;
      case 'Travel': return <Briefcase size={20} />;
      case 'Bills': return <CreditCard size={20} />;
      case 'Shopping': return <ShoppingBag size={20} />;
      case 'Salary': return <Wallet size={20} />;
      case 'Investment': return <TrendingUp size={20} />;
      default: return <HelpCircle size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="recent-activity-section" style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div className="loader-mini">Loading transactions...</div>
      </div>
    );
  }

  return (
    <div className="recent-activity-section">
      <div className="activity-header">
        <h3>Recent Transactions</h3>
        <Link to="/transactions" className="see-all-btn">SEE ALL ACTIVITY</Link>
      </div>

      <div className="transaction-rows">
        {transactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>
            No transactions found. Add your first one!
          </div>
        ) : (
          transactions.slice(0, 5).map((t) => (
            <div key={t._id} className="transaction-card-v2">
              <div className="left-content">
                <div className="icon-box">
                  {getIcon(t.category)}
                </div>
                <div className="info-box">
                  <span className="info-label">{t.description}</span>
                  <span className="info-sub">{t.category} • {new Date(t.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="right-content">
                <span className={`amount-text ${t.type === 'income' ? 'income' : 'expense'}`}>
                  {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
                </span>
                <span className="bank-info">Cash/Bank</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
