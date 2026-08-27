import styles from './Challenges.module.css';
import Link from 'next/link';

export default function Challenges() {
  const challenges = [
    {
      status: 'ACTIVE',
      reward: '₹50,000',
      title: 'STYLE YOUR VASTRIK LOOK',
      desc: 'Create unique fashion content showcasing your signature style using at least two Vastrik items.',
    },
    {
      status: 'ACTIVE',
      reward: '₹35,000',
      title: 'VASTRIK STORYTELLER',
      desc: 'Tell a compelling 60-second visual story about your fashion journey and past/future evolution.',
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.mainTitle}>PICK YOUR<br/>NEXT<br/>CHALLENGE.</h2>
        
        <div className={styles.list}>
          {challenges.map((c, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.header}>
                <span className={styles.status}>
                  <span className={styles.dot}></span> {c.status}
                </span>
                <div className={styles.rewardBox}>
                  <span className={styles.rewardLabel}>REWARD</span>
                  <span className={styles.rewardValue}>{c.reward}</span>
                </div>
              </div>
              
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.desc}>{c.desc}</p>
              
              <Link href="/apply" className={styles.btn} style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>View Challenge &rarr;</Link>
            </div>
          ))}
        </div>
        
        <div className={styles.viewAll}>
          <Link href="/apply">View All Challenges</Link>
        </div>
      </div>
    </section>
  );
}
