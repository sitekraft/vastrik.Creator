import Image from 'next/image';
import Link from 'next/link';
import styles from './ActiveChallenge.module.css';

export default function ActiveChallenge() {
  return (
    <div className={styles.card}>
      <div className={styles.imageCol}>
        <div className={styles.tag}>
          <span className={styles.dot}></span> ACTIVE
        </div>
        <Image 
          src="/dashboard_challenge.jpg" 
          alt="Style Your Vastrik Look" 
          width={400} 
          height={600} 
          className={styles.image}
        />
        <div className={styles.imageOverlay}></div>
      </div>
      
      <div className={styles.contentCol}>
        <h2 className={styles.title}>STYLE YOUR<br/>VASTRIK LOOK</h2>
        <p className={styles.desc}>
          Showcase your unique aesthetic using Vastrik's latest drop. High engagement earns bonus multipliers.
        </p>

        <div className={styles.infoBoxes}>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Deadline</div>
            <div className={styles.infoValue}>⏱️ 3 Days Left</div>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Reward Pool</div>
            <div className={styles.infoValue}>₹25,000</div>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Challenge Progress</span>
            <span className={styles.progressPercent}>85%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '85%' }}></div>
          </div>
          <div className={styles.progressSubtext}>12k / 15k Verified Views</div>
        </div>

        <div className={styles.actions}>
          <Link href="/dashboard/submissions/new" className={styles.primaryBtn} style={{display: 'inline-block', textAlign: 'center', textDecoration: 'none'}}>
            SUBMIT CONTENT &rarr;
          </Link>
          <button className={styles.secondaryBtn}>
            VIEW DETAILS
          </button>
        </div>
      </div>
    </div>
  );
}
