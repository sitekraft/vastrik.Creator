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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your admin email to reset the security key.');
      return;
    }
    setIsResetting(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (data.success) {
        setSuccessMsg(data.message);
      } else {
        setError(data.message || 'Failed to send reset link.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setIsResetting(false);
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
        {successMsg && <div style={{ color: '#4ade80', marginBottom: '16px', textAlign: 'center' }}>{successMsg}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Admin ID or Email</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="Enter your admin email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Security Key / Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                className={styles.input} 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '👁️‍🗨️' : '👁️'}
              </button>
            </div>
          </div>

          <div className={styles.forgotPassword}>
            <button 
              type="button" 
              onClick={handleForgotPassword} 
              disabled={isResetting}
              style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}
            >
              {isResetting ? 'Sending Link...' : 'Forgot Security Key?'}
            </button>
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
