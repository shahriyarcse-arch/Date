import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProposalFlow from './components/ProposalFlow';
import Dashboard from './components/Dashboard';
import PublicLanding from './components/PublicLanding';
import { db } from './db';

export default function App() {
  const [view, setView] = useState('proposal');
  const [params, setParams] = useState({ to: '', by: '', p: '' });
  const [resolveError, setResolveError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const toParam = urlParams.get('to') || '';
    const byParam = urlParams.get('by') || '';
    const pParam = urlParams.get('p') || '';
    const idParam = urlParams.get('id') || '';

    setParams({ to: toParam, by: byParam, p: pParam });

    if (idParam) {
      // Resolve short unique ID from the proposals table
      setView('resolving');
      db.getProposal(idParam).then(proposal => {
        if (proposal) {
          const query = new URLSearchParams({
            by: proposal.sender_name || '',
            to: proposal.recipient_name || '',
            p: proposal.passcode || ''
          });
          window.history.replaceState(null, '', '/?' + query.toString());
          setParams({ by: proposal.sender_name || '', to: proposal.recipient_name || '', p: proposal.passcode || '' });
          setView('proposal');
        } else {
          setResolveError('Proposal link not found. It may have been deleted or the link is invalid.');
          setTimeout(() => {
            setView('proposal');
            window.history.replaceState(null, '', '/');
          }, 2500);
        }
      }).catch(() => {
        setResolveError('Failed to load proposal. Redirecting...');
        setTimeout(() => {
          setView('proposal');
          window.history.replaceState(null, '', '/');
        }, 2500);
      });
    }
  }, []);

  const showDashboard = () => setView('dashboard');

  return (
    <>
      <div className="scroll-area">
        <AnimatePresence mode="wait">
          {view === 'proposal' ? (
            <ProposalFlow key="proposal" customParams={params} />
          ) : view === 'dashboard' ? (
            <Dashboard key="dashboard" onBack={() => setView('proposal')} />
          ) : view === 'resolving' ? (
            <motion.div
              key="resolving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-container"
              style={{ maxWidth: '450px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
              <h1 style={{ fontSize: '1.6rem' }}>{resolveError || 'Loading your proposal...'}</h1>
            </motion.div>
          ) : (
            <PublicLanding key="public" />
          )}
        </AnimatePresence>
      </div>

      {/* Floating admin trigger */}
      {(view === 'proposal') && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          whileHover={{ rotate: 45, scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="admin-trigger" 
          onClick={showDashboard}
          title="Admin Dashboard"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 9M18.5 4.5L20 6" />
          </svg>
        </motion.div>
      )}

      {/* Global branding footer — sits naturally below content */}
      <div className="global-footer">
        Made with <span style={{ display: 'inline-block', width: '18px', height: '18px', verticalAlign: 'middle', color: 'var(--primary)' }}><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span> by <a href="https://github.com/shahriyarcse-arch" target="_blank" rel="noopener noreferrer">Shahriyar</a> · 🎵 Always With Me (flute) — Spirited Away
      </div>
    </>
  );
}
