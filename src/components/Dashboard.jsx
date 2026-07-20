import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../db';

const Icons = {
  Lock: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Empty: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
      <path d="M22 12h-6l-3 3-3-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  Delete: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Home: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
};

export default function Dashboard({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Securely retrieve passcode from environment variables, fallback to 5040 for local dev if not set
  const CORRECT_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || '5040';

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode! Please try again.');
    }
  };

  const fetchResponses = async () => {
    setLoading(true);
    const data = await db.getResponses();
    setResponses(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchResponses();
      const interval = setInterval(() => {
        fetchResponses();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this response?')) {
      await db.deleteResponse(id);
      fetchResponses();
    }
  };

  const pageMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.12, ease: "easeOut" }
  };

  return (
    <div className="dashboard-wrapper">
      <AnimatePresence mode="wait">
        
        {!isAuthenticated ? (
          <motion.div key="login" {...pageMotion} className="glass-container">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Icons.Lock />
            </div>
            <h1>Admin Dashboard</h1>
            <p>Enter your secret passcode to view date responses:</p>
            
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                placeholder="Enter Passcode" 
                className="input-field"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
              {error && <p style={{ color: '#ff0a54', fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 600 }}>{error}</p>}
              
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button" 
                  className="btn-no" 
                  onClick={onBack}
                >
                  Back
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="btn-primary"
                  aria-label="Unlock admin dashboard"
                >
                  Unlock
                </motion.button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="dashboard" {...pageMotion} className="dashboard-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <h1>Proposal Responses</h1>
                <p style={{ margin: 0 }}>Review all submitted date proposals. (Updates in real-time)</p>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-no" 
                  onClick={fetchResponses}
                >
                  <Icons.Refresh /> Refresh
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary" 
                  onClick={onBack}
                >
                  <Icons.Home /> Home
                </motion.button>
              </div>
            </div>

            {loading && responses.length === 0 ? (
              <p style={{ marginTop: '3rem', fontSize: '1.5rem', textAlign: 'center' }}>Loading responses...</p>
            ) : responses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Icons.Empty />
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No responses yet</h3>
                <p style={{ fontSize: '1.3rem' }}>Share your link and wait for them to respond.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Food Preference</th>
                      <th>Date & Time</th>
                      <th>Received At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {responses.map((res, idx) => (
                        <motion.tr 
                          key={res.id || idx}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td style={{ fontWeight: 800, color: 'var(--primary)' }}>{res.name}</td>
                          <td>{res.location}</td>
                          <td>{res.food}</td>
                          <td>
                            <span style={{ fontWeight: 800 }}>{res.date}</span> at <span style={{ fontStyle: 'italic' }}>{res.time}</span>
                          </td>
                          <td style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                            {new Date(res.timestamp).toLocaleString()}
                          </td>
                          <td>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="delete-btn" 
                              onClick={() => handleDelete(res.id)}
                            >
                              <Icons.Delete /> Delete
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
}
