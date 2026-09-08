'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: '🎛️' },
    { name: 'Challenges', path: '/dashboard/challenges', icon: '🏆' },
    { name: 'My Submissions', path: '/dashboard/submissions', icon: '▶️' },
    { name: 'Progress', path: '/dashboard/progress', icon: '📈' },
    { name: 'Rewards', path: '/dashboard/rewards', icon: '🎁' },
    { name: 'Leaderboard', path: '/dashboard/leaderboard', icon: '📊' },
    { name: 'Rules', path: '/dashboard/rules', icon: '⚖️' },
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
            <span className={styles.avatarIcon}>👩</span>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.name}>Vastrik Creator</div>
            <div className={styles.rank}>Atelier Creator ⭐</div>
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
          <Link href="/dashboard/submissions/new" onClick={() => setMobileOpen(false)} className={styles.newSubmissionBtn} style={{display: 'block', textAlign: 'center', textDecoration: 'none'}}>
            New Submission
          </Link>

          <div className={styles.footerLinks}>
            <Link href="/dashboard/settings" onClick={() => setMobileOpen(false)} className={styles.footerLink}>
              <span className={styles.icon}>⚙️</span> Settings
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
