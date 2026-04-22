import React from 'react';
import './SpendingOverview.css';

const SpendingOverview = () => {
  const bars = [
    { day: 'MON', height: 40, type: 'expense' },
    { day: 'TUE', height: 75, type: 'income' },
    { day: 'WED', height: 55, type: 'goal' },
    { day: 'THU', height: 35, type: 'expense' },
    { day: 'FRI', height: 90, type: 'income' },
    { day: 'SAT', height: 60, type: 'goal' },
    { day: 'SUN', height: 25, type: 'expense' },
  ];

  return (
    <div className="spending-overview-card">
      <div className="overview-header">
        <div className="title-group">
          <h3>Spending Overview</h3>
          <div className="toggle-group">
            <button className="toggle-btn active">This Month</button>
            <button className="toggle-btn">Last Month</button>
          </div>
        </div>
        
        <div className="legend-group">
          <div className="legend-item"><span className="dot income"></span> Income</div>
          <div className="legend-item"><span className="dot expense"></span> Expenses</div>
          <div className="legend-item"><span className="dot goal"></span> Goal Progress</div>
        </div>
      </div>

      <div className="chart-container-v2">
        {bars.map((bar, i) => (
          <div key={i} className="bar-column">
            <div 
              className={`bar-fill ${bar.type}`} 
              style={{ height: `${bar.height}%` }}
            >
              <div className="bar-glow"></div>
            </div>
            <span className="day-label">{bar.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingOverview;
