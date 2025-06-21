import React from 'react';

export default function RepoCard({ repo, isBookmarked, onBookmarkToggle }) {
  return (
    <div className={`bg-slate-800 border rounded-xl shadow-lg p-6 transition-all duration-300 ${
      isBookmarked 
        ? 'border-violet-500 shadow-violet-500/20' 
        : 'border-slate-700 hover:shadow-xl hover:border-violet-500'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <h2 className="font-bold text-xl flex-1">
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-violet-400 transition-colors duration-200"
          >
            {repo.full_name}
          </a>
        </h2>
        <button
          onClick={onBookmarkToggle}
          className={`ml-2 p-1 rounded-full transition-all duration-200 ${
            isBookmarked 
              ? 'text-violet-400 hover:text-violet-300' 
              : 'text-slate-400 hover:text-violet-400'
          }`}
          title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <svg 
            className="w-5 h-5" 
            fill={isBookmarked ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
            />
          </svg>
        </button>
      </div>
      <p className="text-sm text-slate-300 mb-3 line-clamp-2">{repo.description}</p>
      <div className="text-xs text-slate-400">
        ⭐ {repo.stargazers_count} | 🛠 {repo.language} | 🕒 {new Date(repo.updated_at).toLocaleDateString()}
      </div>
    </div>
  );
}
