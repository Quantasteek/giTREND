import React from 'react';

export default function FilterPanel({ 
  onLanguageChange, 
  onSortChange, 
  showOnlyBookmarked, 
  onToggleBookmarked, 
  bookmarkedCount
}) {
  const handleLanguageChange = (e) => {
    const value = e.target.value;
    console.log('Language changed to:', value);
    onLanguageChange(value === "" ? "" : value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    console.log('Sort changed to:', value);
    onSortChange(value);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-6 items-center">
      <select 
        onChange={handleLanguageChange} 
        className="border border-slate-600 rounded-lg px-4 py-3 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
      >
        <option value="">All Languages</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="go">Go</option>
        <option value="rust">Rust</option>
        <option value="typescript">TypeScript</option>
        <option value="cpp">C++</option>
        <option value="csharp">C#</option>
        <option value="php">PHP</option>
        <option value="ruby">Ruby</option>
        <option value="swift">Swift</option>
        <option value="kotlin">Kotlin</option>
        <option value="scala">Scala</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>
      
      <select 
        onChange={handleSortChange} 
        className="border border-slate-600 rounded-lg px-4 py-3 bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
      >
        <option value="stars">Most Stars</option>
        <option value="updated">Recently Updated</option>
      </select>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyBookmarked}
            onChange={(e) => onToggleBookmarked(e.target.checked)}
            className="w-4 h-4 text-violet-600 bg-slate-800 border-slate-600 rounded focus:ring-violet-500 focus:ring-2"
          />
          <span className="text-slate-200">Show bookmarks only</span>
        </label>
        
        {bookmarkedCount > 0 && (
          <span className="text-sm text-slate-400">
            {bookmarkedCount} bookmarked
          </span>
        )}
      </div>
    </div>
  );
}
