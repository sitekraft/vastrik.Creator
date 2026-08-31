import styles from './UpcomingMissions.module.css';
import Link from 'next/link';

export default function UpcomingMissions() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>MORE CREATOR MISSIONS</h3>
        <Link href="/dashboard/challenges" className={styles.link}>View All Briefs</Link>
      </div>
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.tag}>ACTIVE BRIEF</div>
            <div className={styles.icon}>⚡</div>
          </div>
          <h4 className={styles.missionTitle}>AI SKETCH ANALYZER TEST</h4>
          <p className={styles.reward}>Max Payout: ₹5,000 / 1M Views</p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.tag}>ACTIVE BRIEF</div>
            <div className={styles.icon}>👗</div>
          </div>
          <h4 className={styles.missionTitle}>CUSTOM FIT VS STANDARD SIZING</h4>
          <p className={styles.reward}>Max Payout: ₹5,000 / 1M Views</p>
        </div>
      </div>
    </div>
  );
}

