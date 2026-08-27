'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      role: 'admin'
    });

    if (res?.error) {
      setError('Invalid admin credentials.');
      setIsLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🛡️</span>
            Vastrik Admin
          </div>
          <h1 className={styles.title}>System Access</h1>
          <p className={styles.subtitle}>Enter your credentials to access the control panel.</p>
        </div>

        {error && <div style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Admin ID or Email</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="admin@vastrik.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Security Key / Password</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.forgotPassword}>
            <a href="#">Forgot Security Key?</a>
          </div>

          <button type="submit" className={styles.loginBtn} disabled={isLoading} style={{ width: '100%' }}>
            {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE \u2192'}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/" className={styles.backLink}>
            &larr; Return to Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
