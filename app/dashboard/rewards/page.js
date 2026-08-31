'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function RewardsPage() {
  const [points, setPoints] = useState(0);
  const [rank, setRank] = useState('Newbie');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('vastrik_creator_email');
        if (email) {
          try {
            const res = await fetch(`/api/creator/profile?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            if (data.success && data.profile) {
              setPoints(data.profile.points || 0);
              setRank(data.profile.rank || 'Newbie');
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>REWARDS VAULT</h1>
      </header>

      <div className={styles.balanceCard}>
        <div className={styles.balanceInfo}>
          <span className={styles.balanceLabel}>AVAILABLE BALANCE</span>
          <h2 className={styles.balanceAmount}>{loading ? '₹...' : `₹${points.toLocaleString()}`}</h2>
        </div>
        <button 
          className={styles.withdrawBtn} 
          onClick={() => {
            if (points < 1000) {
              alert('Minimum withdrawal amount is ₹1,000 (1,000 points). Keep creating!');
            } else {
              alert(`Withdrawal request submitted for ₹${points.toLocaleString()}!`);
            }
          }}
        >
          Withdraw Funds
        </button>
      </div>

      <h3 className={styles.sectionTitle}>REDEEMABLE PERKS</h3>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.icon}>👕</div>
          <h4 className={styles.cardTitle}>Vastrik Exclusive Hoodie</h4>
          <p className={styles.cardDesc}>Limited edition neon-thread hoodie.</p>
          <button className={styles.redeemBtn}>Redeem for 10K Points</button>
        </div>
        
        <div className={styles.card}>
          <div className={styles.icon}>🎟️</div>
          <h4 className={styles.cardTitle}>VIP Fashion Week Ticket</h4>
          <p className={styles.cardDesc}>Front row access to the upcoming showcase.</p>
          <button className={styles.redeemBtn}>Redeem for 50K Points</button>
        </div>
        
        <div className={styles.card}>
          <div className={styles.icon}>📸</div>
          <h4 className={styles.cardTitle}>Professional Photoshoot</h4>
          <p className={styles.cardDesc}>A fully sponsored shoot with our top photographers.</p>
          <button className={styles.redeemBtn} disabled>Locked (Needs Icon Rank)</button>
        </div>
      </div>
    </div>
  );
}
