'use client';

import AdminSidebar from '@/components/AdminSidebar/AdminSidebar';
import styles from './layout.module.css';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <div className={styles.layout}>
      {!isLoginPage && <AdminSidebar />}
      <main className={`${styles.mainContent} ${isLoginPage ? styles.fullWidth : ''}`}>
        {children}
      </main>
    </div>
  );
}
