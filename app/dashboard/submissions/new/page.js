'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function NewSubmission() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [challenges, setChallenges] = useState([]);
  const [formData, setFormData] = useState({
    challengeId: '',
    contentLink: '',
    description: ''
  });

  import('react').then(({ useEffect }) => {
    useEffect(() => {
      fetch('/api/admin/challenges').then(r => r.json()).then(data => {
        if(data.success) setChallenges(data.challenges);
      });
    }, []);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: 'dummy-user-id' }) // NextAuth session would provide real ID
      });
      const data = await res.json();
      if(data.success) {
        alert("Submission uploaded successfully! Our moderators will review it shortly.");
        router.push('/dashboard/submissions');
      } else {
        alert("Failed to submit.");
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>New Submission</h1>
        <p className={styles.subtitle}>Upload your content to participate in an active challenge.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Select Challenge</label>
          <select className={styles.input} required value={formData.challengeId} onChange={(e) => setFormData({...formData, challengeId: e.target.value})}>
            <option value="">-- Choose a Challenge --</option>
            {challenges.map(ch => (
              <option key={ch._id} value={ch._id}>{ch.title}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Content Link (Instagram / YouTube)</label>
          <input type="url" className={styles.input} placeholder="https://instagram.com/p/..." required value={formData.contentLink} onChange={(e) => setFormData({...formData, contentLink: e.target.value})} />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Upload Thumbnail / Image</label>
          <div className={styles.uploadArea}>
            <span className={styles.uploadIcon}>⬆️</span>
            <p>Drag and drop your image here, or click to browse</p>
            <input type="file" className={styles.fileInput} accept="image/*" />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description / Caption</label>
          <textarea className={styles.textarea} rows="4" placeholder="Tell us about your look..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
        </div>

        <div className={styles.actions}>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'UPLOADING...' : 'SUBMIT CONTENT'}
          </button>
          <button type="button" className="btn-secondary" onClick={() => router.back()}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
}
