'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubs() {
      try {
        const res = await fetch('/api/submissions');
        const data = await res.json();
        if (data.success && data.submissions.length > 0) {
          setSubmissions(data.submissions);
        } else {
          // Fallback sample data if empty
          setSubmissions([
            { _id: 'SUB-101', creatorName: 'Aarav Mehta', challengeTitle: 'PINTEREST & CELEB LOOK DECONSTRUCT', contentLink: 'https://instagram.com/reel/vastrik_demo_1', createdAt: new Date().toISOString(), imageUrl: '/dashboard_challenge.jpg', status: 'Pending' },
            { _id: 'SUB-102', creatorName: 'Priya Sharma', challengeTitle: 'AI SKETCH ANALYZER TEST & REACTION', contentLink: 'https://youtube.com/shorts/vastrik_demo_2', createdAt: new Date(Date.now() - 3600000).toISOString(), imageUrl: '/promo.jpg', status: 'Pending' },
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubs();
  }, []);

  const handleModerate = async (id, status) => {
    try {
      const res = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, points: status === 'Approved' ? 500 : 0 })
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions(prev => prev.map(s => s._id === id ? { ...s, status } : s));
        alert(status === 'Approved' ? 'Submission Approved & 500 Points Awarded!' : 'Submission Rejected');
      }
    } catch (e) {
      console.error(e);
      alert('Error updating submission.');
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Content Moderation</h1>
          <p className={styles.subtitle}>Review creator video submissions, verify Pinterest & AI demo links, and award points.</p>
        </div>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px' }}>Loading submissions...</p>
      ) : (
        <div className={styles.grid}>
          {submissions.map((sub) => (
            <div key={sub._id} className={styles.card} style={{ opacity: sub.status !== 'Pending' ? 0.7 : 1 }}>
              <div className={styles.imageContainer}>
                <Image src={sub.imageUrl || '/dashboard_challenge.jpg'} alt={`Submission ${sub._id}`} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.content}>
                <div className={styles.infoRow}>
                  <span className={styles.creatorName}>{sub.user?.name || sub.creatorName || 'Vastrik Creator'}</span>
                  <span className={styles.date}>{new Date(sub.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={styles.challenge}>{sub.challenge?.title || sub.challengeTitle || 'Vastrik Mission'}</div>
                
                <div style={{ margin: '10px 0' }}>
                  <a href={sub.contentLink} target="_blank" rel="noopener noreferrer" style={{ color: '#a5f3fc', fontSize: '0.85rem', textDecoration: 'underline' }}>
                    🔗 Open Video Link ↗
                  </a>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700,
                    padding: '3px 10px', 
                    borderRadius: '6px',
                    background: sub.status === 'Approved' ? 'rgba(34,197,94,0.2)' : sub.status === 'Rejected' ? 'rgba(239,68,68,0.2)' : 'rgba(251,191,36,0.2)',
                    color: sub.status === 'Approved' ? '#4ade80' : sub.status === 'Rejected' ? '#f87171' : '#fbbf24'
                  }}>
                    Status: {sub.status || 'Pending'}
                  </span>
                </div>
                
                {sub.status === 'Pending' ? (
                  <div className={styles.actions}>
                    <button className={styles.btnApprove} onClick={() => handleModerate(sub._id, 'Approved')}>
                      Approve & Award 500 Pts
                    </button>
                    <button className={styles.btnReject} onClick={() => handleModerate(sub._id, 'Rejected')}>
                      Reject
                    </button>
                  </div>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Moderation finalized ({sub.status})</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

