'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();

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
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <span className={styles.avatarIcon}>👩</span>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.name}>Vastrik Creator</div>
          <div className={styles.rank}>Atelier Creator ⭐</div>

        </div>
      </div>

      <nav className={styles.nav}>
        {links.map((link) => (
          <Link 
            key={link.path} 
            href={link.path}
            className={`${styles.navLink} ${pathname === link.path ? styles.active : ''}`}
          >
            <span className={styles.icon}>{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </nav>

      <div className={styles.bottomSection}>
        <Link href="/dashboard/submissions/new" className={styles.newSubmissionBtn} style={{display: 'block', textAlign: 'center', textDecoration: 'none'}}>
          New Submission
        </Link>

        <div className={styles.footerLinks}>
          <Link href="/dashboard/settings" className={styles.footerLink}>
            <span className={styles.icon}>⚙️</span> Settings
          </Link>
        </div>
      </div>
    </aside>
  );
}
