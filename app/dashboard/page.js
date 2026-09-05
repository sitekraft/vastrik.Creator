'use client';

import { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import StatsGrid from '@/components/StatsGrid/StatsGrid';
import ActiveChallenge from '@/components/ActiveChallenge/ActiveChallenge';
import CommandLog from '@/components/CommandLog/CommandLog';
import UpcomingMissions from '@/components/UpcomingMissions/UpcomingMissions';
import styles from './page.module.css';

export default function DashboardOverview() {
  const [profile, setProfile] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const email = localStorage.getItem('vastrik_creator_email');
        if (email) {
          const profileRes = await fetch(`/api/creator/profile?email=${encodeURIComponent(email)}`);
          const profileData = await profileRes.json();
          if (profileData.success) {
            setProfile(profileData.profile);
          }
        }

        const challengesRes = await fetch('/api/admin/challenges');
        const challengesData = await challengesRes.json();
        if (challengesData.success) {
          setChallenges(challengesData.challenges);
        }

        const subsRes = await fetch('/api/admin/submissions');
        const subsData = await subsRes.json();
        if (subsData.success) {
          setSubmissions(subsData.submissions);
        }
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const activeChallenges = challenges.filter(c => c.status === 'Active');
  const featuredChallenge = activeChallenges[0];

  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      <StatsGrid profile={profile} activeChallengesCount={activeChallenges.length} />
      
      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <ActiveChallenge challenge={featuredChallenge} />
        </div>
        <div className={styles.rightCol}>
          <CommandLog challenges={challenges} submissions={submissions} profile={profile} />
        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <div className={styles.missionsCol}>
          <UpcomingMissions challenges={challenges} />
        </div>
      </div>
    </div>
  );
}
