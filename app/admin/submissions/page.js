'use client';

import styles from './page.module.css';
import Image from 'next/image';

export default function AdminSubmissions() {
  const submissions = [
    { id: 'SUB-104', creator: 'Anshika', challenge: 'STYLE YOUR VASTRIK LOOK', date: '2 hours ago', img: '/dashboard_challenge.jpg' },
    { id: 'SUB-105', creator: 'CyberKing', challenge: 'STREETWEAR VIBES', date: '5 hours ago', img: '/promo.jpg' },
    { id: 'SUB-106', creator: 'TechwearTom', challenge: 'STYLE YOUR VASTRIK LOOK', date: '1 day ago', img: '/apply_promo.jpg' },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Content Moderation</h1>
        <p className={styles.subtitle}>Review creator submissions for active challenges.</p>
      </header>

      <div className={styles.grid}>
        {submissions.map((sub) => (
          <div key={sub.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image src={sub.img} alt={`Submission ${sub.id}`} fill style={{objectFit: 'cover'}} />
            </div>
            <div className={styles.content}>
              <div className={styles.infoRow}>
                <span className={styles.creatorName}>{sub.creator}</span>
                <span className={styles.date}>{sub.date}</span>
              </div>
              <div className={styles.challenge}>{sub.challenge}</div>
              
              <div className={styles.actions}>
                <button className={styles.btnApprove} onClick={(e) => { e.target.parentElement.parentElement.style.opacity = '0.5'; alert('Submission Approved and 500 Points Awarded!'); }}>Approve & Award Points</button>
                <button className={styles.btnReject} onClick={(e) => { e.target.parentElement.parentElement.style.opacity = '0.5'; alert('Submission Rejected'); }}>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
