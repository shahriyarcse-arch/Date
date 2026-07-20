import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { db } from '../db';

// High-Quality SVG Icons for a Professional & Consistent Look
const Icons = {
  Heart: () => (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)', filter: 'drop-shadow(0 8px 20px var(--primary-glow))' }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  User: () => (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  LocationPin: () => (
    <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  FoodFork: () => (
    <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  Calendar: () => (
    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  SuccessBadge: () => (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 8px 15px var(--primary-glow))' }}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  Cafe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  Restaurant: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 22V2h-2v20M2 10V2h2v8M6 2v8h2V2M10 2v8h2V2M6 22v-8h6v8" />
    </svg>
  ),
  Park: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 22h20L12 2z" />
      <path d="M12 6l-6 12h12L12 6z" />
    </svg>
  ),
  Rooftop: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22h20M4 22V10h16v12M12 4v6M8 6h8" />
    </svg>
  ),
  CoffeeDessert: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4zM4 14h16v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5z" />
      <circle cx="12" cy="11" r="1" />
    </svg>
  ),
  PizzaPasta: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 11l-9 9M19 5l-7 7M22 2L2 22h20V2z" />
    </svg>
  ),
  SushiAsian: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="20" height="12" rx="4" />
      <ellipse cx="7" cy="14" rx="2" ry="4" />
      <ellipse cx="17" cy="14" rx="2" ry="4" />
    </svg>
  ),
  Movie: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
      <line x1="7" y1="2" x2="7" y2="22"/>
      <line x1="17" y1="2" x2="17" y2="22"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="2" y1="7" x2="7" y2="7"/>
      <line x1="2" y1="17" x2="7" y2="17"/>
      <line x1="17" y1="17" x2="22" y2="17"/>
      <line x1="17" y1="7" x2="22" y2="7"/>
    </svg>
  ),
  Art: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="9" r="1" />
      <circle cx="15" cy="9" r="1" />
      <path d="M12 16c2.5 0 5-1.5 5-3H7c0 1.5 2.5 3 5 3z" />
      <path d="M7.5 13.5a1.5 1.5 0 0 1-3 0" />
    </svg>
  ),
  Shopping: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  LocalSpicy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10c4.5 0 8-3.5 10-8H2" />
    </svg>
  ),
  Burger: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  Biryani: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M22 15c0-1.7-1.3-3-3-3H5c-1.7 0-3 1.3-3 3" />
      <path d="M12 12c-1.6 0-3-1.4-3-3 0-2.5 3-6 3-6s3 3.5 3 6c0 1.6-1.4 3-3 3z" />
      <path d="M6 10c-1.1 0-2-1-2-2 0-1.7 2-4 2-4s2 2.3 2 4c0 1-1 2-2 2z" />
      <path d="M18 10c-1.1 0-2-1-2-2 0-1.7 2-4 2-4s2 2.3 2 4c0 1-1 2-2 2z" />
    </svg>
  ),
  IceCream: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 11v8a5 5 0 0 0 10 0v-8" />
      <path d="M12 3a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V8a5 5 0 0 0-5-5Z" />
      <path d="M12 22v-3" />
    </svg>
  ),
  CoffeeCup: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  ),
  Stars: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20" />
      <path d="m19 5-3.5 3.5L12 5l3.5 3.5L19 5zM5 19l3.5-3.5L5 12l3.5 3.5L5 19z" />
    </svg>
  ),
  Sun: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  CloudSun: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41" />
      <path d="M15.28 18.28A6 6 0 1 0 7 15H6a4 4 0 0 0 0 8h9.5a3.5 3.5 0 0 0 .78-7" />
    </svg>
  ),
  Sunset: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 18a5 5 0 0 0-10 0M12 9v4M19 13.5l-1.5-1.5M5 13.5L6.5 12M2 22h20M12 2v3M4.9 6.4l1.4 1.4M19.1 6.4l-1.4 1.4" />
    </svg>
  ),
  Moon: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  HeartMini: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary)', opacity: 0.8 }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  ShieldAlert: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4M12 16h.01" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M12 3v1M12 20v1M3 12h1M20 12h1M5.9 5.9l.7.7M17.4 17.4l.7.7M17.4 6.6l-.7.7M6.6 17.4l-.7.7" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  VolumeHigh: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  VolumeMute: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ),
  // ── Modern Emoji Replacements (inline SVG icons) ──
  EmojiHeart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="emoji-icon">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  EmojiSparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <path d="M12 3v1M12 20v1M3 12h1M20 12h1M5.9 5.9l.7.7M17.4 17.4l.7.7M17.4 6.6l-.7.7M6.6 17.4l-.7.7" />
    </svg>
  ),
  EmojiWink: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="10" r="1.5" />
      <line x1="14" y1="10" x2="16.5" y2="10" />
      <path d="M8 15c0 0 1.5 3 4 3s4-3 4-3" />
    </svg>
  ),
  EmojiTearJoy: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 10c0 0 1-1 2-1s2 1 2 1" />
      <path d="M12 10c0 0 1-1 2-1s2 1 2 1" />
      <path d="M16 14c0 0-1.5 3-4 3s-4-3-4-3" />
      <path d="M6 12c0 1 .5 1.5 1 1.5" />
      <path d="M17 12c0 1-.5 1.5-1 1.5" />
    </svg>
  ),
  EmojiSmirk: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <path d="M16 14c0 0-1 3.5-4 3.5s-4-3.5-4-3.5" />
      <line x1="18" y1="7.5" x2="16" y2="8.5" />
    </svg>
  ),
  EmojiYum: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 10c0 0 1-1 2-1s2 1 2 1" />
      <path d="M12 10c0 0 1-1 2-1s2 1 2 1" />
      <path d="M8 15.5c1 1.5 3 2 4 2s3-.5 4-2" />
      <path d="M13 14.5c0 0 .5 1.5 1 1.5s1-1.5 1-1.5" />
    </svg>
  ),
  EmojiHeartFace: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 11c0 0 1-1.5 2-1.5s2 1.5 2 1.5" />
      <path d="M12 11c0 0 1-1.5 2-1.5s2 1.5 2 1.5" />
      <path d="M16 14.5c0 0-1.5 3-4 3s-4-3-4-3" />
      <path d="M5 9c1-1 2-1.5 3-1" fill="currentColor" opacity="0.25" />
      <path d="M19 9c-1-1-2-1.5-3-1" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  EmojiClock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <circle cx="12" cy="13" r="8" />
      <polyline points="12 9 12 13 15 15" />
      <path d="M5 3L2 6" />
      <path d="M19 3l3 6" />
    </svg>
  ),
  EmojiCalendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  EmojiPin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  EmojiBurger: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="emoji-icon">
      <path d="M3 15h18" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
      <path d="M6 11c0-2 2-5 6-5s6 3 6 5" />
      <path d="M5 11a1 1 0 0 1-1-1c0-1 1-3 2-3" />
      <path d="M19 11a1 1 0 0 0 1-1c0-1-1-3-2-3" />
      <circle cx="9" cy="14" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="15" cy="14" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  )
};

export default function ProposalFlow({ customParams = {} }) {
  const senderName = customParams.by || '';
  const recipientName = customParams.to || '';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: recipientName,
    location: '',
    food: '',
    date: '',
    time: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDodged, setIsDodged] = useState(false);
  const [noBtnStyle, setNoBtnStyle] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });
  const noBtnPosRef = useRef({ x: 0, y: 0 });
  const btnContainerRef = useRef(null);
  const noBtnRef = useRef(null);
  const dodgeCount = useRef(0);
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Trigger confetti when we reach Step 6
  useEffect(() => {
    if (step === 6) {
      // Fire confetti multiple times for a beautiful fireworks effect!
      const duration = 6 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // fire from left and right corners
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [step]);

  // Attempt to play audio on first user click/touch
  const startAudio = async () => {
    if (!audioRef.current) return;
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
      }
      audioRef.current.muted = false;
      setIsMuted(false);
    } catch (err) {
      // Autoplay blocked by browser — user must click the toggle button
      console.warn("Audio autoplay blocked:", err?.message);
    }
  };

  const toggleMute = async (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    
    try {
      const wasPaused = audioRef.current.paused;
      if (wasPaused) {
        // First click — start playback, force unmuted
        await audioRef.current.play();
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        // Already playing — just toggle mute
        const nextMuted = !audioRef.current.muted;
        audioRef.current.muted = nextMuted;
        setIsMuted(nextMuted);
      }
    } catch (err) {
      console.warn("Audio toggle failed:", err?.message);
    }
  };

  // Generate floating background hearts
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      const newHeart = {
        id,
        left: Math.random() * 100 + 'vw',
        fontSize: Math.random() * 20 + 20 + 'px',
        animationDuration: Math.random() * 3 + 5 + 's',
      };
      setHearts(prev => [...prev.slice(-12), newHeart]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Core dodge function — moves No button to absolute screen coordinates
  const dodgeNoButton = useCallback(() => {
    if (!noBtnRef.current) return;

    const cur = noBtnPosRef.current;

    // Keep movement constrained to a safe box around its original position
    const isMobile = window.innerWidth < 500;
    const maxMoveX = isMobile ? 100 : 200;
    const maxMoveY = isMobile ? 120 : 200;
    
    const minX = -maxMoveX;
    const maxX = maxMoveX;
    const minY = -maxMoveY;
    const maxY = maxMoveY;

    let newX, newY, attempts = 0;
    do {
      newX = minX + Math.random() * (maxX - minX);
      newY = minY + Math.random() * (maxY - minY);
      attempts++;
    } while (
      isDodged &&
      Math.sqrt((newX - cur.x) ** 2 + (newY - cur.y) ** 2) < 80 &&
      attempts < 30
    );

    noBtnPosRef.current = { x: newX, y: newY };
    dodgeCount.current += 1;
    setIsDodged(true);

    const rot = (Math.random() - 0.5) * 50;
    const scl = 0.85 + Math.random() * 0.3;

    setNoBtnStyle({ x: newX, y: newY, rotate: rot, scale: scl });
  }, [isDodged]);

  // Proximity detection: triggers dodge ONLY when pointer is fully on top of the No button
  useEffect(() => {
    if (step !== 1) return;

    const onPointerMove = (e) => {
      if (!noBtnRef.current) return;

      const rect = noBtnRef.current.getBoundingClientRect();

      // Extract coordinates: works for mouse, touch, and emulators
      let clientX = e.clientX;
      let clientY = e.clientY;

      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if (e.changedTouches && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      }

      // Check if touch/cursor is directly on the button (no extra padding)
      const isNearby =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isNearby) {
        // Prevent scroll on mobile during touch interaction
        if (e.cancelable) {
          e.preventDefault();
        }
        dodgeNoButton();
      }
    };

    // Use pointermove to capture mouse, touch, and emulator hovers uniformly
    window.addEventListener('pointermove', onPointerMove);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [step, dodgeNoButton]);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  const selectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'location' || field === 'food') {
      setStep(s => s + 1);
    }
  };
  const handleSubmit = async () => {
    // Rate limit check: Prevent submitting more than once every 3 minutes to stop spamming
    const lastSubmit = localStorage.getItem('last_submit_timestamp');
    const now = Date.now();
    if (lastSubmit && (now - parseInt(lastSubmit, 10)) < 3 * 60 * 1000) {
      alert("Hold on, beautiful! You've already locked in a date proposal. Let's wait a moment! 🥰");
      return;
    }

    if (isSubmitting) return;
    localStorage.setItem('last_submit_timestamp', now.toString());
    setIsSubmitting(true);
    
    // Optimistic UI update: Go to confirmation screen instantly!
    setStep(6);
    
    try {
      // Save to Supabase in the background, tag with sender name for filtering
      const dataToSave = { ...formData };
      if (senderName) {
        dataToSave.created_by = senderName;
      }
      await db.saveResponse(dataToSave);
    } catch (err) {
      console.error('Background network submit failed:', err);
      // Optional: alert or handle background failure silently to not ruin the romantic moment,
      // but showing a warning is safe. Let's log it.
    } finally {
      setIsSubmitting(false);
    }
  };

  const locations = [
    { id: 'Cafe', label: 'Cozy Cafe', desc: 'Coffee so good we might forget our names', icon: <Icons.Cafe /> },
    { id: 'Restaurant', label: 'Nice Dinner', desc: 'Candlelight, you, me... perfect', icon: <Icons.Restaurant /> },
    { id: 'Park', label: 'Scenic Park', desc: 'A romantic stroll under the trees', icon: <Icons.Park /> },
    { id: 'Rooftop', label: 'Rooftop', desc: 'City lights and starry nights', icon: <Icons.Rooftop /> },
    { id: 'Movie', label: 'Movie Theater', desc: 'Dark room, big screen, holding hands', icon: <Icons.Movie /> },
    { id: 'Art', label: 'Art Gallery', desc: 'Get lost in beauty together', icon: <Icons.Art /> },
    { id: 'Shopping', label: 'Shopping Mall', desc: 'Walk around and laugh for hours', icon: <Icons.Shopping /> }
  ];

  const foods = [
    { id: 'Coffee & Dessert', label: 'Coffee & Dessert', desc: 'Sweet treats, sweeter company', icon: <Icons.CoffeeDessert /> },
    { id: 'Pizza & Pasta', label: 'Pizza & Pasta', desc: 'Nothing brings people closer', icon: <Icons.PizzaPasta /> },
    { id: 'Sushi & Asian', label: 'Sushi & Asian', desc: 'Adventurous bites for two', icon: <Icons.SushiAsian /> },
    { id: 'Fuchka & Chotpoti', label: 'Fuchka & Street Food', desc: 'Spicy, messy, unforgettable', icon: <Icons.LocalSpicy /> },
    { id: 'Burger & Fries', label: 'Burger & Fries', desc: 'Classic and delicious, like us', icon: <Icons.Burger /> },
    { id: 'Biryani', label: 'Biryani', desc: 'Aromatic love in every bite', icon: <Icons.Biryani /> },
    { id: 'Ice Cream', label: 'Ice Cream', desc: 'Cold, sweet, and melts our hearts', icon: <Icons.IceCream /> }
  ];

  // Motion config — clean fade transition with zero sliding or scaling to prevent layout shifting
  const stepMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.12, ease: "easeOut" }
  };

  return (
    <div className={`flow-wrapper ${step === 1 ? 'no-scroll' : ''}`} onClick={startAudio} onTouchStart={startAudio}>
      {/* Background Audio — Always With Me (flute version) from Spirited Away */}
      <audio 
        ref={audioRef} 
        src="/always-with-me.mp3" 
        loop 
        preload="auto"
      />

      {/* Floating Sound Toggle */}          <motion.button
        className="sound-toggle-btn"
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        title={isMuted ? "Unmute Background Music" : "Mute Background Music"}
      >
        {isMuted ? <Icons.VolumeMute /> : <Icons.VolumeHigh />}
      </motion.button>

      {/* Floating Hearts Background */}
      <div className="hearts-container">
        {hearts.map(h => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: h.left,
              width: h.fontSize,
              height: h.fontSize,
              animationDuration: h.animationDuration,
              display: 'block'
            }}
          >
            <Icons.HeartMini />
          </span>
        ))}
      </div>

      {/* Step Progress Indicator — Modern Design */}
      {step > 1 && step < 6 && (
        <div className="step-progress">
          <div className="step-progress-track">
            {[2, 3, 4, 5].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`step-dot ${step === s ? 'active' : step > s ? 'completed' : ''}`} />
                {i < 3 && (
                  <div className={`step-connector ${step > s ? 'completed' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <span className="step-label">
            <strong>{step - 1}</strong>/4
          </span>
        </div>
      )}

      {/* Slide Transition Wrapper */}
      <AnimatePresence mode="wait">
        
        {/* Screen 1: Will you go on a date with me? */}
        {step === 1 && (
          <motion.div key="step1" {...stepMotion} className="glass-container">
             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Icons.Heart />
            </div>
             <h1>{senderName ? <>Hey {recipientName || 'beautiful'}... will you go on a date with {senderName}? <Icons.EmojiHeart /></> : 'Will you go on a date with me?'}</h1>
             <p>{senderName ? <>{senderName} has a perfect day planned for you two... <Icons.EmojiWink /></> : <>I've got the perfect plan for us... just waiting for your yes <Icons.EmojiWink /></>}</p>
            
            <div className="btn-container" ref={btnContainerRef}>
              <motion.button 
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary btn-yes" 
                onClick={handleNext}
                aria-label="Say yes to the date proposal"
              >
                Yes! <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ opacity: 0.9 }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </motion.button>
              <motion.button 
                ref={noBtnRef}
                className="btn-no" 
                animate={{ 
                  x: noBtnStyle.x, 
                  y: noBtnStyle.y, 
                  rotate: noBtnStyle.rotate, 
                  scale: noBtnStyle.scale 
                }}
                transition={{ type: "spring", stiffness: 220, damping: 14, mass: 0.4 }}
                onClick={dodgeNoButton}
                aria-label="Say no (if you dare!)"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.4rem',
                  zIndex: 999,
                  pointerEvents: 'auto'
                }}
              >
                <Icons.ShieldAlert /> No
              </motion.button>
            </div>

          </motion.div>
        )}

        {/* Screen 2: Enter Name */}
        {step === 2 && (
          <motion.div key="step2" {...stepMotion} className="glass-container">
             <button className="btn-back" onClick={handleBack}>← Back</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Icons.User />
            </div>
             <h1>Yay! You made my day! <Icons.EmojiTearJoy /></h1>
             <p>Now tell me your name so I know what to call my date:</p>
            
            <input 
              type="text" 
              placeholder="Your name (or just 'My Love')..." 
              className="input-field"
              value={formData.name}
              onChange={(e) => selectOption('name', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && formData.name.trim()) {
                  handleNext();
                }
              }}
              aria-label="Enter your name"
              autoComplete="name"
              autoFocus
            />
            
            <div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary" 
                onClick={handleNext}
                disabled={!formData.name.trim()}
                aria-label="Continue to choose location"
              >
                Continue <Icons.Sparkles />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Screen 3: Choose Location */}
        {step === 3 && (
          <motion.div key="step3" {...stepMotion} className="glass-container wide">
            <button className="btn-back" onClick={handleBack}>← Back</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Icons.LocationPin />
            </div>
             <h1>Where should I take you?</h1>
             <p>Pick our vibe for the perfect first date: <Icons.EmojiSparkles /></p>
            
            <div className="options-grid">
              {locations.map((loc, idx) => (
                <motion.div 
                  key={loc.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`option-card ${formData.location === loc.id ? 'selected' : ''}`}
                  onClick={() => selectOption('location', loc.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOption('location', loc.id); } }}
                  aria-label={`Select ${loc.label} as location`}
                >
                  <div className="option-emoji">{loc.icon}</div>
                  <div className="option-label">{loc.label}</div>
                  <div className="option-desc">{loc.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Screen 4: Choose Cuisine */}
        {step === 4 && (
          <motion.div key="step4" {...stepMotion} className="glass-container wide">
            <button className="btn-back" onClick={handleBack}>← Back</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Icons.FoodFork />
            </div>
             <h1>What are we eating? <Icons.EmojiSmirk /></h1>
             <p>Pick something delicious for our date: <Icons.EmojiYum /></p>
            
            <div className="options-grid">
              {foods.map((food, idx) => (
                <motion.div 
                  key={food.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`option-card ${formData.food === food.id ? 'selected' : ''}`}
                  onClick={() => selectOption('food', food.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOption('food', food.id); } }}
                  aria-label={`Select ${food.label} as food preference`}
                >
                  <div className="option-emoji">{food.icon}</div>
                  <div className="option-label">{food.label}</div>
                  <div className="option-desc">{food.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Screen 5: Choose Date and Time */}
        {step === 5 && (() => {
          const today = new Date();
          const currentMonth = formData._calMonth ?? today.getMonth();
          const currentYear = formData._calYear ?? today.getFullYear();
          const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
          const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
          const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
          const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

          const prevMonth = () => {
            let m = currentMonth - 1, y = currentYear;
            if (m < 0) { m = 11; y--; }
            setFormData(p => ({ ...p, _calMonth: m, _calYear: y }));
          };
          const nextMonth = () => {
            let m = currentMonth + 1, y = currentYear;
            if (m > 11) { m = 0; y++; }
            setFormData(p => ({ ...p, _calMonth: m, _calYear: y }));
          };

          const selectDate = (day) => {
            const mm = String(currentMonth + 1).padStart(2, '0');
            const dd = String(day).padStart(2, '0');
            const dateStr = `${currentYear}-${mm}-${dd}`;
            selectOption('date', dateStr);
          };

          const isToday = (day) => {
            return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
          };
          const isPast = (day) => {
            const d = new Date(currentYear, currentMonth, day);
            const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            return d < t;
          };
          const isSelected = (day) => {
            const mm = String(currentMonth + 1).padStart(2, '0');
            const dd = String(day).padStart(2, '0');
            return formData.date === `${currentYear}-${mm}-${dd}`;
          };

          const timeSlots = [
            { id: 'Breakfast', label: 'Breakfast', emoji: <Icons.CoffeeCup />, desc: '8 AM – 10 AM' },
            { id: 'Brunch', label: 'Brunch', emoji: <Icons.Sun />, desc: '10 AM – 12 PM' },
            { id: 'Lunch', label: 'Lunch Time', emoji: <Icons.CloudSun />, desc: '1 PM – 3 PM' },
            { id: 'LateAfternoon', label: 'Late Afternoon', emoji: <Icons.CoffeeDessert />, desc: '4 PM – 6 PM' },
            { id: 'Dinner', label: 'Dinner Time', emoji: <Icons.Sunset />, desc: '7 PM – 9 PM' },
            { id: 'LateNight', label: 'Late Night', emoji: <Icons.Moon />, desc: '10 PM – 12 AM' },
          ];

          return (
          <motion.div key="step5" {...stepMotion} className="glass-container wide">
            <button className="btn-back" onClick={handleBack}>← Back</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Icons.Calendar />
            </div>
             <h1>When's our date?</h1>
             <p>Pick the perfect day and time: <Icons.EmojiCalendar /></p>

            {/* Custom Calendar */}
            <div className="custom-calendar">
              <div className="cal-header">
                <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
                <span className="cal-month-title">{monthNames[currentMonth]} {currentYear}</span>
                <button className="cal-nav-btn" onClick={nextMonth}>›</button>
              </div>
              <div className="cal-days-header">
                {dayNames.map(d => <div key={d} className="cal-day-name">{d}</div>)}
              </div>
              <div className="cal-grid">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="cal-cell cal-empty"></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const past = isPast(day);
                  return (
                    <motion.div
                      key={day}
                      whileHover={!past ? { scale: 1.15 } : {}}
                      whileTap={!past ? { scale: 0.9 } : {}}
                      className={`cal-cell ${isSelected(day) ? 'cal-selected' : ''} ${isToday(day) ? 'cal-today' : ''} ${past ? 'cal-disabled' : ''}`}
                      onClick={() => !past && selectDate(day)}
                      role={past ? undefined : "button"}
                      tabIndex={past ? -1 : 0}
                      onKeyDown={(e) => { if (!past && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); selectDate(day); } }}
                      aria-label={past ? undefined : `Select ${monthNames[currentMonth]} ${day}, ${currentYear}`}
                      aria-disabled={past || undefined}
                    >
                      {day}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Cards */}
            <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 800, color: 'var(--text)', margin: '2.5rem 0 1.5rem', width: '100%', textAlign: 'left' }}>Pick the Perfect Time</h2>
            <div className="time-slots-grid">
              {timeSlots.map((slot, idx) => (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`time-slot-card ${formData.time === slot.id ? 'selected' : ''}`}
                  onClick={() => selectOption('time', slot.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOption('time', slot.id); } }}
                  aria-label={`Select ${slot.label} time slot`}
                >
                  <span className="time-slot-emoji">{slot.emoji}</span>
                  <span className="time-slot-label">{slot.label}</span>
                  <span className="time-slot-desc">{slot.desc}</span>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.96 } : {}}
              className="btn-primary" 
              onClick={handleSubmit}
              disabled={!formData.date || !formData.time || isSubmitting}
              style={{ marginTop: '2.5rem' }}
            >
              {isSubmitting ? 'Locking our date in...' : <>Lock In Our Date, Love! <Icons.EmojiHeart /></>} <Icons.ShieldAlert />
            </motion.button>
          </motion.div>
          );
        })()}

        {/* Screen 6: Confirmation Screen */}
        {step === 6 && (
          <motion.div key="step6" {...stepMotion} className="glass-container" role="status" aria-live="polite">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Icons.SuccessBadge />
            </div>
             <h1>It's a Date! <Icons.EmojiHeart /></h1>
             <p style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '1.5rem' }}>
               {senderName 
                 ? <>Can't wait to see you, {formData.name}! <Icons.EmojiSparkles /></>
                 : <>I can't wait to see you, {formData.name}! <Icons.EmojiSparkles /></>
               }
             </p>
             <p style={{ fontSize: '1.5rem', lineHeight: '1.8' }}>
               Our plan:
               <br />
               <Icons.EmojiPin /> <strong>{formData.location}</strong>
               <br />
               <Icons.EmojiBurger /> <strong>{formData.food}</strong>
               <br />
               <Icons.EmojiClock /> <strong>{formData.date}</strong> at <strong>{formData.time}</strong>
             </p>
              <div style={{ borderTop: '2px solid var(--card-border)', paddingTop: '2.5rem', marginTop: '2.5rem' }}>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                  {senderName 
                    ? <>See you soon! <Icons.EmojiHeartFace /></>
                    : <>See you soon, beautiful! <Icons.EmojiHeartFace /></>
                  }
                </p>

              </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
