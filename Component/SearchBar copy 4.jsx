'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const router = useRouter();

  // Load history on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(stored);
  }, []);

  const handleSearch = (query) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    const existing = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const updated = [cleanQuery, ...existing.filter(item => item !== cleanQuery)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
    setHistory(updated);

    router.push(`/Search/${encodeURIComponent(cleanQuery)}`);
    setShowHistory(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(search);
    }
  };

  const handleHistoryClick = (query) => {
    setSearch(query);
    handleSearch(query);
  };

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  };

  return (
    <div className="relative">
      <div className="grid hover:text-white scale-[.99] mt-1 duration-200 ease-in-out grid-cols-[auto_1fr_auto] search w-[430px] bg-gradient-to-tr from-[#d8dfe8]/0 via-[#d8dfe8]/10 to-[#d8dfe8]/0 hover:border-[1.5px] backdrop-blur-[20px] gap-[13px] items-center h-[53px] px-[9px] hover:border-white/70 border-white/10 border-[1.5px] rounded-full">
        <FiSearch className='text-[#f4f4f4] text-[27px]' />
        <input
          className="outline-none font-medium text-[14px] capitalize placeholder:text-[14px] w-full placeholder:text-[#fff]/85"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 150)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="What’s playing in your Stüdyo today?"
        />
        {search && (
          <IoMdClose onClick={() => setSearch('')} className='text-[#f4f4f4] hover:text-white transition-all text-[28px] cursor-pointer' />
        )}
      </div>

      {showHistory && history.length > 0 && (
        <div className="absolute top-[58px] left-0 w-full z-50 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-lg">
          <div className="flex justify-between items-center px-4 py-2 border-b border-white/10">
            <span className="text-sm text-white/70">Recent Searches</span>
            <button
              onClick={clearHistory}
              className="text-[12px] text-red-400 hover:text-red-500 font-medium"
            >
              Clear
            </button>
          </div>
          <ul className="max-h-[200px] overflow-y-auto text-white/90">
            {history.map((item, index) => (
              <li
                key={index}
                onClick={() => handleHistoryClick(item)}
                className="px-4 py-2 hover:bg-white/5 cursor-pointer text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
