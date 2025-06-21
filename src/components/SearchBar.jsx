import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  return (
    <div className="flex gap-3">
      <input
        className="flex-1 border border-slate-600 rounded-lg px-4 py-3 bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        placeholder="Search repositories..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
        onClick={() => onSearch(input)}
      >
        Search
      </button>
    </div>
  );
}
