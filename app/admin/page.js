import styles from './page.module.css';

export default function AdminOverview() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Overview</h1>
          <p className={styles.subtitle}>Welcome back, System Admin.</p>
        </div>
      </header>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Total Creators</span>
          <span className={styles.kpiValue}>1,248</span>
          <span className={styles.kpiTrend}>+12% this month</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Pending Applications</span>
          <span className={`${styles.kpiValue} ${styles.alert}`}>42</span>
          <span className={styles.kpiTrend}>Requires Review</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Active Challenges</span>
          <span className={styles.kpiValue}>3</span>
          <span className={styles.kpiTrend}>1 ending soon</span>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Total Payouts (YTD)</span>
          <span className={styles.kpiValue}>₹14.2L</span>
          <span className={styles.kpiTrend}>+5% vs last year</span>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent System Alerts</h2>
        <ul className={styles.alertList}>
          <li className={styles.alertItem}>
            <span className={styles.alertIcon}>⚠️</span>
            <div className={styles.alertContent}>
              <strong>High submission volume</strong> detected for "Neon Nights" challenge.
              <span className={styles.alertTime}>10 mins ago</span>
            </div>
          </li>
          <li className={styles.alertItem}>
            <span className={styles.alertIcon}>💰</span>
            <div className={styles.alertContent}>
              <strong>15 payout requests</strong> pending approval.
              <span className={styles.alertTime}>2 hours ago</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
