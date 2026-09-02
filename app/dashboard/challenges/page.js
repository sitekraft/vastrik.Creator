'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import ActiveChallenge from '@/components/ActiveChallenge/ActiveChallenge';
import Link from 'next/link';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Active');

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

  // Filter challenges based on the selected tab
  const filteredChallenges = challenges.filter((ch) => {
    const isPastEnd = new Date(ch.endDate) < new Date();
    const isFutureStart = new Date(ch.startDate) > new Date();

    if (activeTab === 'Completed') return ch.status === 'Completed' || isPastEnd;
    if (activeTab === 'Upcoming') return ch.status === 'Upcoming' || isFutureStart;
    return ch.status === 'Active' || (!isPastEnd && !isFutureStart);
  });

  // Pick the first active challenge as the featured one
  const featuredChallenge = challenges.find((ch) => {
    const isPastEnd = new Date(ch.endDate) < new Date();
    const isFutureStart = new Date(ch.startDate) > new Date();
    return ch.status === 'Active' || (!isPastEnd && !isFutureStart);
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>CHALLENGES</h1>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'Active' ? styles.active : ''}`}
            onClick={() => setActiveTab('Active')}
          >
            Active
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'Upcoming' ? styles.active : ''}`}
            onClick={() => setActiveTab('Upcoming')}
          >
            Upcoming
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'Completed' ? styles.active : ''}`}
            onClick={() => setActiveTab('Completed')}
          >
            Completed
          </button>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.featured}>
          <h2 className={styles.sectionTitle}>FEATURED CHALLENGE</h2>
          <ActiveChallenge challenge={featuredChallenge} />
        </div>

        <div className={styles.grid}>
          {loading ? (
            <p>Loading challenges...</p>
          ) : filteredChallenges.length === 0 ? (
            <p>No {activeTab.toLowerCase()} challenges right now.</p>
          ) : (
            filteredChallenges.map((ch) => {
              // Calculate days left
              const daysLeft = Math.ceil((new Date(ch.endDate) - new Date()) / (1000 * 60 * 60 * 24));
              const displayDays = daysLeft > 0 ? `${daysLeft} Days Left` : 'Ended';
              
              return (
                <div key={ch._id} className={styles.card}>
                  <div className={styles.cardTag}>{activeTab.toUpperCase()}</div>
                  <h3 className={styles.cardTitle}>{ch.title}</h3>
                  <p className={styles.cardDesc}>{ch.description}</p>
                  <div className={styles.cardFooter}>
                    <span>⏱️ {displayDays}</span>
                    <span className={styles.reward}>{ch.rewardPool}</span>
                  </div>
                  {activeTab !== 'Completed' && (
                    <Link href={`/dashboard/submissions/new?challengeId=${ch._id}`} className="btn-primary" style={{display: 'block', textAlign: 'center', width: '100%', marginTop: '16px', padding: '10px', textDecoration: 'none'}}>Join Challenge</Link>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
