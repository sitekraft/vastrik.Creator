'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function BrandCollaborations() {
  const [formData, setFormData] = useState({
    brandName: '',
    contactPerson: '',
    businessEmail: '',
    phone: '',
    collaborationType: 'Creator Campaign Sponsorship',
    budgetRange: '₹50,000 - ₹2,00,000',
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
      const res = await fetch('/api/collaborations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setFormData({
          brandName: '',
          contactPerson: '',
          businessEmail: '',
          phone: '',
          collaborationType: 'Creator Campaign Sponsorship',
          budgetRange: '₹50,000 - ₹2,00,000',
          message: ''
        });
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to submit inquiry. Please email us directly at vastrik.support@gmail.com.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <Navbar />

      <div className="container" style={{ padding: '60px 20px 80px' }}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>🤝 BRAND & DESIGNER PARTNERSHIPS</span>
          <h1 className={styles.title}>
            SCALE YOUR BRAND WITH<br />
            <span className="gradient-text">VASTRIK CREATOR ATELIER</span>
          </h1>
          <p className={styles.subtitle}>
            Partner with India's bespoke custom stitching marketplace (vastrik.store). Sponsor high-converting creator challenges, co-create designer capsule collections, or collaborate with our master karigar network.
          </p>
        </div>

        {/* Quick Contact Bar */}
        <div className={styles.contactCardsGrid}>
          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>✉️</span>
            <h3>Official Brand Desk</h3>
            <p>Direct partnership inquiries & RFP</p>
            <a href="mailto:vastrik.support@gmail.com?subject=Brand Partnership Proposal" className={styles.cardLink}>
              vastrik.support@gmail.com ↗
            </a>
          </div>

          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>🏢</span>
            <h3>Parent Entity / Tech</h3>
            <p>Sitekraft Dev & Enterprise integrations</p>
            <a href="mailto:sitekraft.dev@gmail.com?subject=Sitekraft x Vastrik Enterprise Inquiry" className={styles.cardLink}>
              sitekraft.dev@gmail.com ↗
            </a>
          </div>

          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>📸</span>
            <h3>Instagram Official</h3>
            <p>Connect with our creative team on DMs</p>
            <a href="https://instagram.com/vastrikofficial" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              @vastrikofficial ↗
            </a>
          </div>

          <div className={styles.contactCard}>
            <span className={styles.contactIcon}>📞</span>
            <h3>Direct Hotline & WhatsApp</h3>
            <p>Instant chat with our partnership lead</p>
            <a href="https://wa.me/918009651086?text=Hi%20Vastrik%20Team%2C%20we%20want%20to%20discuss%20a%20brand%20collaboration" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              +91 8009651086 ↗
            </a>
          </div>
        </div>

        {/* Form Section */}
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Submit Brand Collaboration Brief</h2>
            <p>Tell us about your brand goals. We will curate the ideal creator roster and tailored campaign proposal.</p>
          </div>

          {successMsg && (
            <div className={styles.successBanner}>
              <h3>🎉 Inquiry Submitted!</h3>
              <p>{successMsg}</p>
              <div style={{ marginTop: '16px' }}>
                <a 
                  href="https://wa.me/918009651086?text=Hi%20Vastrik%20Team%2C%20we%20just%20submitted%20a%20collaboration%20inquiry%20via%20the%20portal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-flex', padding: '10px 20px', fontSize: '0.85rem' }}
                >
                  💬 Fast-Track on WhatsApp (+91 8009651086)
                </a>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className={styles.errorBanner}>
              <p>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Brand / Label Name *</label>
                <input 
                  type="text" 
                  name="brandName" 
                  placeholder="e.g. Saffron Couture / Vogue Street"
                  value={formData.brandName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Contact Person & Title *</label>
                <input 
                  type="text" 
                  name="contactPerson" 
                  placeholder="e.g. Ananya Sen (Marketing Head)"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Official Business Email *</label>
                <input 
                  type="email" 
                  name="businessEmail" 
                  placeholder="name@brand.com"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phone / WhatsApp Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Collaboration Type</label>
                <select name="collaborationType" value={formData.collaborationType} onChange={handleChange}>
                  <option value="Creator Campaign Sponsorship">Creator Campaign & Challenge Sponsorship</option>
                  <option value="Bespoke Capsule Line">Bespoke Capsule Collection with Vastrik Karigars</option>
                  <option value="Fabric & Textile Partnership">Fabric / Weaves Supply & Karigar Integration</option>
                  <option value="AI Sketch Analyzer Co-Branding">AI Sketch Analyzer Co-Branding</option>
                  <option value="Other / Custom Partnership">Other / Custom Strategic Partnership</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Estimated Campaign Budget</label>
                <select name="budgetRange" value={formData.budgetRange} onChange={handleChange}>
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000 (Pilot Campaign)</option>
                  <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000 (Multi-Creator Push)</option>
                  <option value="₹2,00,000 - ₹10,00,000">₹2,00,000 - ₹10,00,000 (Full-Scale Capsule)</option>
                  <option value="₹10,00,000+">₹10,00,000+ (Enterprise / Global Partner)</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Campaign Goals & Message *</label>
              <textarea 
                rows="4" 
                name="message" 
                placeholder="Describe your brand, target audience, preferred creators, and timeline..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '1rem', marginTop: '12px' }}>
              {loading ? 'Submitting Brief...' : 'Submit Partnership Proposal →'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
