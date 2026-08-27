import styles from './CommandLog.module.css';

export default function CommandLog() {
  const logs = [
    {
      icon: '📢',
      title: 'New challenge available:',
      highlight: 'STREETWEAR VIBES',
      time: '2 hours ago'
    },
    {
      icon: '✅',
      title: 'Submission approved for',
      highlight: 'NEON NIGHTS',
      time: '5 hours ago'
    },
    {
      icon: '📈',
      title: 'Milestone reached: 50K',
      highlight: 'Total Views',
      time: '1 day ago'
    },
    {
      icon: '⭐',
      title: 'Rank increased to',
      highlight: 'Elite',
      time: '2 days ago'
    }
  ];

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>COMMAND<br/>LOG</h3>
      
      <div className={styles.list}>
        {logs.map((log, idx) => (
          <div key={idx} className={styles.item}>
            <div className={styles.iconBox}>{log.icon}</div>
            <div className={styles.content}>
              <p className={styles.text}>{log.title}</p>
              <p className={styles.highlight}>{log.highlight}</p>
              <p className={styles.time}>{log.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.loadMore}>Load More Logs</button>
    </div>
  );
}
