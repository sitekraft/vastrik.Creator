import styles from './StatsGrid.module.css';

export default function StatsGrid() {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.label}>CREATOR TIER</div>
        <div className={styles.value} style={{ fontSize: '1.4rem' }}>⭐ ATELIER VERIFIED</div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: '100%' }}></div>
        </div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.label}>TOP MILESTONE TARGET</div>
        <div className={styles.value}>₹5,000</div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>For 1M+ Verified Views</span>
      </div>
      
      <div className={styles.card}>
        <div className={styles.label}>ACTIVE MISSIONS</div>
        <div className={styles.value}>03</div>
        <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>Zero-Inventory Live</span>
      </div>
      
      <div className={styles.card}>
        <div className={styles.label}>PAYOUT METHOD</div>
        <div className={styles.value} style={{ fontSize: '1.25rem' }}>UPI / IMPS</div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Direct 48hr Transfer</span>
      </div>
    </div>
  );
}

