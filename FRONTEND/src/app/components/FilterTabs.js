export default function FilterTabs({ filters, activeFilter, onFilterChange }) {
    // Sort filters with 'All' first, then 'Reddit', 'Quora', 'News', then others alphabetically
    const sortedFilters = [...filters].sort((a, b) => {
      if (a === 'All') return -1
      if (b === 'All') return 1
      if (a === 'Reddit') return -1
      if (b === 'Reddit') return 1
      if (a === 'Quora') return -1
      if (b === 'Quora') return 1
      if (a === 'News') return -1
      if (b === 'News') return 1
      return a.localeCompare(b)
    })
  
    return (
      <div className="filter-tabs">
        {sortedFilters.map(filter => (
          <button
            key={filter}
            className={`filter-tab ${filter === activeFilter ? 'active' : ''}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    )
  }