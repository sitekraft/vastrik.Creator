import styles from './StatsGrid.module.css';

export default function StatsGrid() {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.label}>CURRENT RANK</div>
        <div className={styles.value}>#12</div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: '70%' }}></div>
        </div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.label}>TOTAL VIEWS</div>
        <div className={styles.value}>245K</div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.label}>CHALLENGES COMPLETED</div>
        <div className={styles.value}>02</div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.label}>REWARDS EARNED</div>
        <div className={styles.value}>₹50,000</div>
      </div>
    </div>
  );
}
