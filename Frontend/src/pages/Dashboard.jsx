import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import BalanceCard from '../components/BalanceCard';
import SpendingOverview from '../components/SpendingOverview';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import Footer from '../components/Footer';
import './Dashboard.css';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="dashboard-root">
      <main className="dashboard-container">
        <BalanceCard key={`balance-${refreshKey}`} />
        <SpendingOverview key={`spending-${refreshKey}`} />
        <TransactionList key={`list-${refreshKey}`} />
      </main>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #19d4a8 0%, #10b981 100%)',
          color: '#0c0d0e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 15px 35px rgba(25, 212, 168, 0.4)',
          zIndex: 100,
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <Plus size={32} strokeWidth={3} />
      </motion.button>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTransactionAdded={handleTransactionAdded}
      />
      
      <Footer />
    </div>
  );
};

export default Dashboard;
