import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://ugc-plbj.onrender.com"

export default function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const [redditResults, quoraResults, newsResults] = await Promise.all([
        fetchRedditResults(query),
        fetchQuoraResults(query),
        fetchNewsResults(query),
      ]);

      // Normalize and combine results
      const combinedResults = [
        ...normalizeRedditResults(redditResults),
        ...normalizeQuoraResults(quoraResults),
        ...normalizeNewsResults(newsResults),
      ];

      setResults(combinedResults);

      // Return the available sources for filter generation
      return {
        results: combinedResults,
        availableSources: getAvailableSources(combinedResults),
      };
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch results. Please try again later.');
      setResults([]);
      return {
        results: [],
        availableSources: [],
      };
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSources = (results) => {
    const sources = new Set();

    // Always include 'All' filter
    sources.add('All');

    results.forEach((item) => {
      if (item.source === 'Reddit' || item.source === 'Quora') {
        sources.add(item.source);
      } else {
        // For news sources, add both the specific source and 'News' category
        sources.add(item.source);
        sources.add('News');
      }
    });

    return Array.from(sources);
  };

  const fetchRedditResults = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
      return response.data || [];
    } catch (err) {
      console.error('Reddit search error:', err);
      return [];
    }
  };

  const fetchQuoraResults = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/quora/search?query=${encodeURIComponent(query)}`);
      return response.data || [];
    } catch (err) {
      console.error('Quora search error:', err);
      return [];
    }
  };

  const fetchNewsResults = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/news/search?query=${encodeURIComponent(query)}`);
      return response.data || [];
    } catch (err) {
      console.error('News search error:', err);
      return [];
    }
  };

  const normalizeRedditResults = (items) => {
    return items.map((item) => ({
      id: item.post_id,
      headline: item.headline || '',
      source: 'Reddit',
      content_body: item.content_body || '',
      date: item.date || null,
      thumbnail: item.thumbnail || null,
      url: item.url || '',
      author: item.author || 'Unknown',
      score: item.score || 0,
      comments_count: item.comments || 0,
    }));
  };

  const normalizeQuoraResults = (items) => {
    return items.map((item) => ({
      headline: item.headline || '',
      source: 'Quora',
      content_body: item.content_body || '',
      date: item.date || null,
      thumbnail: item.thumbnail || null,
      url: item.url || '',
      author: item.author || 'Unknown',
      answer_count: item.answer_count || 0,
    }));
  };

  const normalizeNewsResults = (items) => {
    return items.map((item) => ({
      headline: item.headline || '',
      source: item.source || 'News',
      content_body: item.content_body || '',
      date: item.date || null,
      thumbnail: item.thumbnail || null,
      url: item.url || '',
      author: item.author || 'Unknown',
    }));
  };

  return {
    results,
    loading,
    error,
    search,
  };
}