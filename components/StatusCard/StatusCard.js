'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './StatusCard.module.css';

export default function StatusCard() {
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [appData, setAppData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchStatus = async (query) => {
    if (!query) return;
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch(`/api/status?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success && data.application) {
        setAppData(data.application);
      } else {
        setAppData(null);
        setErrorMessage(data.message || 'No creator application found matching this email or ID.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not connect to status server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const emailParam = searchParams.get('email') || searchParams.get('id') || searchParams.get('q');
    if (emailParam) {
      setSearchInput(emailParam);
      fetchStatus(emailParam);
    } else if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('vastrik_creator_email') || localStorage.getItem('vastrik_creator_app_id');
      if (savedEmail) {
        setSearchInput(savedEmail);
        fetchStatus(savedEmail);
      }
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchStatus(searchInput);
    }
  };

  return (
    <div className={styles.card}>
      {/* Search Header */}
      <div className={styles.searchSection}>
        <span className={styles.tag}>
          <span className={styles.icon}>🔍</span> APPLICATION TRACKER
        </span>
        <h1 className={styles.title}>CHECK YOUR STATUS</h1>
        <p className={styles.subtitle}>
          Enter your registered email address or Application ID to view your real-time review progress.
        </p>

        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="Enter your registered email (e.g. creator@gmail.com)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'CHECKING...' : 'CHECK STATUS'}
          </button>
        </form>
      </div>

      {loading && (
        <div className={styles.loadingBox}>
          <div className={styles.spinner}></div>
          <p>Fetching application records from Vastrik database...</p>
        </div>
      )}

      {errorMessage && !loading && (
        <div className={styles.errorBox}>
          <p className={styles.errorText}>⚠️ {errorMessage}</p>
          <div className={styles.errorActions}>
            <Link href="/apply" className="btn-primary">
              Submit New Application &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Result Display */}
      {appData && !loading && (
        <div className={styles.resultContainer}>
          <div className={styles.resultHeader}>
            <span className={`${styles.statusBadge} ${styles[appData.status.toLowerCase()]}`}>
              <span className={styles.statusDot}></span> {appData.status === 'Approved' ? 'APPLICATION APPROVED' : appData.status === 'Rejected' ? 'NOT APPROVED' : 'APPLICATION UNDER REVIEW'}
            </span>
          </div>

          <h2 className={styles.applicantGreeting}>
            {appData.status === 'Approved' 
              ? `WELCOME TO THE ATELIER, ${appData.fullName.toUpperCase()}! 🎉` 
              : `HELLO ${appData.fullName.toUpperCase()}, YOU'RE IN THE RUN! 🚀`}
          </h2>

          <p className={styles.statusExplainer}>
            {appData.status === 'Approved'
              ? 'Congratulations! Your creator profile has been approved by the Vastrik team. You now have access to active campaign briefs and creator tools.'
              : appData.status === 'Rejected'
              ? 'Thank you for your interest. Unfortunately, your application was not selected at this time. You can re-apply in 30 days.'
              : 'Your application has been received and is currently being evaluated by our curation council.'}
          </p>

          {/* Stepper Tracker */}
          <div className={styles.tracker}>
            <div className={styles.step}>
              <div className={`${styles.circle} ${styles.completed}`}>✓</div>
              <span className={`${styles.label} ${styles.completedLabel}`}>Submitted</span>
            </div>
            <div className={`${styles.line} ${appData.status !== 'Pending' ? styles.completedLine : styles.activeLine}`}></div>
            
            <div className={styles.step}>
              <div className={`${styles.circle} ${appData.status === 'Approved' ? styles.completed : appData.status === 'Rejected' ? styles.rejected : styles.active}`}>
                {appData.status === 'Approved' ? '✓' : appData.status === 'Rejected' ? '✕' : <span className={styles.dot}></span>}
              </div>
              <span className={`${styles.label} ${appData.status === 'Approved' ? styles.completedLabel : appData.status === 'Rejected' ? styles.rejectedLabel : styles.activeLabel}`}>
                {appData.status === 'Approved' ? 'Approved' : appData.status === 'Rejected' ? 'Declined' : 'In Review'}
              </span>
            </div>
            
            <div className={`${styles.line} ${appData.status === 'Approved' ? styles.completedLine : ''}`}></div>
            
            <div className={styles.step}>
              <div className={`${styles.circle} ${appData.status === 'Approved' ? styles.completed : ''}`}>
                {appData.status === 'Approved' ? '🔓' : '🔒'}
              </div>
              <span className={`${styles.label} ${appData.status === 'Approved' ? styles.completedLabel : ''}`}>
                {appData.status === 'Approved' ? 'Access Granted' : 'Locked'}
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>APPLICATION ID</span>
              <span className={styles.detailValueBox}>#VST-{appData.id.slice(-6).toUpperCase()}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>SUBMISSION DATE</span>
              <span className={styles.detailValue}>
                {new Date(appData.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>REGISTERED EMAIL</span>
              <span className={styles.detailValue}>{appData.email}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>CONTENT NICHE</span>
              <span className={styles.detailValue}>{appData.contentNiche || 'Fashion / Lifestyle'}</span>
            </div>
          </div>

          {/* Action CTA */}
          <div className={styles.accessActionBox}>
            {appData.status === 'Approved' ? (
              <Link href="/dashboard" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                Enter Creator Dashboard &rarr;
              </Link>
            ) : (
              <div className={styles.pendingInfo}>
                <p>💡 Review typically takes <strong>24–48 hours</strong>. Once approved, your email will automatically unlock creator dashboard access.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* When no query and no app data */}
      {!appData && !errorMessage && !loading && (
        <div className={styles.noSearchBox}>
          <div className={styles.noSearchIcon}>✨</div>
          <h3>Haven't applied yet?</h3>
          <p>Join the Vastrik Creator Program to get paid up to ₹5,000 for 1M views on your fashion styling videos.</p>
          <Link href="/apply" className="btn-primary" style={{ marginTop: '16px' }}>
            Apply for Creator Access &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}

