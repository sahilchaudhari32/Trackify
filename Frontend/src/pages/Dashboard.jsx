import React from 'react';
import BalanceCard from '../components/BalanceCard';
import SpendingOverview from '../components/SpendingOverview';
import TransactionList from '../components/TransactionList';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-root">
      <main className="dashboard-container">
        <BalanceCard />
        <SpendingOverview />
        <TransactionList />
      </main>
    </div>
  );
};

export default Dashboard;
