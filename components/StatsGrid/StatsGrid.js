import styles from './StatsGrid.module.css';

export default function StatsGrid({ profile, activeChallengesCount }) {
  const rank = profile?.rank || 'Newbie';
  const points = profile?.points || 0;
  
  // Calculate milestone target based on points
  let milestone = 3000;
  if (points > 3000) milestone = 5000;
  if (points > 5000) milestone = 10000;

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.label}>CREATOR TIER</div>
        <div className={styles.value} style={{ fontSize: '1.4rem' }}>⭐ {rank.toUpperCase()}</div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${Math.min(100, (points / milestone) * 100)}%` }}></div>
        </div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.label}>TOTAL POINTS / REWARD</div>
        <div className={styles.value}>{points.toLocaleString()} pts</div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Next milestone: {milestone.toLocaleString()} pts</span>
      </div>
      
      <div className={styles.card}>
        <div className={styles.label}>ACTIVE MISSIONS</div>
        <div className={styles.value}>{activeChallengesCount || 0}</div>
        <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>Live campaigns</span>
      </div>
      
      <div className={styles.card}>
        <div className={styles.label}>PAYOUT METHOD</div>
        <div className={styles.value} style={{ fontSize: '1.25rem' }}>{profile?.upiId ? 'Linked' : 'Pending'}</div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{profile?.upiId ? profile.upiId : 'Action Required'}</span>
      </div>
    </div>
  );
}

