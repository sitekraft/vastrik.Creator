import styles from './UpcomingMissions.module.css';

export default function UpcomingMissions() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>UPCOMING MISSIONS</h3>
        <a href="#" className={styles.link}>View All</a>
      </div>
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.tag}>UNLOCKS IN 2D</div>
            <div className={styles.icon}>🔒</div>
          </div>
          <h4 className={styles.missionTitle}>STREETWEAR VIBES</h4>
          <p className={styles.reward}>Reward: Exclusive Merch</p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.tag}>UNLOCKS IN 5D</div>
            <div className={styles.icon}>🔒</div>
          </div>
          <h4 className={styles.missionTitle}>GAMING SETUP</h4>
          <p className={styles.reward}>Reward: ₹10,000</p>
        </div>
      </div>
    </div>
  );
}
