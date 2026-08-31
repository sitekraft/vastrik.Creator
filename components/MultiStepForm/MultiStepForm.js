'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MultiStepForm.module.css';
import Step1BasicInfo from '../FormSteps/Step1BasicInfo';

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const steps = [
    { num: 1, label: 'BASIC INFO' },
    { num: 2, label: 'PROFILE' },
    { num: 3, label: 'CONTENT' },
    { num: 4, label: 'REVIEW' },
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    instagramHandle: '',
    youtubeHandle: '',
    contentNiche: '',
    aesthetics: '',
    portfolioLink: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        alert('Please fill out all basic info fields.');
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!formData.instagramHandle && !formData.youtubeHandle) {
        alert('Please provide at least one social media handle (Instagram or YouTube).');
        return;
      }
    }
    
    if (currentStep === 3) {
      if (!formData.contentNiche || !formData.aesthetics) {
        alert('Please select your primary niche and describe your aesthetic.');
        return;
      }
    }

    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        const query = new URLSearchParams({
          id: data.applicationId,
          email: data.email,
          date: data.date
        }).toString();
        router.push(`/status?${query}`);
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.tag}>JOIN THE CREATOR PROGRAM</h2>
      <h1 className={styles.title}>
        LET'S GET TO<br />
        <span className="gradient-text">KNOW YOU.</span>
      </h1>
      <p className={styles.subtitle}>
        Tell us about yourself and your content. If selected, you'll get access to exclusive challenges and rewards within the Vastrik ecosystem.
      </p>

      <div className={styles.stepper}>
        {steps.map((step, idx) => (
          <div key={idx} className={styles.stepWrapper}>
            <div className={`${styles.step} ${currentStep >= step.num ? styles.activeStep : ''}`}>
              <div className={styles.stepCircle}>{step.num}</div>
              <div className={styles.stepLabel}>{step.label}</div>
            </div>
            {idx < steps.length - 1 && (
              <div className={`${styles.connector} ${currentStep > step.num ? styles.activeConnector : ''}`}></div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.stepContent}>
        {currentStep === 1 && (
          <div className={styles.placeholderCard}>
            <h3>Step 1: Basic Info</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input type="text" placeholder="e.g. Rahul Sharma" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input type="email" placeholder="e.g. rahul@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <input type="tel" placeholder="e.g. 9876543210" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={styles.input} />
            </div>
            <div className={styles.btnGroup}>
              <button className="btn-primary" onClick={handleNext}>Next &rarr;</button>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className={styles.placeholderCard}>
            <h3>Step 2: Profile (Socials)</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Instagram Handle</label>
              <input type="text" placeholder="@yourhandle" value={formData.instagramHandle} onChange={(e) => setFormData({...formData, instagramHandle: e.target.value})} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>YouTube Handle (Optional)</label>
              <input type="text" placeholder="@yourhandle" value={formData.youtubeHandle} onChange={(e) => setFormData({...formData, youtubeHandle: e.target.value})} className={styles.input} />
            </div>
            <div className={styles.btnGroup}>
              <button className="btn-secondary" onClick={() => setCurrentStep(1)}>&larr; Back</button>
              <button className="btn-primary" onClick={handleNext}>Next &rarr;</button>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className={styles.placeholderCard}>
            <h3>Step 3: Content & Aesthetics</h3>
            <div className={styles.formGroup}>
              <label className={styles.label}>Primary Niche</label>
              <select value={formData.contentNiche} onChange={(e) => setFormData({...formData, contentNiche: e.target.value})} className={styles.input}>
                <option value="">Select Niche...</option>
                <option value="Fashion artist">Fashion artist</option>
                <option value="Content creator">Content creator</option>
                <option value="Reel creator">Reel creator</option>
                <option value="Digital creator">Digital creator</option>
                <option value="Clothing">Clothing</option>
                <option value="Streetwear">Streetwear</option>
                <option value="High Fashion">High Fashion</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Describe Your Aesthetic</label>
              <textarea placeholder="Tell us about your style and vibe..." value={formData.aesthetics} onChange={(e) => setFormData({...formData, aesthetics: e.target.value})} className={styles.textarea}></textarea>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Portfolio Link (Optional)</label>
              <input type="url" placeholder="Link to your best work or media kit" value={formData.portfolioLink} onChange={(e) => setFormData({...formData, portfolioLink: e.target.value})} className={styles.input} />
            </div>
            <div className={styles.btnGroup}>
              <button className="btn-secondary" onClick={() => setCurrentStep(2)}>&larr; Back</button>
              <button className="btn-primary" onClick={handleNext}>Next &rarr;</button>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
          <div className={styles.placeholderCard}>
            <h3>Step 4: Review Application</h3>
            
            <div className={styles.reviewItem}>
              <div className={styles.reviewLabel}>Full Name & Email</div>
              <div className={styles.reviewValue}>{formData.fullName || '-'} | {formData.email || '-'}</div>
            </div>
            
            <div className={styles.reviewItem}>
              <div className={styles.reviewLabel}>Social Handles</div>
              <div className={styles.reviewValue}>IG: {formData.instagramHandle || '-'} | YT: {formData.youtubeHandle || '-'}</div>
            </div>
            
            <div className={styles.reviewItem}>
              <div className={styles.reviewLabel}>Content Niche</div>
              <div className={styles.reviewValue}>{formData.contentNiche || '-'}</div>
            </div>
            
            <div className={styles.reviewItem}>
              <div className={styles.reviewLabel}>Aesthetic</div>
              <div className={styles.reviewValue}>{formData.aesthetics || '-'}</div>
            </div>
            
            <div className={styles.btnGroup}>
              <button className="btn-secondary" onClick={() => setCurrentStep(3)}>&larr; Back</button>
              <button className="btn-primary" disabled={isSubmitting} onClick={handleSubmit}>
                {isSubmitting ? 'Submitting...' : 'Submit Application →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
