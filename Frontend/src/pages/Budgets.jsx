import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  ShoppingBag, 
  PiggyBank, 
  Calendar, 
  Plus, 
  X,
  TrendingUp,
  CreditCard,
  Briefcase
} from 'lucide-react';
import api from '../api/axios';
import TiltCard from '../components/TiltCard';
import Footer from '../components/Footer';
import './Budgets.css';

const Budgets = () => {
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newLimit, setNewLimit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');

  const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Investment', 'Other'];

  const loadBudgetData = async () => {
    setLoading(true);
    try {
      const [budgetRes, transRes] = await Promise.all([
        api.get('/budget'),
        api.get('/transactions')
      ]);

      setBudgets(Array.isArray(budgetRes) ? budgetRes : []);
      setTransactions(Array.isArray(transRes?.transactions) ? transRes.transactions : []);
    } catch (err) {
      console.error('Failed to fetch budget data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadBudgetData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleSetBudget = async (e) => {
    e.preventDefault();
    try {
      await api.post('/budget', {
        category: selectedCategory,
        limit: Number(newLimit)
      });
      setIsModalOpen(false);
      setNewLimit('');
      await loadBudgetData();
    } catch (err) {
      console.error('Error setting budget:', err);
    }
  };

  const getIcon = (category) => {
    switch (category) {
      case 'Food': return <Utensils size={20} />;
      case 'Travel': return <Briefcase size={20} />;
      case 'Bills': return <CreditCard size={20} />;
      case 'Shopping': return <ShoppingBag size={20} />;
      case 'Investment': return <TrendingUp size={20} />;
      default: return <PiggyBank size={20} />;
    }
  };

  const getSpent = (category) => {
    return transactions
      .filter(t => t.category === category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const processedBudgets = budgets.map(b => {
    const spent = getSpent(b.category);
    const percent = b.limit > 0 ? (spent / b.limit) * 100 : 0;
    return {
      ...b,
      spent,
      percent,
      status: percent > 100 ? 'OVERSPENT' : percent > 80 ? 'CRITICAL' : 'HEALTHY'
    };
  });

  const totalMonthlyLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = processedBudgets.reduce((sum, b) => sum + b.spent, 0);

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
    <div className="budgets-root">
      <motion.div 
        className="budgets-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="budgets-main">
          <header className="budgets-header">
            <div className="header-title-group">
              <span className="text-label text-cyan">BUDGET OVERVIEW</span>
              <h2>Budget Canvas.</h2>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-add-budget"
              onClick={() => setIsModalOpen(true)}
              style={{
                background: 'var(--brand-teal)',
                color: '#0c0d0e',
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Plus size={18} /> SET NEW LIMIT
            </motion.button>
          </header>

          <div className="budget-cards-list">
            {processedBudgets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                <PiggyBank size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <h3>No budgets set yet.</h3>
                <p>Track your spending habits by setting category limits.</p>
              </div>
            ) : (
              processedBudgets.map((budget) => (
                <TiltCard key={budget._id}>
                  <div className="budget-card">
                    <div className="card-top">
                      <div className="card-info">
                        <div className="icon-box">
                          {getIcon(budget.category)}
                        </div>
                        <div>
                          <h3 className="category-name">{budget.category}</h3>
                          <p className="text-dim" style={{ fontSize: '0.85rem' }}>
                            {transactions.filter(t => t.category === budget.category).length} transactions
                          </p>
                        </div>
                      </div>
                      <div className="amount-group">
                        <div className="current-amount">
                          ₹{budget.spent.toLocaleString()} <span className="total-amount">/ ₹{budget.limit.toLocaleString()}</span>
                        </div>
                        <span className={`status-label ${budget.status.toLowerCase()}`}>{budget.status}</span>
                      </div>
                    </div>
                    <div className="progress-container">
                      <motion.div 
                        className={`progress-fill ${budget.status.toLowerCase()}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(budget.percent, 100)}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                      />
                    </div>
                    <div className="card-bottom">
                      <span>SPENT: {budget.percent.toFixed(1)}%</span>
                      <span>
                        {budget.spent > budget.limit 
                          ? `EXCEEDED BY ₹${(budget.spent - budget.limit).toLocaleString()}` 
                          : `REMAINING: ₹${(budget.limit - budget.spent).toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              ))
            )}
          </div>
        </div>

        <aside className="budgets-sidebar">
          <div className="limit-card">
            <span className="text-label">TOTAL MONTHLY LIMIT</span>
            <div className="flex-between" style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '2rem' }}>₹{(totalMonthlyLimit || 0).toLocaleString()}</h2>
              <span className="pill-green">ON TRACK</span>
            </div>
            <div className="total-spent-mini" style={{ marginTop: '1.5rem' }}>
              <div className="flex-between" style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Utilization</span>
                <span>{totalMonthlyLimit > 0 ? ((totalSpent / totalMonthlyLimit) * 100).toFixed(1) : 0}%</span>
              </div>
              <div className="progress-container-mini" style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    background: 'var(--brand-teal)', 
                    width: `${Math.min((totalSpent / (totalMonthlyLimit || 1)) * 100, 100)}%` 
                  }} 
                />
              </div>
            </div>
          </div>

          <TiltCard>
            <div className="sidebar-widget">
              <div className="widget-icon-box" style={{ margin: '0 auto 1.5rem auto' }}>
                <Calendar size={20} />
              </div>
              <h3 className="widget-title">Smart Scheduler</h3>
              <p className="widget-desc">
                Your next major bill (Rent/EMI) is expected in 4 days. You have ₹{Math.max(totalMonthlyLimit - totalSpent, 0).toLocaleString()} remaining in your liquidity pool.
              </p>
              <button className="widget-action">AUTO-ALLOCATE</button>
            </div>
          </TiltCard>

          <TiltCard>
            <div className="sidebar-widget smart-forecast">
              <span className="text-label text-cyan" style={{ display: 'block', marginBottom: '1rem' }}>FORECAST</span>
              <p className="forecast-text">
                {totalSpent > totalMonthlyLimit 
                  ? `You have exceeded your overall budget. We recommend freezing non-essential spending for the next 8 days.`
                  : `At current spending rates, you will finish the month with ₹${(totalMonthlyLimit - totalSpent).toLocaleString()} surplus.`}
              </p>
            </div>
          </TiltCard>
        </aside>
      </motion.div>

      {/* Set Budget Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content"
              style={{
                background: '#141517', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '28px', width: '100%', maxWidth: '450px', padding: '2.5rem', position: 'relative'
              }}
            >
              <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-dim)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>

              <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', fontWeight: '800' }}>Set Category Limit</h2>

              <form onSubmit={handleSetBudget} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="input-group">
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem', color: 'white' }}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div className="input-group">
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Monthly Limit (₹)</label>
                  <input 
                    type="number" 
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    placeholder="e.g. 50000"
                    required
                    style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem', color: 'white' }}
                  />
                </div>

                <button 
                  type="submit"
                  style={{
                    background: 'var(--brand-teal)', color: '#0c0d0e', padding: '1.2rem',
                    borderRadius: '16px', fontWeight: '800', fontSize: '1rem', marginTop: '1rem', border: 'none', cursor: 'pointer'
                  }}
                >
                  SAVE BUDGET
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Budgets;
