

import styles from '../page.module.css';

export default function Modal({ isModalOpen, closeModal, isLoading, thread, formatDate }) {
  if (!isModalOpen) return null;

  const platform = thread?.platform || '';

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={closeModal}>
          ×
        </button>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading content...</p>
          </div>
        ) : thread ? (
          <div className={styles.modalBody}>
            <h2 className={styles.modalTitle}>{thread.title}</h2>
            <div className={styles.modalMeta}>
              {platform === 'reddit' && thread.subreddit && (
                <>
                  <span>r/{thread.subreddit}</span>
                  <span>•</span>
                  <span>u/{thread.author}</span>
                  <span>•</span>
                  <span>{formatDate(thread.created_utc)}</span>
                </>
              )}
              {(platform === 'ajcenter' || platform === 'dwn' || thread.sourceType === 'news') && (
                <>
                  <span>{thread.source || 'Unknown Source'}</span>
                  <span>•</span>
                  <span>{thread.author || 'Unknown Author'}</span>
                  <span>•</span>
                  <span>{formatDate(thread.published_date)}</span>
                </>
              )}
              {platform === 'quora' && (
                <>
                  <span>Quora</span>
                  {thread.author && (
                    <>
                      <span>•</span>
                      <span>{thread.author}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{formatDate(thread.created_utc || thread.published_date)}</span>
                </>
              )}
            </div>
            {thread.thumbnail && (
              <img
                src={thread.thumbnail}
                alt="Content thumbnail"
                className={styles.modalThumbnail}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                }}
              />
            )}
            {thread.body && (
              <div className={styles.modalBodyText}>
                <p>{thread.body}</p>
                {thread.url && (
                  <a
                    href={thread.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalLink}
                  >
                    Read more on {platform === 'quora' ? 'Quora' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                )}
              </div>
            )}
            {(platform === 'reddit' || platform === 'quora') && (
              <div className={styles.commentsSection}>
                <h3 className={styles.commentsTitle}>
                  {platform === 'reddit' ? 'Comments' : 'Answers'}
                </h3>
                <div className={styles.commentsList}>
                  {platform === 'reddit'
                    ? (thread.comments || []).map((comment) => (
                        <div key={comment.id} className={styles.commentItem}>
                          <div className={styles.commentHeader}>
                            <span className={styles.commentAuthor}>{comment.author}</span>
                            <time className={styles.commentDate}>
                              {formatDate(comment.created_utc)}
                            </time>
                          </div>
                          <p className={styles.commentBody}>{comment.body}</p>
                        </div>
                      ))
                    : (thread.answers || []).map((answer, index) => (
                        <div key={index} className={styles.commentItem}>
                          <div className={styles.commentHeader}>
                            <span className={styles.commentAuthor}>{answer.author}</span>
                          </div>
                          <p className={styles.commentBody}>{answer.body}</p>
                        </div>
                      ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.modalError}>
            <p>Failed to load content</p>
            <button className={styles.modalCloseButton} onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
