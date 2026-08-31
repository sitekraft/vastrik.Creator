'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCreatorName, setCurrentCreatorName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentCreatorName(localStorage.getItem('vastrik_creator_name') || '');
    }

    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        if (data.success && data.leaders) {
          setLeaders(data.leaders);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>LEADERBOARD</h1>
        <p className={styles.subtitle}>Top creators in the Vastrik network this month.</p>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Creator</th>
              <th>Tier</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Loading leaderboard...</td></tr>
            ) : leaders.length === 0 ? (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px', color: 'var(--text-secondary)'}}>No creators have earned points yet.</td></tr>
            ) : (
              leaders.map((leader, idx) => {
                const rank = idx + 1;
                const isCurrentUser = currentCreatorName && leader.name === currentCreatorName;
                const displayName = isCurrentUser ? `${leader.name} (You)` : leader.name;
                
                return (
                  <tr key={leader._id} className={isCurrentUser ? styles.highlightRow : ''}>
                    <td>
                      <span className={`${styles.rank} ${rank <= 3 ? styles.topRank : ''}`}>
                        #{rank}
                      </span>
                    </td>
                    <td className={styles.creatorCell}>
                      <div className={styles.avatar}></div>
                      <span className={styles.name}>{displayName}</span>
                    </td>
                    <td>
                      <span className={`${styles.tier} ${styles[(leader.rank || 'Newbie').toLowerCase().replace(' ', '')]}`}>
                        {leader.rank || 'Newbie'}
                      </span>
                    </td>
                    <td className={styles.points}>{leader.points ? leader.points.toLocaleString() : '0'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
