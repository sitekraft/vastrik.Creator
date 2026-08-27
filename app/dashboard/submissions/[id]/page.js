'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function SubmissionDetail({ params }) {
  const router = useRouter();
  
  // Dummy data
  const submission = {
    id: params.id,
    title: 'Neon Nights Entry',
    challenge: 'STYLE YOUR VASTRIK LOOK',
    status: 'Approved',
    views: '12K',
    pointsEarned: 2450,
    date: 'Oct 24, 2024',
    img: '/dashboard_challenge.jpg',
    desc: 'Dressed in the new neon crop jacket with cargo pants. Shot in downtown at midnight to catch those cyberpunk vibes. #Vastrik #NeonNights',
    link: 'https://instagram.com/p/mock12345'
  };

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => router.back()}>
        &larr; Back to Submissions
      </button>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <Image src={submission.img} alt={submission.title} fill style={{objectFit: 'cover'}} />
          </div>
        </div>
        
        <div className={styles.detailsSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>{submission.title}</h1>
            <span className={`${styles.status} ${styles[submission.status.toLowerCase()]}`}>
              {submission.status}
            </span>
          </div>
          
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Challenge</span>
              <span className={styles.metaValue}>{submission.challenge}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Submitted On</span>
              <span className={styles.metaValue}>{submission.date}</span>
            </div>
          </div>

          <div className={styles.descBox}>
            <h3 className={styles.descLabel}>Caption / Description</h3>
            <p className={styles.descText}>{submission.desc}</p>
            <a href={submission.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
              View Original Post ↗
            </a>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Verified Views</span>
              <span className={styles.statValue}>{submission.views}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Points Earned</span>
              <span className={styles.statValueHighlight}>+{submission.pointsEarned}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
