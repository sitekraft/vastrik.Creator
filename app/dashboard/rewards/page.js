'use client';

import styles from './page.module.css';

export default function RewardsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>REWARDS VAULT</h1>
      </header>

      <div className={styles.balanceCard}>
        <div className={styles.balanceInfo}>
          <span className={styles.balanceLabel}>AVAILABLE BALANCE</span>
          <h2 className={styles.balanceAmount}>₹50,000</h2>
        </div>
        <button className={styles.withdrawBtn} onClick={() => alert('Withdrawal request submitted! You will receive ₹12,500 in 2-3 business days.')}>Withdraw Funds</button>
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
