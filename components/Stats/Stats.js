import styles from './Stats.module.css';

export default function Stats() {
  const milestones = [
    { icon: '💎', value: '₹5,000', label: 'FOR 1M+ VIEWS', badge: 'Tier 1' },
    { icon: '🔥', value: '₹3,000', label: 'FOR 50K+ VIEWS', badge: 'Tier 2' },
    { icon: '⚡', value: '₹2,000', label: 'FOR 30K+ VIEWS', badge: 'Tier 3' },
    { icon: '🚀', value: '₹1,000', label: 'FOR 10K+ VIEWS', badge: 'Starter' }
  ];

  return (
    <section className={styles.section} id="payouts">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>TRANSPARENT EARNINGS</span>
          <h2 className={styles.title}>VIEW-BASED PAYOUTS</h2>
          <p className={styles.subtitle}>Get rewarded directly for your reach. No hidden requirements.</p>
        </div>
        
        <div className={styles.grid}>
          {milestones.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.badge}>{item.badge}</div>
              <div className={styles.icon}>{item.icon}</div>
              <div className={`${styles.value} gradient-text`}>
                {item.value}
              </div>
              <div className={styles.label}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

