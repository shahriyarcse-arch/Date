import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../db';

const Icons = {
  Lock: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Empty: () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-6l-3 3-3-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
  Delete: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Home: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Pin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Fork: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
};

const CORRECT_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || '5040';

export default function Dashboard({ onBack }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === CORRECT_PASSCODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect passcode! Please try again.');
    }
  };

  const fetchResponses = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');

    if (!db.isConfigured()) {
      setSupabaseStatus(false);
      setError('Cannot connect: ' + (db.getInitError() || 'Supabase not configured. Check .env file.'));
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      const data = await db.getResponses();
      setResponses(data);
      setSupabaseStatus(true);
    } catch (err) {
      console.error('Failed to fetch responses:', err);
      setError('Database error: ' + (err.message || 'Unknown error'));
    }
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (!db.isConfigured()) {
      setSupabaseStatus(false);
    } else {
      setSupabaseStatus(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchResponses();

    const channel = db.subscribeToResponses(
      (newRow) => {
        setResponses((prev) => [newRow, ...prev]);
      },
      (oldRow) => {
        setResponses((prev) => prev.filter((r) => r.id !== oldRow.id));
      }
    );

    return () => {
      db.unsubscribe(channel);
    };
  }, [isAuthenticated, fetchResponses]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this response?')) {
      try {
        await db.deleteResponse(id);
        setResponses((prev) => prev.filter((r) => r.id !== id));
      } catch (err) {
        console.error('Failed to delete response:', err);
        setError('Failed to delete. Check console for details.');
      }
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
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
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

              {supabaseStatus === false && (
                <p style={{ color: 'var(--warning, #f59e0b)', fontSize: '1.1rem', marginBottom: '2rem', fontWeight: 600, textAlign: 'center' }}>
                  {db.getInitError() || 'Database not configured. Responses will not show.'}
                </p>
              )}

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
            <div className="dashboard-header">
              <div>
                <h1>Proposal Responses</h1>
                <p style={{ margin: 0 }}>Review all submitted date proposals.</p>
              </div>
              <div className="dashboard-actions">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-no"
                  onClick={() => fetchResponses(true)}
                  disabled={refreshing}
                  style={{ opacity: refreshing ? 0.6 : 1 }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span className={refreshing ? 'spin-icon' : ''}>
                      <Icons.Refresh />
                    </span>
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                  onClick={onBack}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Icons.Home /> Home
                  </span>
                </motion.button>
              </div>
            </div>

            {error && (
              <div className="dashboard-error">
                {error}
              </div>
            )}

            {loading && responses.length === 0 ? (
              <div className="dashboard-loading">
                <div className="loading-spinner" />
                <p>Loading responses...</p>
              </div>
            ) : !error && responses.length === 0 ? (
              <div className="dashboard-empty">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Icons.Empty />
                </div>
                <h3>No responses yet</h3>
                <p>Share your link and wait for them to respond.</p>
              </div>
            ) : (
              <>
                <div className="response-count">
                  <span className="count-badge">{responses.length}</span>
                  {responses.length === 1 ? ' response' : ' responses'} received
                </div>

                {/* Desktop Table View */}
                <div className="table-responsive desktop-only">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Food</th>
                        <th>Date & Time</th>
                        <th>Received</th>
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
                            transition={{ duration: 0.3, delay: idx * 0.03 }}
                          >
                            <td className="td-name">{res.name}</td>
                            <td>{res.location}</td>
                            <td>{res.food}</td>
                            <td>
                              <span className="td-date">{res.date}</span>
                              <span className="td-time">{res.time}</span>
                            </td>
                            <td className="td-muted">
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

                {/* Mobile Card View */}
                <div className="mobile-only">
                  <AnimatePresence>
                    {responses.map((res, idx) => (
                      <motion.div
                        key={res.id || idx}
                        className="response-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3, delay: idx * 0.04 }}
                      >
                        <div className="card-header">
                          <div className="card-name">
                            <Icons.User />
                            <span>{res.name}</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="card-delete-btn"
                            onClick={() => handleDelete(res.id)}
                            aria-label={`Delete response from ${res.name}`}
                          >
                            <Icons.Delete />
                          </motion.button>
                        </div>
                        <div className="card-body">
                          <div className="card-field">
                            <Icons.Pin />
                            <span>{res.location}</span>
                          </div>
                          <div className="card-field">
                            <Icons.Fork />
                            <span>{res.food}</span>
                          </div>
                          <div className="card-field">
                            <Icons.Calendar />
                            <span>{res.date}</span>
                          </div>
                          <div className="card-field">
                            <Icons.Clock />
                            <span>{res.time}</span>
                          </div>
                        </div>
                        <div className="card-footer">
                          {new Date(res.timestamp).toLocaleString()}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
