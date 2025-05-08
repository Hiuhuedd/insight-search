import styles from '../page.module.css';
import Link from 'next/link';

const FALLBACK_IMAGE = 'https://via.placeholder.com/150?text=No+Image';

export default function Card({ post, selectedPost, handlePostClick, formatDate }) {
  const postKey = post.url || post.permalink || post.post_id || `post-${Math.random().toString(36).substr(2, 9)}`;
  const postLink = post.url || post.permalink;

  const isValidThumbnail = (thumbnail) => {
    if (!thumbnail) return false;
    return !['default', 'self', 'nsfw', 'image'].includes(thumbnail) && thumbnail.startsWith('http');
  };

  // Map platform IDs to display names
  const platformDisplayName = {
    reddit: 'Reddit',
    quora: 'Quora',
    ajcenter: 'AJ Center',
    dwn: 'DWN',
  };

  return (
    <article
      key={postKey}
      onClick={() => postLink && handlePostClick(postLink, post.platform)}
      className={`${styles.card} ${selectedPost === postLink ? styles.selected : ''}`}
    >
      {isValidThumbnail(post.thumbnail) && (
        <div className={styles.cardImage}>
          <img
            src={post.thumbnail}
            alt={post.title || 'Post thumbnail'}
            className={styles.thumbnail}
            loading="lazy"
            onError={(e) => {
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        </div>
      )}

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>
          <Link href={post.url || post.permalink} target="_blank" rel="noopener noreferrer">
            {post.title || 'No title available'}
          </Link>
        </h3>

        <div className={styles.cardMeta}>
          <span>Platform: {platformDisplayName[post.platform] || 'Unknown'}</span>
          {post.originalSource && <span> | Original Source: {post.originalSource}</span>}
          {post.author && <span> | Author: {post.author}</span>}
          {post.platform === 'reddit' && post.subreddit && <span> | Subreddit: r/{post.subreddit}</span>}
          {post.platform === 'reddit' && post.comments && <span> | Comments: {post.comments}</span>}
          {post.platform === 'quora' && post.answers && post.answers.length > 0 && (
            <span> | Answers: {post.answers.length}</span>
          )}
          {(post.created_utc || post.published_date) && (
            <span> | Date: {formatDate(post.created_utc || post.published_date)}</span>
          )}
          {(post.snippet || post.body) && (
            <div className={styles.cardSnippet}>
              <span>Content: {post.snippet || post.body || 'No content available'}</span>
            </div>
          )}
          {(post.url || post.permalink) && (
            <span>
              {' '}
              | Link:{' '}
              <Link href={post.url || post.permalink} target="_blank" rel="noopener noreferrer">
                View
              </Link>
            </span>
          )}
          {Object.keys(post).length > 0 && (
            <div className={styles.cardExtraDetails}>
              {Object.entries(post)
                .filter(
                  ([key]) =>
                    ![
                      'title',
                      'author',
                      'source',
                      'platform',
                      'subreddit',
                      'comments',
                      'created_utc',
                      'published_date',
                      'thumbnail',
                      'url',
                      'permalink',
                      'post_id',
                      'snippet',
                      'body',
                      'originalSource',
                    ].includes(key)
                )
                .map(([key, value]) => (
                  <span key={key}> | {key}: {value || 'N/A'}</span>
                ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}