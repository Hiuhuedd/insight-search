
import Card from './Card';
import styles from '../page.module.css';

export default function ResultsGrid({
  posts,
  selectedPost,
  handlePostClick,
  formatDate,
  displayedPlatform,
}) {
  return (
    <div className={styles.resultsGrid}>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <Card
            key={`${post.platform}-${index}`}
            post={post}
            selectedPost={selectedPost}
            handlePostClick={handlePostClick}
            formatDate={formatDate}
          />
        ))
      ) : (
        <div className={styles.noResults}>
          No results found for {displayedPlatform.charAt(0).toUpperCase() + displayedPlatform.slice(1)}.
        </div>
      )}
    </div>
  );
}
