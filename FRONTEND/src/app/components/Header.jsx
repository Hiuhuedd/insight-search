// components/Header.jsx
import styles from '../page.module.css';

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <h1 className={styles.logo}>LatestNews.com</h1>

          <button
            onClick={() => {
              const newMode = !darkMode;
              setDarkMode(newMode);
              localStorage.setItem('darkMode', newMode.toString());
            }}
            className={styles.darkModeToggle}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}