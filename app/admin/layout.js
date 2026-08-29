'use client';

import AdminSidebar from '@/components/AdminSidebar/AdminSidebar';
import styles from './layout.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Redirect unauthenticated users or non‑admin users to login
  useEffect(() => {
    if (status === 'loading') return; // wait for session
    if (!session || session.user.role !== 'admin') {
      router.replace('/admin/login');
    }
  }, [session, status, router]);

  return (
    <div className={styles.layout}>
      {!isLoginPage && <AdminSidebar />}
      <main className={`${styles.mainContent} ${isLoginPage ? styles.fullWidth : ''}`}>
        {children}
      </main>
    </div>
  );
}

