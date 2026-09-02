'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function ProgressPage() {
  const [profile, setProfile] = useState({ points: 0, rank: 'Newbie' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('vastrik_creator_email');
        if (email) {
          try {
            const res = await fetch(`/api/creator/profile?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            if (data.success && data.profile) {
              setProfile(data.profile);
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const ranks = ['Newbie', 'Rising Star', 'Elite', 'Icon'];
  const currentRankIndex = ranks.indexOf(profile.rank || 'Newbie');

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>PROGRESS & ANALYTICS</h1>
      </header>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Rank Progression</h3>
          <div className={styles.timeline}>
            {ranks.map((rankName, index) => {
              const isActive = index <= currentRankIndex;
              const isCurrent = index === currentRankIndex;
              
              return (
                <div key={rankName} className={styles.step}>
                  <div className={`${styles.circle} ${isCurrent ? styles.current : isActive ? styles.active : ''}`}></div>
                  {index < ranks.length - 1 && <div className={styles.line}></div>}
                  <span className={`${styles.label} ${isCurrent ? styles.highlight : ''}`}>
                    {rankName} {isCurrent && '(Current)'}
                  </span>
                </div>
              );
            })}
          </div>
          <p className={styles.helperText}>
            {profile.rank === 'Icon' 
              ? 'You have reached the top rank!' 
              : 'Keep completing missions to unlock the next rank.'}
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Audience Engagement</h3>
          <div className={styles.mockChart}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className={styles.barContainer}>
                <div className={styles.bar} style={{height: '0%'}}></div>
                <span>{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
