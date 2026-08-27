import DashboardHeader from '@/components/DashboardHeader/DashboardHeader';
import StatsGrid from '@/components/StatsGrid/StatsGrid';
import ActiveChallenge from '@/components/ActiveChallenge/ActiveChallenge';
import CommandLog from '@/components/CommandLog/CommandLog';
import UpcomingMissions from '@/components/UpcomingMissions/UpcomingMissions';
import styles from './page.module.css';

export default function DashboardOverview() {
  return (
    <div className={styles.dashboard}>
      <DashboardHeader />
      <StatsGrid />
      
      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <ActiveChallenge />
        </div>
        <div className={styles.rightCol}>
          <CommandLog />
        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <div className={styles.missionsCol}>
          <UpcomingMissions />
        </div>
      </div>
    </div>
  );
}
