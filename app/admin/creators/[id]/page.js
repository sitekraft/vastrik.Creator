'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function AdminCreatorDetail({ params }) {
  const router = useRouter();

  // Mock data
  const creator = {
    id: params.id,
    name: 'CyberKing',
    email: 'cyberking@example.com',
    joinDate: 'Jan 15, 2024',
    rank: 'Icon',
    points: '1.2M',
    totalEarned: '₹4,50,000',
    status: 'Active',
    warnings: 0
  };

  const handleAction = (action) => {
    alert(`Action "${action}" executed for creator ${creator.id}`);
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => router.back()}>
        &larr; Back to Directory
      </button>

      <div className={styles.header}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}>CK</div>
          <div>
            <h1 className={styles.name}>{creator.name}</h1>
            <p className={styles.id}>ID: {creator.id} &bull; {creator.email}</p>
          </div>
        </div>
        <div className={styles.statusBadge}>
          <span className={`${styles.status} ${styles[creator.status.toLowerCase()]}`}>
            {creator.status}
          </span>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Performance Stats</h3>
          <div className={styles.statList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Current Rank</span>
              <span className={`${styles.statValue} ${styles.rankHighlight}`}>{creator.rank}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Points</span>
              <span className={styles.statValue}>{creator.points}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total Payouts</span>
              <span className={styles.statValue}>{creator.totalEarned}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Join Date</span>
              <span className={styles.statValue}>{creator.joinDate}</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Administrative Actions</h3>
          <p className={styles.warningText}>Current Warnings: {creator.warnings}/3</p>
          
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary} onClick={() => handleAction('Send Warning')}>
              Issue Warning
            </button>
            <button className={styles.btnSecondary} onClick={() => handleAction('Reset Points')}>
              Reset Points
            </button>
            <button className={styles.btnDanger} onClick={() => handleAction('Suspend Account')}>
              Suspend Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
