'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function NewChallenge() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    rewardPool: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/admin/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("New challenge broadcasted to all creators successfully!");
        router.push('/admin/challenges');
      } else {
        alert("Failed to create challenge.");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating challenge.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Create New Challenge</h1>
        <p className={styles.subtitle}>Setup a new campaign for creators to participate in.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Challenge Title</label>
          <input type="text" className={styles.input} placeholder="e.g. MONOCHROME MADNESS" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Start Date</label>
            <input type="date" className={styles.input} required value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>End Date</label>
            <input type="date" className={styles.input} required value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Reward Pool</label>
          <input type="text" className={styles.input} placeholder="e.g. ₹50,000 or Exclusive Merch" required value={formData.rewardPool} onChange={(e) => setFormData({...formData, rewardPool: e.target.value})} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Cover Image</label>
          <div className={styles.uploadArea}>
            <span className={styles.uploadIcon}>🖼️</span>
            <p>Upload a promotional banner</p>
            <input type="file" className={styles.fileInput} accept="image/*" />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description & Rules</label>
          <textarea className={styles.textarea} rows="5" placeholder="Define what creators need to do..." required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'CREATING...' : 'PUBLISH CHALLENGE'}
          </button>
          <button type="button" className={styles.cancelBtn} onClick={() => router.back()}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
