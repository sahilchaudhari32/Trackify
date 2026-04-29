import React, { useState } from 'react';
import { X, Plus, Minus, DollarSign, Tag, FileText, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

const AddTransactionModal = ({ isOpen, onClose, onTransactionAdded }) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSmartCategory, setIsSmartCategory] = useState(false);

  const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Salary', 'Investment', 'Other'];

  const getAutoCategory = (desc) => {
    const d = desc.toLowerCase();
    if (d.includes('swiggy') || d.includes('zomato')) return 'Food';
    if (d.includes('uber') || d.includes('ola')) return 'Travel';
    if (d.includes('electricity') || d.includes('bill') || d.includes('recharge')) return 'Bills';
    if (d.includes('amazon') || d.includes('flipkart') || d.includes('myntra')) return 'Shopping';
    if (d.includes('salary') || d.includes('bonus')) return 'Salary';
    return null;
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    setDescription(val);
    
    const suggested = getAutoCategory(val);
    if (suggested) {
      setCategory(suggested);
      setIsSmartCategory(true);
    } else {
      setIsSmartCategory(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/transactions', {
        amount: Number(amount),
        type,
        category,
        description,
        date
      });
      onTransactionAdded();
      onClose();
      // Reset form
      setAmount('');
      setDescription('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '1rem'
      }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="modal-content" 
          style={{
            background: 'rgba(24, 25, 27, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '28px',
            width: '100%',
            maxWidth: '500px',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.6)'
          }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: 'var(--text-dim)' }}>
            <X size={24} />
          </button>

          <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', fontWeight: '800' }}>Add Transaction</h2>

          {error && <div style={{ color: '#f87171', background: 'rgba(248, 113, 113, 0.1)', padding: '0.75rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexTags: 'column', gap: '1.5rem', flexDirection: 'column' }}>
            {/* Type Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button 
                type="button" 
                onClick={() => setType('income')}
                style={{
                  padding: '1rem',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: type === 'income' ? 'var(--brand-teal)' : 'rgba(255,255,255,0.05)',
                  background: type === 'income' ? 'rgba(25, 212, 168, 0.1)' : 'transparent',
                  color: type === 'income' ? 'var(--brand-teal)' : 'var(--text-dim)',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Plus size={18} /> Income
              </button>
              <button 
                type="button" 
                onClick={() => setType('expense')}
                style={{
                  padding: '1rem',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: type === 'expense' ? '#f87171' : 'rgba(255,255,255,0.05)',
                  background: type === 'expense' ? 'rgba(248, 113, 113, 0.1)' : 'transparent',
                  color: type === 'expense' ? '#f87171' : 'var(--text-dim)',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <Minus size={18} /> Expense
              </button>
            </div>

            <div className="input-group">
              <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Amount (₹)</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <DollarSign size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-dim)' }} />
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem 1rem 1rem 3rem', color: 'white', fontSize: '1.1rem', fontWeight: '600' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>
                Category 
                {isSmartCategory && (
                  <span style={{ marginLeft: '0.5rem', color: 'var(--brand-teal)', fontSize: '0.6rem', background: 'rgba(25, 212, 168, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                    <Sparkles size={8} style={{ marginRight: '2px' }} /> AI SUGGESTED
                  </span>
                )}
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Tag size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-dim)' }} />
                <select 
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setIsSmartCategory(false); // User manual override
                  }}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem 1rem 1rem 3rem', color: 'white', appearance: 'none' }}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Description</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <FileText size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-dim)' }} />
                <input 
                  type="text" 
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="What was this for?"
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem 1rem 1rem 3rem', color: 'white' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' }}>Date</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Calendar size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-dim)' }} />
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1rem 1rem 1rem 3rem', color: 'white' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #19d4a8 0%, #10b981 100%)',
                color: '#0c0d0e',
                padding: '1.2rem',
                borderRadius: '16px',
                fontWeight: '800',
                fontSize: '1rem',
                marginTop: '1rem',
                boxShadow: '0 10px 30px rgba(25, 212, 168, 0.3)',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Adding...' : 'Save Transaction'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddTransactionModal;
