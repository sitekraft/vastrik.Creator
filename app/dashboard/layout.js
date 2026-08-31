'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './layout.module.css';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [creatorEmail, setCreatorEmail] = useState('');
  const [unlockEmailInput, setUnlockEmailInput] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    async function verifyAccess() {
      // 1. Check if user is authenticated via NextAuth session
      if (session) {
        setHasAccess(true);
        setCheckingAccess(false);
        return;
      }

      // 2. Check if user has an approved email stored locally
      if (typeof window !== 'undefined') {
        const storedEmail = localStorage.getItem('vastrik_creator_email');
        if (storedEmail) {
          setCreatorEmail(storedEmail);
          try {
            const res = await fetch(`/api/status?q=${encodeURIComponent(storedEmail)}`);
            const data = await res.json();
            if (data.success && data.application && data.application.status === 'Approved') {
              setHasAccess(true);
            }
          } catch (e) {
            console.error('Access verification error', e);
          }
        }
      }
      setCheckingAccess(false);
    }

    if (status !== 'loading') {
      verifyAccess();
    }
  }, [session, status]);

  const handleUnlockWithEmail = async (e) => {
    e.preventDefault();
    if (!unlockEmailInput.trim()) return;
    setUnlocking(true);
    setUnlockError('');

    try {
      const res = await fetch(`/api/status?q=${encodeURIComponent(unlockEmailInput.trim())}`);
      const data = await res.json();
      if (data.success && data.application) {
        if (data.application.status === 'Approved') {
          if (typeof window !== 'undefined') {
            localStorage.setItem('vastrik_creator_email', data.application.email);
          }
          setHasAccess(true);
        } else {
          setUnlockError(`Your application is currently "${data.application.status}". Access will unlock once approved.`);
        }
      } else {
        setUnlockError('No application found for this email. Please apply first.');
      }
    } catch (err) {
      console.error(err);
      setUnlockError('Could not verify access. Please try again.');
    } finally {
      setUnlocking(false);
    }
  };

  if (checkingAccess) {
    return (
      <div className={styles.gateWrapper}>
        <div className={styles.gateLoading}>
          <div className={styles.spinner}></div>
          <p>Verifying Vastrik Creator Atelier credentials...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not approved, show the Gated Enrollment Screen
  if (!hasAccess) {
    return (
      <div className={styles.gateWrapper}>
        <div className={styles.gateCard}>
          <div className={styles.gateTag}>
            <span>🔒</span> CREATOR ACCESS REQUIRED
          </div>

          <h1 className={styles.gateTitle}>
            JOIN THE VASTRIK<br />
            <span className="gradient-text">CREATOR ATELIER</span>
          </h1>

          <p className={styles.gateSubtitle}>
            The Creator Dashboard, active campaign briefs, and view-based payout tools are exclusively available to enrolled and approved creators.
          </p>

          <div className={styles.gateActions}>
            <Link href="/apply" className="btn-primary" style={{ padding: '14px 28px' }}>
              Apply for Creator Access &rarr;
            </Link>
            <Link href="/status" className="btn-secondary" style={{ padding: '14px 28px' }}>
              Check Application Status
            </Link>
          </div>

          {/* Quick email unlock for approved creators */}
          <div className={styles.unlockSection}>
            <div className={styles.unlockDivider}>
              <span>ALREADY APPROVED?</span>
            </div>

            <form onSubmit={handleUnlockWithEmail} className={styles.unlockForm}>
              <input 
                type="email" 
                placeholder="Enter your approved email address" 
                value={unlockEmailInput}
                onChange={(e) => setUnlockEmailInput(e.target.value)}
                className={styles.unlockInput}
                required
              />
              <button type="submit" className={styles.unlockBtn} disabled={unlocking}>
                {unlocking ? 'Verifying...' : 'Unlock Dashboard'}
              </button>
            </form>

            {unlockError && <p className={styles.unlockError}>{unlockError}</p>}
          </div>

          <div className={styles.gateFooter}>
            <Link href="/" className={styles.backHomeLink}>
              &larr; Return to Public Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Approved Creator Layout
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}

