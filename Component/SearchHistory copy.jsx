'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function SearchHistory({ isVisible, onClose, onSelect }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-full mt-2 w-[430px] bg-[#1a1a1a] border border-white/10 rounded-xl shadow-lg z-50 overflow-hidden">
      <div className="p-3 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-semibold">Recent searches</h3>
        <button 
          onClick={clearHistory}
          className="text-sm text-white/60 hover:text-white"
        >
          Clear all
        </button>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {history.length > 0 ? (
          history.map((query, index) => (
            <div
              key={index}
              className="p-3 hover:bg-white/10 cursor-pointer flex justify-between items-center"
              onClick={() => onSelect(query)}
            >
              <span>{query}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  const newHistory = history.filter((_, i) => i !== index);
                  setHistory(newHistory);
                  localStorage.setItem('searchHistory', JSON.stringify(newHistory));
                }}
                className="text-white/40 hover:text-white"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div className="p-3 text-white/60">No recent searches</div>
        )}
      </div>
    </div>
  );
}