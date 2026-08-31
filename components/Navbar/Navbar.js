'use client';

import { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logo}>
            VASTRIK<span className={styles.creatorTag}>CREATOR</span>
          </Link>
        </div>

        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
          <Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className={styles.navLink}>Playbook</Link>
          <Link href="/#payouts" onClick={() => setMobileMenuOpen(false)} className={styles.navLink}>Payouts</Link>
          <Link href="/#challenges" onClick={() => setMobileMenuOpen(false)} className={styles.navLink}>Missions</Link>
          <Link href="/collaborations" onClick={() => setMobileMenuOpen(false)} className={styles.navLink}>Collaborate</Link>
          <Link href="/support" onClick={() => setMobileMenuOpen(false)} className={styles.navLink}>Support</Link>
          <Link href="/status" onClick={() => setMobileMenuOpen(false)} className={styles.navLink}>Status</Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className={styles.navLink}>Dashboard</Link>
        </div>


        <div className={styles.right}>
          <Link href="/apply" className="btn-primary">JOIN PROGRAM</Link>
          <button 
            className={styles.hamburger} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar1Active : ''}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar2Active : ''}`}></span>
            <span className={`${styles.bar} ${mobileMenuOpen ? styles.bar3Active : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

