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
        router.push('/status');
      } else {
        alert('Something went wrong. Please try again.');
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
            <input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="btn-secondary" style={{display: 'block', margin: '10px 0', width: '100%', padding: '10px'}} />
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="btn-secondary" style={{display: 'block', margin: '10px 0', width: '100%', padding: '10px'}} />
            <button className="btn-primary" onClick={handleNext}>Next &rarr;</button>
          </div>
        )}
        {currentStep === 2 && (
          <div className={styles.placeholderCard}>
            <h3>Step 2: Profile (Socials)</h3>
            <input type="text" placeholder="Instagram Handle" value={formData.instagramHandle} onChange={(e) => setFormData({...formData, instagramHandle: e.target.value})} className="btn-secondary" style={{display: 'block', margin: '10px 0', width: '100%', padding: '10px'}} />
            <button className="btn-primary" onClick={handleNext}>Next &rarr;</button>
          </div>
        )}
        {currentStep === 3 && <div className={styles.placeholderCard}><h3>Step 3: Content</h3><button className="btn-primary" onClick={handleNext}>Next &rarr;</button></div>}
        {currentStep === 4 && <div className={styles.placeholderCard}><h3>Step 4: Review</h3><button className="btn-primary" disabled={isSubmitting} onClick={handleSubmit}>{isSubmitting ? 'Submitting...' : 'Submit &rarr;'}</button></div>}
      </div>
    </div>
  );
}
