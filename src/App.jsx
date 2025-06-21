import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import RepoCard from './components/RepoCard';
import ChartPanel from './components/ChartPanel';
import { fetchTrendingRepos } from './services/githubApi';

function App() {
  const [repos, setRepos] = useState([]);
  const [bookmarkedRepos, setBookmarkedRepos] = useState([]);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('');
  const [sort, setSort] = useState('stars');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Filters changed:', { query, language, sort });
    setLoading(true);
    setError(null);
    
    fetchTrendingRepos({ query, language, sort })
      .then(data => {
        console.log('Fetched repos:', data.length);
        setRepos(data);
        // Clear bookmarks on change filter
        setBookmarkedRepos([]);
        setShowOnlyBookmarked(false);
      })
      .catch(err => {
        console.error('Error fetching repos:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, language, sort]);

  const handleBookmarkToggle = (repoId) => {
    setBookmarkedRepos(prev => {
      if (prev.includes(repoId)) {
        return prev.filter(id => id !== repoId);
      } else {
        return [...prev, repoId];
      }
    });
  };

  const displayedRepos = showOnlyBookmarked 
    ? repos.filter(repo => bookmarkedRepos.includes(repo.id))
    : repos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
        gi<span className='text-white'>TREND
        </span>
      </h1>
      
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">
          Error: {error}
        </div>
      )}
      
      <SearchBar onSearch={setQuery} />
      <FilterPanel 
        onLanguageChange={setLanguage} 
        onSortChange={setSort}
        showOnlyBookmarked={showOnlyBookmarked}
        onToggleBookmarked={setShowOnlyBookmarked}
        bookmarkedCount={bookmarkedRepos.length}
      />
      
      {loading && (
        <div className="text-center py-8">
          <div className="text-slate-300">Loading repositories...</div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {displayedRepos.map(repo => (
          <RepoCard 
            key={repo.id} 
            repo={repo} 
            isBookmarked={bookmarkedRepos.includes(repo.id)}
            onBookmarkToggle={() => handleBookmarkToggle(repo.id)}
          />
        ))}
      </div>
      <ChartPanel repos={displayedRepos} />
    </div>
  );
}

export default App;

