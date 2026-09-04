'use client';

import { useState, useEffect } from 'react';
import styles from './DashboardHeader.module.css';

export default function DashboardHeader() {
  const [creatorName, setCreatorName] = useState('CREATOR');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('vastrik_creator_name');
      if (name) {
        // Get first name
        setCreatorName(name.split(' ')[0].toUpperCase());
      }
    }
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.greeting}>
        <h1 className={styles.title}>HEY, {creatorName} 👋</h1>
        <p className={styles.subtitle}>Ready for your next challenge?</p>
      </div>
    </header>
  );
}
