import React from 'react';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import SpendingOverview from '../components/SpendingOverview';
import TransactionList from '../components/TransactionList';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-root">
      <Header />
      <main className="dashboard-container">
        <BalanceCard />
        <SpendingOverview />
        <TransactionList />
      </main>
    </div>
  );
};

export default Dashboard;
