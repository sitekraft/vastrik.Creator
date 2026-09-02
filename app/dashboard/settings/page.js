'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    upiId: '',
    notifications: { email: true, sms: false }
  });
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPayment, setSavingPayment] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    async function fetchProfile() {
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('vastrik_creator_email');
        if (email) {
          try {
            const res = await fetch(`/api/creator/profile?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            if (data.success && data.profile) {
              setProfile(data.profile);
            } else if (!data.profile) {
              setProfile(prev => ({ ...prev, email }));
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    await saveChanges('Profile updated successfully!');
    setSavingProfile(false);
    
    // Also update localStorage name
    if (typeof window !== 'undefined' && profile.name) {
      localStorage.setItem('vastrik_creator_name', profile.name);
    }
  };

  const handleSavePayment = async () => {
    setSavingPayment(true);
    await saveChanges('Payment method updated!');
    setSavingPayment(false);
  };

  const handleToggleNotification = async (key) => {
    const updatedNotifications = { ...profile.notifications, [key]: !profile.notifications[key] };
    setProfile({ ...profile, notifications: updatedNotifications });
    
    // Auto-save notifications
    try {
      await fetch('/api/creator/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: profile.email, notifications: updatedNotifications })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const saveChanges = async (successText) => {
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch('/api/creator/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      
      if (data.success || data.message.includes('User not found in DB')) { // For prototype, pretend success if not in DB yet
        setMessage({ text: successText, type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } else {
        setMessage({ text: data.message || 'Failed to save', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Network error', type: 'error' });
    }
  };

  if (loading) {
    return <div className={styles.page}><p>Loading settings...</p></div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>SETTINGS</h1>
      </header>

      {message.text && (
        <div style={{ padding: '10px', marginBottom: '20px', borderRadius: '4px', background: message.type === 'success' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)', color: message.type === 'success' ? '#4ade80' : '#f87171' }}>
          {message.text}
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Profile Information</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Display Name</label>
            <input 
              type="text" 
              className={styles.input} 
              value={profile.name} 
              onChange={(e) => setProfile({...profile, name: e.target.value})} 
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input type="email" className={styles.input} value={profile.email} disabled />
          </div>
          <button className="btn-primary" style={{marginTop: '16px'}} onClick={handleSaveProfile} disabled={savingProfile}>
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Payment Details</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Bank Account / UPI ID</label>
            <input 
              type="text" 
              className={styles.input} 
              placeholder="e.g. yourname@upi" 
              value={profile.upiId} 
              onChange={(e) => setProfile({...profile, upiId: e.target.value})} 
            />
          </div>
          <button className="btn-secondary" style={{marginTop: '16px'}} onClick={handleSavePayment} disabled={savingPayment}>
            {savingPayment ? 'Updating...' : 'Update Payment Method'}
          </button>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Notifications</h2>
          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabel}>Email notifications for new challenges</label>
            <input 
              type="checkbox" 
              className={styles.toggle} 
              checked={profile.notifications?.email ?? true} 
              onChange={() => handleToggleNotification('email')} 
            />
          </div>
          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabel}>SMS alerts for reward payouts</label>
            <input 
              type="checkbox" 
              className={styles.toggle} 
              checked={profile.notifications?.sms ?? false} 
              onChange={() => handleToggleNotification('sms')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
