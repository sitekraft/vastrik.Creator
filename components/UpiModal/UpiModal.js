'use client';

import { useState, useEffect } from 'react';
import styles from './UpiModal.module.css';

export default function UpiModal() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function checkProfile() {
      if (typeof window !== 'undefined') {
        const storedEmail = localStorage.getItem('vastrik_creator_email');
        if (storedEmail) {
          setEmail(storedEmail);
          try {
            const res = await fetch(`/api/creator/profile?email=${encodeURIComponent(storedEmail)}`);
            const data = await res.json();
            if (data.success && data.profile) {
              if (!data.profile.upiId) {
                setShow(true); // Show modal if no UPI ID
              }
            } else {
              // If profile doesn't exist yet but they have access, they need to save UPI ID which will create profile
              setShow(true);
            }
          } catch (e) {
            console.error('Error fetching profile for UPI check', e);
          }
        }
      }
      setLoading(false);
    }
    
    checkProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    
    if (!upiId || !upiRegex.test(upiId.trim())) {
      setError('Please enter a valid UPI ID (e.g., name@ybl)');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/creator/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, upiId: upiId.trim() })
      });
      const data = await res.json();
      
      if (data.success) {
        // success, hide modal forever
        setShow(false);
      } else {
        setError(data.message || 'Failed to save UPI ID. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>💸</div>
        <h2 className={styles.title}>Action Required: Setup Payouts</h2>
        <p className={styles.subtitle}>
          Welcome to the Creator Dashboard! To process your rewards and view-based payouts, please link your UPI ID. You cannot access the dashboard without setting this up.
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Your UPI ID</label>
            <input
              type="text"
              placeholder="e.g. 9876543210@paytm"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          
          {error && <p className={styles.error}>{error}</p>}
          
          <button type="submit" className={styles.btn} disabled={submitting}>
            {submitting ? 'Verifying & Saving...' : 'Save UPI ID & Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
