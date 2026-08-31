import Image from 'next/image';
import Link from 'next/link';
import styles from './ActiveChallenge.module.css';

export default function ActiveChallenge() {
  return (
    <div className={styles.card}>
      <div className={styles.imageCol}>
        <div className={styles.tag}>
          <span className={styles.dot}></span> ACTIVE MISSION
        </div>
        <Image 
          src="/dashboard_challenge.jpg" 
          alt="Pinterest & Celeb Look Deconstruct" 
          width={400} 
          height={600} 
          className={styles.image}
        />
        <div className={styles.imageOverlay}></div>
      </div>
      
      <div className={styles.contentCol}>
        <h2 className={styles.title}>PINTEREST & CELEB<br/>LOOK DECONSTRUCT</h2>
        <p className={styles.desc}>
          Showcase a high-end designer or Pinterest outfit, highlight the expensive retail price, and demo on-screen how users can upload it to vastrik.store for bespoke Karigar stitching.
        </p>

        <div className={styles.infoBoxes}>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Milestone Max</div>
            <div className={styles.infoValue}>₹5,000 / 1M Views</div>
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoLabel}>Mission Type</div>
            <div className={styles.infoValue}>⚡ Zero-Inventory UGC</div>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span className={styles.progressLabel}>Payout Milestone Tracker</span>
            <span className={styles.progressPercent}>Tier 1 (₹5,000)</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '60%' }}></div>
          </div>
          <div className={styles.progressSubtext}>₹1k (10k views) • ₹2k (30k views) • ₹3k (50k views) • ₹5k (1M views)</div>
        </div>

        <div className={styles.actions}>
          <Link href="/dashboard/submissions/new" className={styles.primaryBtn} style={{display: 'inline-block', textAlign: 'center', textDecoration: 'none'}}>
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

