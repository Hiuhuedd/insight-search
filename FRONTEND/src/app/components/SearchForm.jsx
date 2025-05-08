
import styles from '../page.module.css';

export default function SearchForm({ query, setQuery, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search across all sources..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton} aria-label="Search">
        🔍
      </button>
    </form>
  );
}
