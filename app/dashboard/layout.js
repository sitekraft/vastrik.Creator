'use client';

import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './layout.module.css';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users to home page
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.replace('/');
    }
  }, [session, status, router]);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
