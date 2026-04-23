import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Settings as SettingsIcon, 
  Plus, 
  Landmark, 
  CreditCard, 
  Bitcoin, 
  Globe, 
  Bell, 
  AlertTriangle, 
  Edit2, 
  CheckCircle2, 
  Lock,
  ArrowRight
} from 'lucide-react';
import TiltCard from '../components/TiltCard';
import './Settings.css';

const Settings = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loader-line">
          <motion.div 
            className="loader-progress" 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="dashboard-container settings-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="settings-grid">
        {/* Left Sidebar */}
        <div className="settings-sidebar">
          {/* Profile Card */}
          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="glass-card profile-card">
                <div className="avatar-large">
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" alt="Arjun Vardhan" />
                  <button className="edit-avatar-btn">
                    <Edit2 size={14} />
                  </button>
                </div>
                <div className="profile-info">
                  <h2>Arjun Vardhan</h2>
                  <p>Elite Member since 2021</p>
                  
                  <div className="profile-stats">
                    <div className="stat-item">
                      <label>Total Assets</label>
                      <span>₹82,45,000</span>
                    </div>
                    <div className="stat-item right">
                      <label>Active Links</label>
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Security Integrity Card */}
          <motion.div variants={itemVariants} className="security-card">
            <TiltCard>
              <div className="glass-card">
                <div className="security-header">Security Integrity</div>
                
                <div className="integrity-chart">
                  <svg width="160" height="160" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="transparent" 
                      stroke="rgba(25, 212, 168, 0.05)" 
                      strokeWidth="8" 
                    />
                    <motion.circle 
                      cx="50" cy="50" r="45" 
                      fill="transparent" 
                      stroke="var(--brand-teal)" 
                      strokeWidth="8" 
                      strokeDasharray="282.7"
                      initial={{ strokeDashoffset: 282.7 }}
                      animate={{ strokeDashoffset: 282.7 * (1 - 0.98) }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="chart-text">
                    <h3>98%</h3>
                    <span>Elite Protected</span>
                  </div>
                </div>

                <div className="security-list">
                  <div className="security-item">
                    <CheckCircle2 size={16} />
                    Biometric 2FA Active
                  </div>
                  <div className="security-item">
                    <CheckCircle2 size={16} />
                    AES-256 Cloud Vault
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Right Main Section */}
        <div className="settings-main">
          {/* Financial Connections */}
          <motion.div variants={itemVariants}>
            <div className="section-header">
              <div className="section-title">
                <h2>Financial Connections</h2>
                <p>Manage your linked accounts and data sync intervals.</p>
              </div>
              <button className="link-btn">Link New Account</button>
            </div>

            <div className="connections-list">
              <TiltCard>
                <div className="connection-item">
                  <div className="conn-left">
                    <div className="bank-icon">
                      <Landmark size={20} />
                    </div>
                    <div className="conn-info">
                      <h4>HDFC Imperial Savings</h4>
                      <p>•••• 8829 | Last sync: 2m ago</p>
                    </div>
                  </div>
                  <div className="conn-right">
                    <div className="conn-amount">₹42,12,400</div>
                    <div className="conn-status">Connected</div>
                  </div>
                </div>
              </TiltCard>

              <TiltCard>
                <div className="connection-item">
                  <div className="conn-left">
                    <div className="bank-icon">
                      <CreditCard size={20} />
                    </div>
                    <div className="conn-info">
                      <h4>American Express Platinum</h4>
                      <p>•••• 1004 | Last sync: 1h ago</p>
                    </div>
                  </div>
                  <div className="conn-right">
                    <div className="conn-amount">₹8,45,000</div>
                    <div className="conn-status">Connected</div>
                  </div>
                </div>
              </TiltCard>

              <TiltCard>
                <div className="connection-item">
                  <div className="conn-left">
                    <div className="bank-icon" style={{ color: '#f59e0b' }}>
                      <Bitcoin size={20} />
                    </div>
                    <div className="conn-info">
                      <h4>Coinbase Pro Wallet</h4>
                      <p>Sync paused due to API timeout</p>
                    </div>
                  </div>
                  <div className="conn-right">
                    <div className="conn-status error">Re-authenticate</div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>

          {/* System Preferences */}
          <motion.div variants={itemVariants}>
            <div className="section-header" style={{ marginBottom: '1rem' }}>
              <div className="section-title">
                <h2>System Preferences</h2>
              </div>
            </div>

            <div className="pref-grid">
              <TiltCard>
                <div className="pref-card">
                  <div className="pref-header">
                    <Globe size={18} className="text-gray" />
                    <h3>Locale & Currency</h3>
                  </div>
                  <div className="pref-rows">
                    <div className="pref-row">
                      <label>Default Display</label>
                      <span className="teal">INR (₹)</span>
                    </div>
                    <div className="pref-row">
                      <label>Timezone</label>
                      <span>IST (GMT +5:30)</span>
                    </div>
                  </div>
                </div>
              </TiltCard>

              <TiltCard>
                <div className="pref-card">
                  <div className="pref-header">
                    <Bell size={18} className="text-gray" />
                    <h3>Alert Thresholds</h3>
                  </div>
                  <div className="pref-rows">
                    <div className="pref-row">
                      <label>Large Expense Alert</label>
                      <span>{'>'} ₹50,000</span>
                    </div>
                    <div className="pref-row">
                      <label>Daily Digest</label>
                      <span className="green">08:00 AM</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>

          {/* Privileged Actions */}
          <motion.div variants={itemVariants}>
            <TiltCard>
              <div className="glass-card actions-card">
                <div className="actions-content">
                  <div className="actions-text">
                    <AlertTriangle size={24} className="warning-icon" />
                    <div className="text-group">
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.2rem' }}>Privileged Actions</h3>
                      <p>Download a full vault export or permanently de-provision this account and all connected metadata.</p>
                    </div>
                  </div>
                  <div className="btn-group">
                    <button className="action-btn secondary">Export Data</button>
                    <button className="action-btn danger">Close Account</button>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="analytics-footer" 
        variants={itemVariants}
        style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
      >
        <span>© 2024 TRACKIFY ELITE. ALL RIGHTS RESERVED.</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security</span>
          <span>Support</span>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Settings;
