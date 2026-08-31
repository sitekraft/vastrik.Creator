'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import styles from './page.module.css';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Payout & Earnings Query',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Payout & Earnings Query',
          message: ''
        });
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to send support ticket. Please email us directly at vastrik.support@gmail.com.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Navbar />

      <div className="container" style={{ padding: '60px 20px 80px' }}>
        <div className={styles.header}>
          <span className={styles.tag}>🎧 HELP DESK & CREATOR SUPPORT</span>
          <h1 className={styles.title}>
            WE'RE HERE TO HELP<br />
            <span className="gradient-text">VASTRIK SUPPORT ATELIER</span>
          </h1>
          <p className={styles.subtitle}>
            Have questions regarding application reviews, view-based payouts, video submissions, or technical issues? Reach out directly to our dedicated support team.
          </p>
        </div>

        {/* 4 Official Contact Hubs */}
        <div className={styles.channelsGrid}>
          {/* Channel 1: Phone / WhatsApp */}
          <div className={styles.channelCard}>
            <span className={styles.channelIcon}>📞</span>
            <h3>Direct Hotline & WhatsApp</h3>
            <p>Fast-track help for creators & brand inquiries</p>
            <div className={styles.channelActions}>
              <a href="tel:+918009651086" className={styles.btnAction}>
                Call +91 8009651086
              </a>
              <a 
                href="https://wa.me/918009651086?text=Hi%20Vastrik%20Support%2C%20I%20need%20help%20with%20my%20creator%20account" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.btnActionSecondary}
              >
                💬 WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Channel 2: Vastrik Support Email */}
          <div className={styles.channelCard}>
            <span className={styles.channelIcon}>✉️</span>
            <h3>Vastrik Creator Desk</h3>
            <p>Official support email (replies in 24h)</p>
            <a href="mailto:vastrik.support@gmail.com" className={styles.emailLink}>
              vastrik.support@gmail.com ↗
            </a>
          </div>

          {/* Channel 3: Parent Entity / Dev */}
          <div className={styles.channelCard}>
            <span className={styles.channelIcon}>🏢</span>
            <h3>Parent Entity / Tech Support</h3>
            <p>Sitekraft Dev engineering & platform team</p>
            <a href="mailto:sitekraft.dev@gmail.com" className={styles.emailLink}>
              sitekraft.dev@gmail.com ↗
            </a>
          </div>

          {/* Channel 4: Instagram */}
          <div className={styles.channelCard}>
            <span className={styles.channelIcon}>📸</span>
            <h3>Official Instagram DMs</h3>
            <p>Connect with the creative team</p>
            <a href="https://instagram.com/vastrikofficial" target="_blank" rel="noopener noreferrer" className={styles.emailLink}>
              @vastrikofficial ↗
            </a>
          </div>
        </div>

        {/* Form and FAQ 2-Col Grid */}
        <div className={styles.contentGrid}>
          {/* Ticket Form */}
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Submit Support Ticket</h2>
            <p className={styles.formSubtitle}>Send your details and our team will get back to your registered email.</p>

            {successMsg && (
              <div className={styles.successBox}>
                <h4>✅ Ticket Submitted Successfully</h4>
                <p>{successMsg}</p>
                <a 
                  href="https://wa.me/918009651086?text=Hi%20Vastrik%20Support%2C%20I%20just%20submitted%20a%20ticket%20on%20the%20support%20portal" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.fastTrackLink}
                >
                  ⚡ Click here to fast-track on WhatsApp (+91 8009651086)
                </a>
              </div>
            )}

            {errorMsg && (
              <div className={styles.errorBox}>
                <p>{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Your Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Priya Sharma" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="e.g. priya@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone / WhatsApp Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+91 8009651086" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Issue Category</label>
                <select name="subject" value={formData.subject} onChange={handleChange}>
                  <option value="Payout & Earnings Query">Payout & Earnings Query (UPI / Bank)</option>
                  <option value="Application Review Status">Application Review Status</option>
                  <option value="Video Submission Verification">Video Submission & View Count Verification</option>
                  <option value="AI Sketch Analyzer Help">vastrik.store / AI Sketch Analyzer Help</option>
                  <option value="Brand Partnership Inquiry">Brand Partnership Inquiry</option>
                  <option value="Other Technical Issue">Other Technical Issue</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Detailed Message *</label>
                <textarea 
                  rows="4" 
                  name="message" 
                  placeholder="Please describe your issue or question in detail..." 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                />
              </div>

              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '14px' }}>
                {loading ? 'Submitting...' : 'Send Message to Support Desk →'}
              </button>
            </form>
          </div>

          {/* Quick FAQ Card */}
          <div className={styles.faqCard}>
            <h2 className={styles.formTitle}>Frequently Asked Questions</h2>
            <p className={styles.formSubtitle}>Instant answers to common questions.</p>

            <div className={styles.faqList}>
              <div className={styles.faqItem}>
                <h4>💰 How do view payouts work?</h4>
                <p>Payouts are tiered directly on verified video views (₹5,000 for 1M+ views, ₹3,000 for 50k+ views, ₹2,000 for 30k+ views, ₹1,000 for 10k+ views). Payouts are transferred via UPI or IMPS within 48 hours of verification.</p>
              </div>

              <div className={styles.faqItem}>
                <h4>📦 Do I need physical clothes sent to me?</h4>
                <p>No! Vastrik operates on a zero-inventory creator model. You create digital reviews, Pinterest outfit breakdowns, and AI sketch tool walkthroughs directly on your phone/PC.</p>
              </div>

              <div className={styles.faqItem}>
                <h4>⏳ How long does application approval take?</h4>
                <p>Our team reviews portfolio links and niches within 24 to 48 hours. You can track your real-time status anytime at <Link href="/status" style={{ color: '#a5f3fc', textDecoration: 'underline' }}>vastrik.creator/status</Link>.</p>
              </div>

              <div className={styles.faqItem}>
                <h4>👗 What is vastrik.store?</h4>
                <p>Vastrik is an Indian custom fashion platform connecting customers with master Karigars to custom stitch any design from sketches or Pinterest photos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
