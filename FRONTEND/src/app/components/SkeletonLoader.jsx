// components/SkeletonLoader.jsx
import styles from '../page.module.css';

export default function SkeletonLoader() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
    </div>
  );
}