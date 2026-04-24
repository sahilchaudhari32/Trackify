import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Check, Shield, Zap, PieChart, BarChart3, Bell, TrendingUp, Layers, Layout, Globe, Sparkles, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// --- Shared Variants ---
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

// --- Reusable UI Components ---
const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
  <motion.div className="feature-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}>
    <div className="feature-icon-box"><Icon size={24} /></div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </motion.div>
);

const SectionHeader = ({ label, title, subtitle, centered }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className={centered ? 'text-center' : ''}>
    {label && <span className="section-label">{label}</span>}
    <h2 className="section-title">{title}</h2>
    <p className={`section-subtitle ${centered ? 'centered' : ''}`}>{subtitle}</p>
  </motion.div>
);

const PricingCard = ({ title, price, features, popular, btnText, secondary }) => (
  <motion.div className={`pricing-card ${popular ? 'popular' : ''}`} whileHover={{ y: -10 }}>
    {popular && <div className="popular-badge">RECOMMENDED</div>}
    <h3 className="price-title">{title}</h3>
    <div className="price-value">{price.split('<span>')[0]}<span>{price.includes('<span>') ? price.split('<span>')[1].replace('</span>', '') : ''}</span></div>
    <div className="pricing-features">
      {features.map((f, i) => <div key={i} className="pricing-feature-item"><Check size={16} /> {f}</div>)}
    </div>
    <Link to="/signup" className={`btn-pricing ${secondary ? 'secondary' : 'primary'}`} style={{ display: 'block', textDecoration: 'none' }}>
      {btnText}
    </Link>
  </motion.div>
);

const BudgetItem = ({ label, usage, percent, color, delay }) => (
  <div className="budget-item-v2">
    <div className="budget-header-v2">
      <span>{label}</span>
      <span className={`usage-text ${color === 'rose' ? 'rose' : color === 'green' ? 'green' : ''}`}>{usage}</span>
    </div>
    <div className="progress-bg-v2">
      <motion.div 
        className={`progress-fill-v2 ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.min(percent, 100)}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay }}
      />
    </div>
  </div>
);

// --- Page Sections ---
const Header = () => (
  <header className="landing-header">
    <div className="landing-logo">
      <img src="https://www.image2url.com/r2/default/images/1776834249896-92b9b25d-757c-478a-99f8-2c6279cdb58e.png" alt="Logo" className="logo-img-small" />
      <span>Trackify</span>
    </div>
    <nav className="landing-nav">
      {['Features', 'Analytics', 'Pricing'].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}
    </nav>
    <div className="header-actions">
      <Link to="/login" className="btn-login">Login</Link>
      <Link to="/signup" className="btn-get-started">Get Started</Link>
    </div>
  </header>
);

const Hero = () => (
  <motion.section className="hero-section" variants={itemVariants}>
    <motion.span className="hero-tag" initial={{ opacity: 0, letterSpacing: '0.5em' }} animate={{ opacity: 1, letterSpacing: '0.2em' }} transition={{ duration: 1 }}>NEXT GENERATION FINANCE</motion.span>
    <motion.h1 className="hero-title">Your Financial Data. <span>Smarter.</span></motion.h1>
    <p className="hero-subtitle">Track transactions, analyze spending, and receive AI-powered insights in real time.</p>
    <div className="hero-cta">
      <Link to="/signup" className="btn-hero-primary">Get Started Free <ArrowRight size={18} /></Link>
      <button className="btn-hero-secondary"><Play size={18} fill="white" /> Live Demo</button>
    </div>
    <div className="hero-image-wrapper">
      <motion.img src="https://www.image2url.com/r2/default/images/1776945781312-cca83947-96b2-4d7e-8030-7826a05ce76c.png" className="hero-image" animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <div className="floating-stats-card">
        {[['Total Balance', '₹4,82,950'], ['Growth', '+12.4%', 'teal'], ['Expenses', '₹42,300'], ['Income', '₹1,24,000', 'teal']].map(([l, v, c]) => (
          <div key={l} className="stat-item"><span className="stat-label">{l}</span><span className={`stat-value ${c || ''}`}>{v}</span></div>
        ))}
      </div>
    </div>
  </motion.section>
);

const Intelligence = () => (
  <motion.section id="analytics" className="intelligence-section" variants={itemVariants}>
    <SectionHeader title="Visual Intelligence" subtitle="Your wealth mapped out in stunning high-fidelity charts." centered />
    <div className="charts-grid-modern">
      <div className="chart-card-v2">
        <div className="chart-header-v2"><h3>Weekly Spending</h3><span className="trend-tag negative">-4% vs LW</span></div>
        <div className="spending-bars-v2">
          {[45, 65, 35, 95, 55, 75, 65].map((h, i) => (
            <div key={i} className="bar-wrapper"><motion.div className={`bar-fill ${i === 3 ? 'highlight' : ''}`} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 + (i * 0.1) }} /></div>
          ))}
        </div>
      </div>
      <div className="chart-card-v2 featured">
        <div className="chart-header-v2"><h3>Expense vs Income</h3><div className="chart-legend"><div className="legend-item"><span className="dot teal"></span> Income</div><div className="legend-item"><span className="dot rose"></span> Expense</div></div></div>
        <div className="line-chart-v2">
          <svg viewBox="0 0 400 160" className="w-full h-full">
            <motion.path d="M 10 140 Q 60 140, 110 90 T 210 110 T 310 40 T 400 10" fill="none" stroke="#19d4a8" strokeWidth="4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
            <motion.path d="M 10 150 Q 60 150, 110 130 T 210 140 T 310 120 T 400 90" fill="none" stroke="#f87171" strokeWidth="3" strokeDasharray="8,8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.3 }} />
          </svg>
        </div>
      </div>
      <div className="chart-card-v2">
        <div className="chart-header-v2"><h3>Category Breakdown</h3></div>
        <div className="donut-chart-v2">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#19d4a8" strokeWidth="10" strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} whileInView={{ strokeDashoffset: 251.2 * 0.3 }} viewport={{ once: true }} transition={{ duration: 1.5 }} strokeLinecap="round" />
            <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#f87171" strokeWidth="10" strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} whileInView={{ strokeDashoffset: 251.2 * 0.8 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2 }} strokeLinecap="round" transform="rotate(-90 50 50)" />
          </svg>
          <div className="donut-center-v2"><span className="donut-label">Top Spend</span><span className="donut-value">Food</span></div>
        </div>
      </div>
    </div>
  </motion.section>
);

const LandingPage = () => {
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  
  return (
    <motion.div className="landing-root" initial="hidden" animate="visible" variants={containerVariants}>
      <Header />
      <Hero />
      
      <motion.section id="features" className="features-section" variants={itemVariants}>
        <SectionHeader label="FEATURES" title="Powerful Financial Tools" subtitle="Everything you need to master your personal economy." />
        <div className="features-grid">
          <FeatureCard icon={Layers} title="Smart Expense Tracking" desc="Automatically sync every rupee spent." delay={0.1} />
          <FeatureCard icon={Zap} title="AI Categorization" desc="ML identifies transactions with 99% accuracy." delay={0.2} />
          <FeatureCard icon={Layout} title="Budget Control" desc="Set limits and get notified before you overspend." delay={0.3} />
          <FeatureCard icon={Bell} title="Real-time Alerts" desc="Instant notifications for suspicious activity." delay={0.4} />
          <FeatureCard icon={TrendingUp} title="Financial Insights" desc="Visual reports that reveal spending habits." delay={0.5} />
          <FeatureCard icon={PieChart} title="Subscription Detection" desc="Identify forgotten subscriptions." delay={0.6} />
        </div>
      </motion.section>

      <Intelligence />

      <motion.section className="ai-recommendation-section" variants={itemVariants}>
        <div className="ai-recommendation-card">
          <div className="ai-content-left">
            <div className="ai-badge"><Sparkles size={14} className="ai-sparkle" /> SMART AI RECOMMENDATION</div>
            <h2 className="ai-title">You can save <span>₹12,400</span> this month</h2>
            <p className="ai-description">Our AI detected that your spending on dining out is 24% higher than average.</p>
            <div className="ai-actions"><button className="btn-ai-primary">Apply Saving Plan</button><button className="btn-ai-secondary">View Details</button></div>
          </div>
          <div className="ai-content-right">
            <div className="budget-mini-card">
              <div className="mini-card-header"><div className="category-icon-box"><PieChart size={18} /></div><div className="category-info"><span className="cat-name">Food & Drinks</span><span className="cat-details">₹8,400 of ₹5,000 budget</span></div><span className="status-label over">Over Budget</span></div>
              <div className="mini-progress-bg"><motion.div className="mini-progress-fill over" initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} /></div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section className="budgets-section-v2" variants={itemVariants}>
        <SectionHeader title="Active Budgets" />
        <div className="budget-grid-modern">
          <BudgetItem label="Food" usage="48% used" percent={48} color="teal" />
          <BudgetItem label="Shopping" usage="120% used" percent={100} color="rose" delay={0.2} />
          <BudgetItem label="Savings Goal" usage="Goal Reached" percent={100} color="green" delay={0.4} />
        </div>
      </motion.section>

      <div className="trust-bar-modern">
        <div className="trust-item"><Shield size={20} className="trust-icon" /> Bank-level security</div>
        <div className="trust-item"><Lock size={20} className="trust-icon" /> 256-bit Encryption</div>
        <div className="trust-divider"></div>
        <div className="trust-item dim">Trusted by 10,000+ users worldwide</div>
      </div>

      <motion.section id="pricing" className="pricing-section" variants={itemVariants}>
        <SectionHeader title="Our Plans for benefits" centered />
        <div className="pricing-grid">
          <PricingCard title="Basic" price="₹0<span>/month</span>" features={['Up to 2 bank accounts', 'Manual expense logging', 'Basic monthly reports']} btnText="Join For Free" secondary />
          <PricingCard title="Pro" price="₹99<span>/month</span>" features={['Unlimited bank accounts', 'AI categorization', 'Savings insights', 'Priority support']} popular btnText="Get Full Access" />
          <PricingCard title="Elite" price="$150<span>/month</span>" features={['Wealth management AI', 'Tax optimization tools', 'Multi-currency support', '1-on-1 advisor access']} btnText="Choose Elite" secondary />
          <PricingCard title="Max" price="$250<span>/month</span>" features={['Custom API integration', 'Real-time market data', 'Dedicated account manager', 'Family account sharing']} btnText="Choose Max" secondary />
        </div>
      </motion.section>

      <motion.section className="cta-footer-section" variants={itemVariants}>
        <div className="cta-box">
          <h2>Start Tracking Your Money Today</h2><p>Join 50,000+ individuals who have mastered their financial future.</p>
          <Link to="/signup" className="btn-get-started" style={{ padding: '1rem 3rem', fontSize: '1.1rem', display: 'inline-block' }}>Create Free Account</Link>
        </div>
      </motion.section>

      <footer className="footer">
        <div className="footer-left"><div className="landing-logo"><img src="https://www.image2url.com/r2/default/images/1776834249896-92b9b25d-757c-478a-99f8-2c6279cdb58e.png" className="logo-img-small" /><span>Trackify</span></div><p className="footer-desc">© 2024 Trackify Financial. Professional-grade wealth management.</p></div>
        <div className="footer-nav">{['Features', 'Analytics', 'Pricing', 'Privacy', 'Terms'].map(n => <span key={n} className="nav-link">{n}</span>)}</div>
        <div className="footer-socials"><Globe className="social-link" size={20} /><TrendingUp className="social-link" size={20} /><Shield className="social-link" size={20} /></div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
