import React, { useState } from 'react';
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredPath, setHoveredPath] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

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
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <motion.div 
              className="logo-group"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              style={{ perspective: 1000 }}
            >
              <img src="https://www.image2url.com/r2/default/images/1776834249896-92b9b25d-757c-478a-99f8-2c6279cdb58e.png" alt="Logo" className="logo-img" />
              <span className="logo-text">Trackify</span>
            </motion.div>
          </Link>
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
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-pill"
                  className="active-pill"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}

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
          <NavLink to="/settings" className={({ isActive }) => `icon-action ${isActive ? 'active' : ''}`}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Settings size={20} />
            </motion.div>
          </NavLink>
          
          <div className="user-profile-group" style={{ position: 'relative' }}>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="user-avatar-small"
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ cursor: 'pointer' }}
            >
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Sahil'}`} alt="User" />
            </motion.div>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div 
                  className="user-dropdown-menu"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '1rem',
                    background: 'rgba(24, 25, 27, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '1rem',
                    minWidth: '200px',
                    zIndex: 1000,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                  }}
                >
                  <div className="user-info-section" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{user?.name || 'Guest'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{user?.email || 'guest@trackify.com'}</div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      color: '#f87171',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      background: 'rgba(248, 113, 113, 0.05)',
                      transition: 'all 0.2s'
                    }}
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

