import React from 'react';
import './CategoryBreakdown.css';

const categories = [
  { name: 'Housing', amount: 1500, percent: 45, color: 'var(--accent-purple)' },
  { name: 'Food', amount: 850, percent: 25, color: 'var(--accent-emerald)' },
  { name: 'Transport', amount: 450, percent: 15, color: 'var(--accent-neon)' },
  { name: 'Shopping', amount: 350, percent: 10, color: 'var(--accent-rose)' },
  { name: 'Others', amount: 150, percent: 5, color: 'var(--text-muted)' },
];

const CategoryBreakdown = () => {
  return (
    <div className="category-container glass-panel">
      <h3>Expenses by Category</h3>
      
      <div className="category-stats">
        {categories.map((cat, index) => (
          <div key={index} className="category-row">
            <div className="category-info">
              <span>{cat.name}</span>
              <span className="cat-amount">${cat.amount}</span>
            </div>
            <div className="progress-bg">
              <div 
                className="progress-fill" 
                style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
