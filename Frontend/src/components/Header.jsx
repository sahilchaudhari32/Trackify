import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Transactions', path: '/transactions' },
    { name: 'Budgets', path: '/budgets' },
    { name: 'Analytics', path: '/analytics' },
  ];

  return (
    <header className="main-header">
      <div className="header-inner">
        <div className="header-left">
          <motion.div 
            className="logo-group"
            whileHover={{ scale: 1.05, rotateY: 10 }}
            style={{ perspective: 1000 }}
          >
            <img src="https://www.image2url.com/r2/default/images/1776834249896-92b9b25d-757c-478a-99f8-2c6279cdb58e.png" alt="Logo" className="logo-img" />
            <span className="logo-text">Trackify</span>
          </motion.div>
        </div>

        <nav className="header-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <span className="nav-text">{item.name}</span>
              
              {/* Active Indicator (Underline/Pill) */}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-pill"
                  className="active-pill"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}

              {/* Hover Indicator */}
              <AnimatePresence>
                {hoveredPath === item.path && location.pathname !== item.path && (
                  <motion.div
                    layoutId="nav-hover"
                    className="hover-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        <div className="header-right">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="icon-action"><Bell size={20} /></motion.button>
          <NavLink to="/settings">
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }} 
              className={`icon-action ${location.pathname === '/settings' ? 'active' : ''}`}
            >
              <Settings size={20} />
            </motion.button>
          </NavLink>
          <NavLink to="/settings">
            <motion.div whileHover={{ scale: 1.1 }} className="user-avatar-small">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sahil" alt="User" />
            </motion.div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;

