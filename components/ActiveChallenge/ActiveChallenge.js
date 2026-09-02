import Image from 'next/image';
import Link from 'next/link';
import styles from './ActiveChallenge.module.css';

export default function ActiveChallenge({ challenge }) {
  if (!challenge) {
    return (
      <div className={styles.card} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        No featured challenges at the moment. Check back later!
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageCol}>
        <div className={styles.tag}>
          <span className={styles.dot}></span> {challenge.status?.toUpperCase() || 'ACTIVE'} MISSION
        </div>
        <Image 
          src={challenge.coverImage || "/dashboard_challenge.jpg"} 
          alt={challenge.title} 
          width={400} 
          height={600} 
          className={styles.image}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.imageOverlay}></div>
      </div>
      
      <div className={styles.contentCol}>
        <h2 className={styles.title}>{challenge.title.toUpperCase()}</h2>
        <p className={styles.desc}>
          {challenge.description}
        </p>

        <div className={styles.infoBoxes}>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Milestone Max / Reward Pool</div>
            <div className={styles.infoValue}>{challenge.rewardPool}</div>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Mission Type</div>
            <div className={styles.infoValue}>⚡ Vastrik Campaign</div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href={`/dashboard/submissions/new?challengeId=${challenge._id}`} className={styles.primaryBtn} style={{display: 'inline-block', textAlign: 'center', textDecoration: 'none'}}>
            SUBMIT VIDEO LINK &rarr;
          </Link>
          <Link href="/dashboard/challenges" className={styles.secondaryBtn} style={{display: 'inline-block', textAlign: 'center', textDecoration: 'none'}}>
            ALL MISSIONS
          </Link>
        </div>
      </div>
    </div>
  );
}

