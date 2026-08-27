import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './layout.module.css';

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
