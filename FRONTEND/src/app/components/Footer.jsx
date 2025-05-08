// components/Footer.jsx
import styles from '../page.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}