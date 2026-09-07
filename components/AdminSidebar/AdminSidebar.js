'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: 'Overview', path: '/admin', icon: '🎛️' },
    { name: 'Applications', path: '/admin/applications', icon: '📋' },
    { name: 'Challenges', path: '/admin/challenges', icon: '🏆' },
    { name: 'Submissions', path: '/admin/submissions', icon: '✅' },
    { name: 'Creators', path: '/admin/creators', icon: '👥' },
    { name: 'Payouts', path: '/admin/payouts', icon: '💰' },
  ];

  return (
    <>
      <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? '✕' : '☰'}
      </button>
      {mobileOpen && <div className={styles.backdrop} onClick={() => setMobileOpen(false)}></div>}
      
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <span className={styles.avatarIcon}>🛡️</span>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.name}>Vastrik Admin</div>
            <div className={styles.rank}>System Access</div>
          </div>
          <button className={styles.mobileCloseInside} onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <nav className={styles.nav}>
          {links.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
            >
              <span className={styles.icon}>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className={styles.bottomSection}>
          <div className={styles.footerLinks}>
            <Link href="/" className={styles.footerLink}>
              <span className={styles.icon}>🔙</span> Exit Admin
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
