import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-inner">
        <div className="header-left">
          <div className="logo-group">
            <img src="https://www.image2url.com/r2/default/images/1776834249896-92b9b25d-757c-478a-99f8-2c6279cdb58e.png" alt="Logo" className="logo-img" />
            <span className="logo-text">Trackify</span>
          </div>
        </div>

        <nav className="header-nav">
          <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
          <NavLink to="/transactions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Transactions</NavLink>
          <NavLink to="/budgets" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Budgets</NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Analytics</NavLink>
        </nav>

        <div className="header-right">
          <button className="icon-action"><Bell size={20} /></button>
          <button className="icon-action"><Settings size={20} /></button>
          <div className="user-avatar-small">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sahil" alt="User" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

