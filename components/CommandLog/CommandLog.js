import styles from './CommandLog.module.css';

export default function CommandLog({ challenges, submissions, profile }) {
  // Generate logs from recent challenges and submissions
  const logs = [];

  if (profile?.upiId) {
    logs.push({
      icon: '✅',
      title: 'Creator Atelier status:',
      highlight: 'UPI Verified',
      time: 'Active'
    });
  }

  if (challenges && challenges.length > 0) {
    const latest = challenges.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    logs.push({
      icon: '📢',
      title: 'New mission brief live:',
      highlight: latest.title,
      time: 'Live Now'
    });
  }

  if (submissions && submissions.length > 0) {
    const latestSub = submissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    logs.push({
      icon: latestSub.status === 'Approved' ? '💰' : '⏳',
      title: `Submission ${latestSub.status.toLowerCase()}:`,
      highlight: `For Challenge ID: ${latestSub.challengeId.slice(-4)}`,
      time: 'Recent'
    });
  }

  if (logs.length === 0) {
    logs.push({
      icon: '👋',
      title: 'Welcome to Vastrik Creator',
      highlight: 'Join a mission to get started',
      time: 'Just now'
    });
  }


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
