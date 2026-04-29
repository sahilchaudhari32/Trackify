import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Landmark, 
  CreditCard, 
  Bitcoin, 
  Globe, 
  Bell, 
  AlertTriangle,
  Pencil
} from 'lucide-react';
import api from '../api/axios';
import Footer from '../components/Footer';
import './Settings.css';

// --- Reusable UI Components ---
const GlassCard = ({ children, className = "" }) => (
  <div className={`settings-glass-card ${className}`}>
    {children}
  </div>
);

const ProfileStat = ({ label, value, isTeal = false }) => (
  <div className="profile-stat">
    <label className="profile-stat-label">{label}</label>
    <span className={`profile-stat-value ${isTeal ? 'teal' : ''}`}>{value}</span>
  </div>
);

const ConnectionItem = ({ icon: Icon, name, meta, amount, status, isError = false }) => (
  <div className="connection-item">
    <div className="connection-left">
      <div className={`connection-icon ${isError ? 'error' : ''}`}>
        <Icon size={20} />
      </div>
      <div>
        <h4 className="connection-name">{name}</h4>
        <p className="connection-meta">{meta}</p>
      </div>
    </div>
    <div className="connection-right">
      {amount && <div className="connection-amount">{amount}</div>}
      <div className={`connection-status ${isError ? 'error' : ''}`}>
        {status}
      </div>
    </div>
  </div>
);

const PreferenceCard = ({ icon: Icon, title, rows }) => (
  <div className="preference-card">
    <div className="preference-header">
      <Icon size={18} className="preference-icon" />
      <h3 className="preference-title">{title}</h3>
    </div>
    <div className="preference-rows">
      {rows.map((row, i) => (
        <div key={i} className="preference-row">
          <label className="preference-row-label">{row.label}</label>
          <span className={`preference-row-value ${row.colorClass || ''}`}>{row.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const Settings = () => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
        const res = await api.get('/transactions/summary');
        setSummary(res.data);
      } catch (err) {
        console.error('Error in settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  if (loading) return null;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div 
      className="settings-page"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="settings-grid">
        <div className="settings-left-col">
          <motion.div variants={itemVariants}>
            <GlassCard className="profile-card">
              <div className="profile-avatar-wrapper">
                <img src={profileImage} alt="Profile" className="profile-avatar" />
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden-input" />
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  onClick={triggerFileInput}
                  className="avatar-edit-btn"
                >
                  <Pencil size={14} fill="currentColor" />
                </motion.button>
              </div>
              <h2 className="profile-name">{user?.name || 'Member'}</h2>
              <p className="profile-since">{user?.email}</p>
              
              <div className="profile-stats-row">
                <ProfileStat label="Total Assets" value={`₹${summary?.balance.toLocaleString('en-IN') || 0}`} isTeal />
                <ProfileStat label="Security" value="Elite" />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="security-card">
              <h3 className="security-title">Security Integrity</h3>
              <div className="security-ring-wrapper">
                <svg className="security-ring-svg" viewBox="0 0 176 176">
                  <circle cx="88" cy="88" r="78" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <motion.circle 
                    cx="88" cy="88" r="78" fill="transparent" stroke="#19d4a8" strokeWidth="10" strokeDasharray="490"
                    initial={{ strokeDashoffset: 490 }}
                    animate={{ strokeDashoffset: 490 * (1 - 0.98) }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="security-ring-text">
                  <h3 className="security-percent">98%</h3>
                  <span className="security-label">Elite Protected</span>
                </div>
              </div>
              <div className="security-badges">
                <div className="security-badge-item">
                  <CheckCircle2 size={16} className="badge-icon" /> Biometric 2FA Active
                </div>
                <div className="security-badge-item">
                  <ShieldCheck size={16} className="badge-icon" /> AES-256 Cloud Vault
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <div className="settings-right-col">
          <motion.div variants={itemVariants} className="settings-section-card">
            <div className="section-header-row">
              <div>
                <h2 className="section-heading">Financial Connections</h2>
                <p className="section-subheading">Manage your linked accounts and data sync intervals.</p>
              </div>
              <button className="link-account-btn">Link New Account</button>
            </div>
            <div className="connections-list">
              <ConnectionItem icon={Landmark} name="Primary Bank" meta="Linked via secure API" amount={`₹${summary?.totalIncome.toLocaleString('en-IN') || 0}`} status="CONNECTED" />
              <ConnectionItem icon={CreditCard} name="Spend Account" meta="Real-time tracking" amount={`-₹${summary?.totalExpense.toLocaleString('en-IN') || 0}`} status="CONNECTED" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="settings-section-card">
            <h2 className="section-heading">System Preferences</h2>
            <div className="preferences-grid">
              <PreferenceCard icon={Globe} title="Locale & Currency" rows={[
                { label: "Default Display", value: "INR (₹)", colorClass: "teal" },
                { label: "Timezone", value: "IST (GMT +5:30)" }
              ]} />
              <PreferenceCard icon={Bell} title="Alert Thresholds" rows={[
                { label: "Large Expense Alert", value: "> ₹50,000" },
                { label: "Daily Digest", value: "08:00 AM", colorClass: "teal" }
              ]} />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="settings-section-card privileged-section">
              <div className="privileged-content">
                <div className="privileged-info">
                  <AlertTriangle size={24} className="privileged-icon" />
                  <div>
                    <h3 className="privileged-title">Privileged Actions</h3>
                    <p className="privileged-desc">Download a full vault export or permanently de-provision this account.</p>
                  </div>
                </div>
                <div className="privileged-actions">
                  <button className="btn-export">Export Data</button>
                  <button className="btn-close-account">Close Account</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Settings;

export default Settings;
