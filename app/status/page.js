import HubNavbar from '@/components/HubNavbar/HubNavbar';
import StatusCard from '@/components/StatusCard/StatusCard';
import NextSteps from '@/components/NextSteps/NextSteps';
import HubFooter from '@/components/HubFooter/HubFooter';
import styles from './page.module.css';

export default function StatusPage({ searchParams }) {
  return (
    <main className={styles.main}>
      <HubNavbar />
      
      <div className={`container ${styles.content}`}>
        <StatusCard searchParams={searchParams} />
        <NextSteps />
      </div>
      
      <HubFooter />
    </main>
  );
}
