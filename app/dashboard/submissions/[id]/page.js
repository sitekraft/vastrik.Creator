'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function SubmissionDetail({ params }) {
  const router = useRouter();
  
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const res = await fetch(`/api/submissions/${params.id}`);
        const data = await res.json();
        if (data.success && data.submission) {
          setSubmission({
            id: data.submission._id,
            title: 'Submission Entry', // Or fetch challenge title
            challenge: 'Vastrik Creator Mission',
            status: data.submission.status,
            views: 'Pending Sync', // Not tracking actual views yet
            pointsEarned: data.submission.status === 'Approved' ? 5000 : 0, // Placeholder mapping
            date: new Date(data.submission.createdAt).toLocaleDateString(),
            img: '/dashboard_challenge.jpg',
            desc: data.submission.description || data.submission.caption || 'No description provided.',
            link: data.submission.videoUrl
          });
        } else {
          setError('Submission not found.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load submission.');
      } finally {
        setLoading(false);
      }
    }
    fetchSubmission();
  }, [params.id]);

  if (loading) return <div className={styles.page}>Loading...</div>;
  if (error) return <div className={styles.page}>{error}</div>;

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
