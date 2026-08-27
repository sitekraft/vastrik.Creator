'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import ActiveChallenge from '@/components/ActiveChallenge/ActiveChallenge';
import Link from 'next/link';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const res = await fetch('/api/admin/challenges');
        const data = await res.json();
        if (data.success) {
          setChallenges(data.challenges);
        }
      } catch (error) {
        console.error('Failed to fetch challenges', error);
      } finally {
        setLoading(false);
      }
    }
    fetchChallenges();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>CHALLENGES</h1>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Active</button>
          <button className={styles.tab}>Upcoming</button>
          <button className={styles.tab}>Completed</button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.featured}>
          <h2 className={styles.sectionTitle}>FEATURED CHALLENGE</h2>
          <ActiveChallenge />
        </div>

        <div className={styles.grid}>
          {loading ? (
            <p>Loading challenges...</p>
          ) : challenges.length === 0 ? (
            <p>No active challenges right now.</p>
          ) : (
            challenges.map((ch) => {
              // Calculate days left
              const daysLeft = Math.ceil((new Date(ch.endDate) - new Date()) / (1000 * 60 * 60 * 24));
              const displayDays = daysLeft > 0 ? `${daysLeft} Days Left` : 'Ended';
              
              return (
                <div key={ch._id} className={styles.card}>
                  <div className={styles.cardTag}>NEW</div>
                  <h3 className={styles.cardTitle}>{ch.title}</h3>
                  <p className={styles.cardDesc}>{ch.description}</p>
                  <div className={styles.cardFooter}>
                    <span>⏱️ {displayDays}</span>
                    <span className={styles.reward}>{ch.rewardPool}</span>
                  </div>
                  <Link href={`/dashboard/submissions/new?challengeId=${ch._id}`} className="btn-primary" style={{display: 'block', textAlign: 'center', width: '100%', marginTop: '16px', padding: '10px', textDecoration: 'none'}}>Join Challenge</Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
