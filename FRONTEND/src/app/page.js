'use client'
import { useState, useEffect } from 'react'
import { Search, Sun, Moon } from 'lucide-react'
import FilterTabs from './components/FilterTabs'
import ContentCard from './components/ContentCard'
import ErrorMessage from './components/ErrorMessage'
import useSearch from './hooks/useSearch'
import SkeletonLoader from './components/SkeletonLoader'

const ALL_FILTER = 'All'
const REDDIT_FILTER = 'Reddit'
const QUORA_FILTER = 'Quora'
const NEWS_FILTER = 'News'

const newsSources = [
  'BBC',
  'CNN',
  'Forbes',
  'Bloomberg',
  'Reuters',
  'The New York Times',
  'The Washington Post',
  'Time',
  'Axios',
  'NPR',
  'VOA News',
  'CBS News',
  'Fortune',
  'digitalworldwidenews.com',
  'theajcenter.com'
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [availableFilters, setAvailableFilters] = useState(['All'])
  const [theme, setTheme] = useState('dark')
  
  const {
    results,
    loading,
    error,
    search
  } = useSearch()

  useEffect(() => {
    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    
    const { availableSources } = await search(query)
    setAvailableFilters(availableSources)
    setActiveFilter('All')
  }

  const filteredResults = results.filter(item => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Reddit') return item.source === 'Reddit'
    if (activeFilter === 'Quora') return item.source === 'Quora'
    if (activeFilter === 'News') return item.source !== 'Reddit' && item.source !== 'Quora'
    return item.source === activeFilter
  })

  return (
    <div className="container">
      <nav className="navbar">
        <a href="/" className="navbar-logo">InsightHub</a>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </nav>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-headline">Explore the Web’s Best Insights</h1>
          <p className="hero-subheadline">Search Reddit, Quora, and top news sources in one sleek platform</p>
        </div>
      </section>
      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for topics (e.g., 'tesla')"
            className="search-input"
            aria-label="Search topics"
          />
          <button type="submit" className="search-button" aria-label="Submit search">
            <Search size={20} />
            Search
          </button>
        </form>
        
        {results.length > 0 && (
          <FilterTabs 
            filters={availableFilters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        )}
      </section>

      <main className="main">
        {loading && <SkeletonLoader />}
        
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && filteredResults.length === 0 && (
          <div className="no-results">
            {results.length === 0 
              ? 'No results found. Try a different search term.'
              : 'No results found for this filter.'}
          </div>
        )}

        {!loading && !error && filteredResults.length > 0 && (
          <div className="content-grid">
            {filteredResults.map((item, index) => (
              <ContentCard key={`${item.source}-${index}`} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}