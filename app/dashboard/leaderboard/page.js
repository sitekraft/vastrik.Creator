import styles from './page.module.css';

export default function LeaderboardPage() {
  const leaders = [
    { rank: 1, name: 'CyberKing', points: '1.2M', tier: 'Icon' },
    { rank: 2, name: 'NeonQueen', points: '980K', tier: 'Icon' },
    { rank: 3, name: 'TechwearTom', points: '850K', tier: 'Icon' },
    { rank: 4, name: 'StreetStyle', points: '720K', tier: 'Elite' },
    { rank: 5, name: 'FutureFashion', points: '690K', tier: 'Elite' },
    { rank: 11, name: 'GamerAesthetic', points: '310K', tier: 'Elite' },
    { rank: 12, name: 'Vastrik Creator (You)', points: '245K', tier: 'Elite', isCurrentUser: true },
    { rank: 13, name: 'HypeBeast', points: '210K', tier: 'Rising Star' },
  ];

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
            {leaders.map((leader, idx) => (
              <tr key={idx} className={leader.isCurrentUser ? styles.highlightRow : ''}>
                <td>
                  <span className={`${styles.rank} ${leader.rank <= 3 ? styles.topRank : ''}`}>
                    #{leader.rank}
                  </span>
                </td>
                <td className={styles.creatorCell}>
                  <div className={styles.avatar}></div>
                  <span className={styles.name}>{leader.name}</span>
                </td>
                <td>
                  <span className={`${styles.tier} ${styles[leader.tier.toLowerCase().replace(' ', '')]}`}>
                    {leader.tier}
                  </span>
                </td>
                <td className={styles.points}>{leader.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
