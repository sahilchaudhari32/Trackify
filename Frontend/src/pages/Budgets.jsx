import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ShoppingBag, PiggyBank, Calendar, Zap, Lightbulb } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import './Budgets.css';

const Budgets = () => {
  const budgetData = [
    {
      id: 1,
      category: 'Food & Dining',
      subtitle: '48 transactions this month',
      spent: 42300,
      total: 85000,
      status: 'HEALTHY STATE',
      icon: <Utensils className="text-cyan" size={20} />,
      color: 'bg-cyan',
      textColor: 'text-cyan'
    },
    {
      id: 2,
      category: 'Lifestyle & Shopping',
      subtitle: 'Peak spend on weekend sale',
      spent: 62150,
      total: 55000,
      status: 'OVERSPENT',
      icon: <ShoppingBag className="text-pink" size={20} />,
      color: 'bg-pink',
      textColor: 'text-pink'
    },
    {
      id: 3,
      category: 'Investments & Savings',
      subtitle: 'Monthly SIP automated',
      spent: 120000,
      total: 120000,
      status: 'TARGET ACHIEVED',
      icon: <PiggyBank className="text-green" size={20} />,
      color: 'bg-green',
      textColor: 'text-green'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="budgets-root">
      <motion.div 
        className="budgets-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="budgets-main">
          <motion.header className="budgets-header" variants={itemVariants}>
            <div className="header-title-group">
              <span className="text-label text-cyan">BUDGET OVERVIEW</span>
              <h2>Budget Canvas.</h2>
            </div>
          </motion.header>

          <div className="budget-cards-list">
            {budgetData.map((budget) => (
              <motion.div key={budget.id} variants={itemVariants}>
                <TiltCard>
                  <div className="budget-card">
                    <div className="card-top">
                      <div className="card-info">
                        <div className="icon-box">
                          {budget.icon}
                        </div>
                        <div>
                          <h3 className="category-name">{budget.category}</h3>
                          <p className="text-dim" style={{ fontSize: '0.85rem' }}>{budget.subtitle}</p>
                        </div>
                      </div>
                      <div className="amount-group">
                        <div className="current-amount">
                          ₹{budget.spent.toLocaleString()} <span className="total-amount">/ ₹{budget.total.toLocaleString()}</span>
                        </div>
                        <span className={`status-label ${budget.textColor}`}>{budget.status}</span>
                      </div>
                    </div>

                    <div className="progress-container">
                      <motion.div 
                        className={`progress-fill ${budget.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((budget.spent / budget.total) * 100, 100)}%` }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                      />
                    </div>

                    <div className="card-bottom">
                      <span>SPENT: {((budget.spent / budget.total) * 100).toFixed(1)}%</span>
                      <span>
                        {budget.spent > budget.total 
                          ? `EXCEEDED BY ₹${(budget.spent - budget.total).toLocaleString()}` 
                          : `REMAINING: ₹${(budget.total - budget.spent).toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        <aside className="budgets-sidebar">
          <motion.div variants={itemVariants} className="limit-card">
            <span className="text-label">TOTAL MONTHLY LIMIT</span>
            <div className="flex-between" style={{ marginTop: '0.5rem' }}>
              <h2 style={{ fontSize: '2rem' }}>₹2,45,000</h2>
              <span className="pill-green">↑ 12% vs last month</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="sidebar-widget">
                <div className="widget-icon-box" style={{ margin: '0 auto 1.5rem auto' }}>
                  <Calendar size={20} />
                </div>
                <h3 className="widget-title">Upcoming Subscriptions</h3>
                <p className="widget-desc">
                  No upcoming bills this week. You're all caught up with your scheduled payments.
                </p>
                <button className="widget-action">MANAGE RECURRING</button>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="sidebar-widget smart-forecast">
                <span className="text-label text-cyan" style={{ display: 'block', marginBottom: '1rem' }}>SMART FORECAST</span>
                <p className="forecast-text">
                  At current spending rates, you will exceed your total budget by <span className="forecast-highlight">₹12,400</span> on the 27th.
                </p>
                <div className="forecast-visual">
                  <div className="forecast-bar active"></div>
                  <div className="forecast-bar active"></div>
                  <div className="forecast-bar warning"></div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="sidebar-widget saving-opportunity">
                <div className="widget-icon-box" style={{ color: 'var(--brand-teal)' }}>
                  <Lightbulb size={20} />
                </div>
                <h3 className="widget-title" style={{ textAlign: 'left' }}>Saving Opportunity</h3>
                <p className="widget-desc" style={{ textAlign: 'left', fontStyle: 'italic', opacity: 0.8 }}>
                  "Switching to an annual plan for your Adobe subscription could save you ₹4,200 this year."
                </p>
                <button className="widget-action">APPLY STRATEGY</button>
              </div>
            </TiltCard>
          </motion.div>
        </aside>
      </motion.div>

      <motion.footer 
        className="flex-between" 
        style={{ marginTop: '5rem', padding: '2rem 5rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.1em' }}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <span>© 2024 TRACKIFY ELITE. ALL RIGHTS RESERVED.</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>PRIVACY POLICY</span>
          <span>TERMS OF SERVICE</span>
          <span>SECURITY</span>
          <span>SUPPORT</span>
        </div>
      </motion.footer>
    </div>
  );
};

export default Budgets;
