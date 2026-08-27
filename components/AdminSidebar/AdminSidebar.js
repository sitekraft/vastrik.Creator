'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', path: '/admin', icon: '🎛️' },
    { name: 'Applications', path: '/admin/applications', icon: '📋' },
    { name: 'Challenges', path: '/admin/challenges', icon: '🏆' },
    { name: 'Submissions', path: '/admin/submissions', icon: '✅' },
    { name: 'Creators', path: '/admin/creators', icon: '👥' },
    { name: 'Payouts', path: '/admin/payouts', icon: '💰' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <span className={styles.avatarIcon}>🛡️</span>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.name}>Vastrik Admin</div>
          <div className={styles.rank}>System Access</div>
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
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>
            <span className={styles.icon}>🔙</span> Exit Admin
          </Link>
        </div>
      </div>
    </aside>
  );
}
