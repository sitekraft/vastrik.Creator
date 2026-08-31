import styles from './CommandLog.module.css';

export default function CommandLog() {
  const logs = [
    {
      icon: '📢',
      title: 'New mission brief live:',
      highlight: 'PINTEREST & CELEB LOOK DECONSTRUCT',
      time: 'Live Now'
    },
    {
      icon: '⚡',
      title: 'Zero-Inventory UGC active on',
      highlight: 'vastrik.store (#analyzer)',
      time: '2 hours ago'
    },
    {
      icon: '💰',
      title: 'Milestone tier unlocked:',
      highlight: '₹5,000 / 1M+ Views',
      time: '1 day ago'
    },
    {
      icon: '✅',
      title: 'Creator Atelier status:',
      highlight: 'Verified Creator',
      time: 'Active'
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
