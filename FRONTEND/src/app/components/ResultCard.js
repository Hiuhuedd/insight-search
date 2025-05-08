import { ExternalLink } from 'lucide-react';

export default function ResultCard({ item }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown date';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-bold mb-2">
        <a
          href={item.url || item.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {item.headline || item.title || 'Untitled'}
        </a>
      </h2>
      <p className="text-sm text-gray-600 mb-2">
        {item.platform} | {formatDate(item.date || item.publishedAt)}
      </p>
      <p className="text-gray-700 mb-4">
        {item.content_body || item.snippet || item.body || 'No content available'}
      </p>
      <a
        href={item.url || item.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        aria-label={`View original content on ${item.platform}`}
      >
        Link: View <ExternalLink size={16} className="ml-2" />
      </a>
    </div>
  );
}