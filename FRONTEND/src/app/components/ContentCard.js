import { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';

const API_BASE_URL = "https://ugc-plbj.onrender.com"

export default function ContentCard({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [threadContent, setThreadContent] = useState([]);
  const [isThreadLoading, setIsThreadLoading] = useState(false);
  const [threadError, setThreadError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return 'Date not available';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setThreadContent([]);
    setThreadError(null);
    setIsThreadLoading(false);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen]);

  // Fetch thread content for Reddit/Quora when modal opens
  useEffect(() => {
    if (!isModalOpen || (item.source !== 'Reddit' && item.source !== 'Quora')) {
      return;
    }

    const fetchThreadContent = async () => {
      setIsThreadLoading(true);
      setThreadError(null);

      try {
        let url;
        if (item.source === 'Reddit') {
          if (!item.id) {
            console.warn('Missing Reddit post ID:', item);
            throw new Error('Thread content unavailable: Missing post ID');
          }
          url = `${API_BASE_URL}/thread?id=${encodeURIComponent(item.id)}`;
        } else if (item.source === 'Quora') {
          if (!item.url) {
            console.warn('Missing Quora post URL:', item);
            throw new Error('Thread content unavailable: Missing post URL');
          }
          url = `${API_BASE_URL}/quora/thread?url=${encodeURIComponent(item.url)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        // Handle Reddit (comments) or Quora (answers)
        const content = item.source === 'Reddit' ? data.comments || [] : data.answers || [];
        if (!Array.isArray(content)) {
          throw new Error('Invalid thread content format');
        }

        setThreadContent(content);
      } catch (error) {
        setThreadError(error.message || 'Failed to load thread content');
      } finally {
        setIsThreadLoading(false);
      }
    };

    fetchThreadContent();
  }, [isModalOpen, item.source, item.id, item.url]);

  // Render thread content (Reddit/Quora)
  const renderThreadContent = () => {
    if (item.source !== 'Reddit' && item.source !== 'Quora') {
      return null;
    }

    if (isThreadLoading) {
      return <p className="modal-thread-loading">Loading thread content...</p>;
    }

    if (threadError) {
      return <p className="modal-thread-error">{threadError}</p>;
    }

    if (!threadContent.length) {
      return <p className="modal-thread-empty">No thread content available</p>;
    }

    return (
      <div className="modal-thread">
        <h4>{item.source === 'Reddit' ? 'Comments' : 'Answers'}</h4>
        <ul>
          {threadContent.slice(0, 5).map((comment, index) => (
            <li key={index}>
              <div className="thread-author">{comment.author || 'Anonymous'}</div>
              <div className="thread-body">{comment.content_body || 'No content'}</div>
              {comment.date && (
                <div className="thread-date">{formatDate(comment.date)}</div>
              )}
              {item.source === 'Reddit' && comment.score != null && (
                <div className="thread-score">Score: {comment.score}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Derive subreddit from URL if not present
  const subreddit = item.subreddit || (item.url && item.url.match(/r\/[^\/]+/) ? item.url.match(/r\/[^\/]+/)[0] : 'N/A');

  return (
    <>
      <div
        className="content-card"
        onClick={handleOpenModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleOpenModal()}
      >
        {item.thumbnail && (
          <div className="card-thumbnail">
            <img
              src={item.thumbnail}
              alt={item.headline ? `${item.headline} thumbnail` : 'Post thumbnail'}
              className="thumbnail-image"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'; // Hide broken images
              }}
            />
          </div>
        )}
        <div className="card-header">
          <h3 className="card-title">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-link"
              onClick={(e) => e.stopPropagation()} // Prevent modal trigger
            >
              {item.headline || 'No title available'}
            </a>
          </h3>
        </div>
        <div className="card-body">
          <p>Platform: {item.source} | Author: {item.author}</p>
          <p>Subreddit: {subreddit} | Comments: {item.comments_count || 0}</p>
          <p>Date: {formatDate(item.date)} | Link: View | Score: {item.score || 0}</p>
        </div>
        <div className="card-footer">
          
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <div className="modal-header">
              <h3 id="modal-title" className="modal-title">
                {item.headline || 'No title available'}
              </h3>
              <button
                className="modal-close"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              {item.thumbnail && (
                <div className="modal-thumbnail">
                  <img
                    src={item.thumbnail}
                    alt={item.headline ? `${item.headline} thumbnail` : 'Post thumbnail'}
                    className="modal-thumbnail-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="modal-meta">
                <span className="modal-source">{item.source}</span>
                <span>{formatDate(item.date)}</span>
              </div>
              <div className="modal-content">
                <p>{item.content_body || 'No content available'}</p>
              </div>
              {renderThreadContent()}
            </div>
            <div className="modal-footer">
             
            </div>
          </div>
        </div>
      )}
    </>
  );
}