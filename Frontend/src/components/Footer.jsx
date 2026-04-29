import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="main-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-content">
        <div className="footer-copyright">
          © {currentYear} TRACKIFY ELITE. ALL RIGHTS RESERVED.
        </div>
        <nav className="footer-nav">
          <a href="#" className="footer-link">PRIVACY POLICY</a>
          <a href="#" className="footer-link">TERMS OF SERVICE</a>
          <a href="#" className="footer-link">SECURITY</a>
          <a href="#" className="footer-link">SUPPORT</a>
        </nav>
      </div>
    </motion.footer>
  );
};

export default Footer;
