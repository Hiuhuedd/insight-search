
import styles from '../page.module.css';

export default function SourceFilter({ posts, selectedSource, setSelectedSource }) {
  const getUniqueSources = (posts) => {
    const sources = [...new Set(posts.map((post) => post.originalSource || 'Unknown'))];
    return sources.sort();
  };

  return (
    <div className={styles.sourceFilter}>
      <button
        onClick={() => setSelectedSource(null)}
        className={`${styles.sourceButton} ${selectedSource === null ? styles.active : ''}`}
      >
        All Sources
      </button>
      {getUniqueSources(posts).map((source) => (
        <button
          key={source}
          onClick={() => setSelectedSource(source)}
          className={`${styles.sourceButton} ${selectedSource === source ? styles.active : ''}`}
        >
          {source}
        </button>
      ))}
    </div>
  );
}
