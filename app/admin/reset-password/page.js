'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../login/page.module.css'; // Reusing login styles

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatusMsg({ text: 'Invalid or missing reset token.', type: 'error' });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    if (password !== confirmPassword) {
      setStatusMsg({ text: 'Passwords do not match.', type: 'error' });
      return;
    }

    setIsLoading(true);
    setStatusMsg({ text: '', type: '' });

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password })
      });
      const data = await res.json();

      if (data.success) {
        setStatusMsg({ text: 'Password reset successful! Redirecting...', type: 'success' });
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      } else {
        setStatusMsg({ text: data.message || 'Failed to reset password.', type: 'error' });
        setIsLoading(false);
      }
    } catch (err) {
      setStatusMsg({ text: 'Something went wrong.', type: 'error' });
      setIsLoading(false);
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
          <h1 className={styles.title}>Reset Security Key</h1>
          <p className={styles.subtitle}>Enter your new password to regain access.</p>
        </div>

        {statusMsg.text && (
          <div style={{ color: statusMsg.type === 'error' ? '#ef4444' : '#4ade80', marginBottom: '16px', textAlign: 'center' }}>
            {statusMsg.text}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                className={styles.input} 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={!token || statusMsg.type === 'success'}
              />
              <button 
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
                disabled={!token || statusMsg.type === 'success'}
              >
                {showPassword ? '👁️‍🗨️' : '👁️'}
              </button>
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm New Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className={styles.input} 
              placeholder="••••••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={!token || statusMsg.type === 'success'}
            />
          </div>

          <button type="submit" className={styles.loginBtn} disabled={isLoading || !token || statusMsg.type === 'success'} style={{ width: '100%', marginTop: '32px' }}>
            {isLoading ? 'UPDATING...' : 'UPDATE PASSWORD \u2192'}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/admin/login" className={styles.backLink}>
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div style={{color: 'white', padding: '2rem'}}>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
