import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, PieChart, ArrowUpRight, ArrowDownLeft, Settings, LogOut, Wallet } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Wallet size={20} />, label: 'Accounts', path: '/accounts' },
    { icon: <PieChart size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <ArrowUpRight size={20} />, label: 'Income', path: '/income' },
    { icon: <ArrowDownLeft size={20} />, label: 'Expenses', path: '/expenses' },
  ];

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-logo">
        <Link to="/" className="logo-link">
          <div className="logo-icon">
            <div className="logo-dot"></div>
          </div>
          <h2 className="text-gradient">Trackify</h2>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ul>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
              <Settings size={20} />
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <Link to="/logout" className="logout">
              <LogOut size={20} />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

