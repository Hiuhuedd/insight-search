import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ query, onSearch }) {
  const [input, setInput] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky top-0 z-10 bg-gray-100 py-4">
      <div className="flex items-center max-w-3xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for news (e.g., tesla)"
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search query"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          aria-label="Search"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
}