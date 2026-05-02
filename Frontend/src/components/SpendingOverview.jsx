import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import './SpendingOverview.css';

const SpendingOverview = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const response = await api.get('/transactions');
        const transactions = Array.isArray(response?.transactions) ? response.transactions : [];

        // Group by day of week
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const aggregation = days.map(day => ({ day, income: 0, expense: 0 }));

        transactions.forEach(t => {
          const date = new Date(t.date);
          const dayIndex = date.getDay();
          if (t.type === 'income') aggregation[dayIndex].income += t.amount;
          else aggregation[dayIndex].expense += t.amount;
        });

        // Convert to height percentage (max 100%)
        const maxVal = Math.max(...aggregation.flatMap(d => [d.income, d.expense]), 1);
        const bars = aggregation.map(d => {
          const val = d.income >= d.expense ? d.income : d.expense;
          return {
            day: d.day,
            height: (val / maxVal) * 100,
            type: d.income >= d.expense && d.income > 0 ? 'income' : 'expense'
          };
        });

        setChartData(bars);
      } catch (err) {
        console.error('Error processing chart data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  if (loading) return null;

  return (
    <div className="spending-overview-card">
      <div className="overview-header">
        <div className="title-group">
          <h3>Spending Overview</h3>
        </div>
        
        <div className="legend-group">
          <div className="legend-item"><span className="dot income"></span> Income</div>
          <div className="legend-item"><span className="dot expense"></span> Expenses</div>
        </div>
      </div>

      <div className="chart-container-v2">
        {chartData.map((bar, i) => (
          <div key={i} className="bar-column">
            <div 
              className={`bar-fill ${bar.type}`} 
              style={{ height: `${Math.max(bar.height, 2)}%` }}
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
