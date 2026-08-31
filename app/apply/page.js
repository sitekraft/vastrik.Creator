import ApplyNavbar from '@/components/ApplyNavbar/ApplyNavbar';
import MultiStepForm from '@/components/MultiStepForm/MultiStepForm';
import ApplyPromoImage from '@/components/ApplyPromoImage/ApplyPromoImage';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export default function ApplyPage() {
  return (
    <main className={styles.main}>
      <ApplyNavbar />
      
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.formCol}>
            <MultiStepForm />
          </div>
          <div className={styles.imageCol}>
            <ApplyPromoImage />
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

