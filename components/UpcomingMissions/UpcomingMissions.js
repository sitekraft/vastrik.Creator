import styles from './UpcomingMissions.module.css';
import Link from 'next/link';

export default function UpcomingMissions({ challenges = [] }) {
  const upcoming = challenges.filter(c => c.status === 'Upcoming' || new Date(c.startDate) > new Date()).slice(0, 3);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>MORE CREATOR MISSIONS</h3>
        <Link href="/dashboard/challenges" className={styles.link}>View All Briefs</Link>
      </div>
      
      <div className={styles.grid}>
        {upcoming.length === 0 ? (
          <p style={{color: 'var(--text-secondary)'}}>No upcoming missions right now.</p>
        ) : upcoming.map((c, i) => (
          <div key={c._id || i} className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.tag}>{c.status === 'Active' ? 'ACTIVE BRIEF' : 'UPCOMING'}</div>
              <div className={styles.icon}>⚡</div>
            </div>
            <h4 className={styles.missionTitle}>{c.title}</h4>
            <p className={styles.reward}>Max Payout: {c.rewardPool}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
