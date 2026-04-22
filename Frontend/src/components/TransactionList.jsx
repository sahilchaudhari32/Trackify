import React from 'react';
import { Smartphone, Briefcase, Utensils } from 'lucide-react';
import './TransactionList.css';

const transactions = [
  { 
    id: 1, 
    icon: <Smartphone size={20} />, 
    label: 'Apple Store Mumbai', 
    category: 'Electronics & Gadgets', 
    time: '2 hours ago',
    amount: -189900.00,
    bank: 'HDFC BANK • 4221',
    color: 'expense'
  },
  { 
    id: 2, 
    icon: <Briefcase size={20} />, 
    label: 'Monthly Retainer', 
    category: 'Client: Acme Corp', 
    time: 'Yesterday',
    amount: 85000.00,
    bank: 'ICICI BANK • 8890',
    color: 'income'
  },
  { 
    id: 3, 
    icon: <Utensils size={20} />, 
    label: 'The Table Colaba', 
    category: 'Dining', 
    time: 'Friday, 8:30 PM',
    amount: -8450.00,
    bank: 'AMEX PLATINUM • 1007',
    color: 'expense'
  }
];

const TransactionList = () => {
  return (
    <div className="recent-activity-section">
      <div className="activity-header">
        <h3>Recent Transactions</h3>
        <button className="see-all-btn">SEE ALL ACTIVITY</button>
      </div>

      <div className="transaction-rows">
        {transactions.map((t) => (
          <div key={t.id} className="transaction-card-v2">
            <div className="left-content">
              <div className="icon-box">
                {t.icon}
              </div>
              <div className="info-box">
                <span className="info-label">{t.label}</span>
                <span className="info-sub">{t.category} • {t.time}</span>
              </div>
            </div>
            
            <div className="right-content">
              <span className={`amount-text ${t.color}`}>
                {t.amount > 0 ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
              </span>
              <span className="bank-info">{t.bank}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
