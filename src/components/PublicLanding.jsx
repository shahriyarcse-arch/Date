import React from 'react';
import { motion } from 'framer-motion';

export default function PublicLanding() {
  return (
    <div className="flow-wrapper" style={{ justifyContent: 'flex-start', paddingTop: '3rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-container"
        style={{ maxWidth: '580px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="var(--primary)" style={{ filter: 'drop-shadow(0 8px 20px var(--primary-glow))' }}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <h1>A Date Proposal<br />Worth Saying Yes To 💕</h1>
        <p style={{ fontSize: 'clamp(1rem, 2.8vw, 1.2rem)', marginBottom: '2rem' }}>
          Someone special has created a beautiful date proposal just for you.<br />
          Take a moment — and say yes to love. 💖
        </p>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', opacity: 0.7, fontStyle: 'italic' }}>
          Every love story begins with a simple question...
        </p>
      </motion.div>
    </div>
  );
}
