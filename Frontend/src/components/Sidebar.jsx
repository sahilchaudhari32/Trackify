import React from 'react';
import { Home, PieChart, ArrowUpRight, ArrowDownLeft, Settings, LogOut, Wallet } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <Wallet size={20} />, label: 'Accounts', active: false },
    { icon: <PieChart size={20} />, label: 'Analytics', active: false },
    { icon: <ArrowUpRight size={20} />, label: 'Income', active: false },
    { icon: <ArrowDownLeft size={20} />, label: 'Expenses', active: false },
  ];

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <div className="logo-dot"></div>
        </div>
        <h2 className="text-gradient">Trackify</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={item.active ? 'active' : ''}>
              <a href="#">
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ul>
          <li>
            <a href="#">
              <Settings size={20} />
              <span>Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout">
              <LogOut size={20} />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
