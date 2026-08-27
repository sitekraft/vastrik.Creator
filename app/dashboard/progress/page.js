import styles from './page.module.css';

export default function ProgressPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>PROGRESS & ANALYTICS</h1>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Rank Progression</h3>
          <div className={styles.timeline}>
            <div className={styles.step}>
              <div className={`${styles.circle} ${styles.active}`}></div>
              <div className={styles.line}></div>
              <span className={styles.label}>Newbie</span>
            </div>
            <div className={styles.step}>
              <div className={`${styles.circle} ${styles.active}`}></div>
              <div className={styles.line}></div>
              <span className={styles.label}>Rising Star</span>
            </div>
            <div className={styles.step}>
              <div className={`${styles.circle} ${styles.current}`}></div>
              <div className={styles.line}></div>
              <span className={`${styles.label} ${styles.highlight}`}>Elite (Current)</span>
            </div>
            <div className={styles.step}>
              <div className={styles.circle}></div>
              <span className={styles.label}>Icon</span>
            </div>
          </div>
          <p className={styles.helperText}>Only 50,000 more views needed to reach Icon rank!</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Audience Engagement</h3>
          <div className={styles.mockChart}>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{height: '60%'}}></div>
              <span>Mon</span>
            </div>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{height: '80%'}}></div>
              <span>Tue</span>
            </div>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{height: '40%'}}></div>
              <span>Wed</span>
            </div>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{height: '100%', background: 'var(--accent-primary)'}}></div>
              <span>Thu</span>
            </div>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{height: '70%'}}></div>
              <span>Fri</span>
            </div>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{height: '90%'}}></div>
              <span>Sat</span>
            </div>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{height: '50%'}}></div>
              <span>Sun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
