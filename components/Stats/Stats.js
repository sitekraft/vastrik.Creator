import styles from './Stats.module.css';

export default function Stats() {
  const stats = [
    { icon: '👥', value: '10K+', label: 'CREATORS JOINED' },
    { icon: '🎯', value: '50+', label: 'ACTIVE CHALLENGES' },
    { icon: '🎁', value: '$2M', label: 'TOTAL REWARDS', highlight: true },
    { icon: '👑', value: '500', label: 'TOP CREATORS' }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.icon}>{stat.icon}</div>
              <div className={`${styles.value} ${stat.highlight ? 'gradient-text' : ''}`}>
                {stat.value}
              </div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
