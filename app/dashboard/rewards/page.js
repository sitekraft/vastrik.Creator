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
          <div className={styles.icon}>
            <img src="/reward_tshirt.jpg" alt="Vastrik Exclusive T-Shirt" />
          </div>
          <h4 className={styles.cardTitle}>Vastrik Exclusive T-Shirt</h4>
          <p className={styles.cardDesc}>Limited edition premium t-shirt.</p>
          <button 
            className={styles.redeemBtn} 
            disabled={points < 10000}
            onClick={() => alert('T-Shirt Redeemed Successfully!')}
          >
            {points >= 10000 ? 'Redeem for 10K Points' : 'Locked (Needs 10K Points)'}
          </button>
        </div>
        
        <div className={styles.card}>
          <div className={styles.icon}>
            <img src="/reward_coupon.jpg" alt="Shopping Coupons" />
          </div>
          <h4 className={styles.cardTitle}>Shopping Coupons</h4>
          <p className={styles.cardDesc}>Exclusive discount coupons for Vastrik store.</p>
          <button 
            className={styles.redeemBtn} 
            disabled={points < 20000}
            onClick={() => alert('Coupons Redeemed Successfully!')}
          >
            {points >= 20000 ? 'Redeem for 20K Points' : 'Locked (Needs 20K Points)'}
          </button>
        </div>
        
        <div className={styles.card}>
          <div className={styles.icon}>
            <img src="/reward_phone.jpg" alt="Flagship Smartphone" />
          </div>
          <h4 className={styles.cardTitle}>Flagship Smartphone</h4>
          <p className={styles.cardDesc}>The latest top-tier smartphone for creators.</p>
          <button className={styles.redeemBtn} disabled>Locked (Coming Soon)</button>
        </div>
      </div>
    </div>
  );
}
