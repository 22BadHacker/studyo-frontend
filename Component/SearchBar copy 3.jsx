'use client'

import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { SearchHistory } from './SearchHistory'; // Adjust the import path

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 100);
  const [showHistory, setShowHistory] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  // Add to search history - now more robust
  const addToHistory = (query) => {
    if (!query.trim()) return;
    
    try {
      const savedHistory = localStorage.getItem('searchHistory');
      let history = savedHistory ? JSON.parse(savedHistory) : [];
      
      // Remove if already exists (case insensitive) and add to beginning
      history = history.filter(item => 
        item.toLowerCase() !== query.toLowerCase()
      );
      history.unshift(query);
      
      // Keep only the last 10 searches
      if (history.length > 10) {
        history = history.slice(0, 10);
      }
      
      localStorage.setItem('searchHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  // Save search when form is submitted
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      addToHistory(search.trim());
      router.push(`/Search/${encodeURIComponent(search.trim())}`);
    }
  };

  useEffect(() => {
    if (debouncedSearch.trim()) {
      addToHistory(debouncedSearch.trim());
      router.push(`/Search/${encodeURIComponent(debouncedSearch.trim())}`);
    }
  }, [debouncedSearch]);

  // Close history when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSearch} className="relative" ref={searchRef}>
      <div 
        className="grid hover:text-white scale-[.99] mt-1 duration-200 ease-in-out grid-cols-[auto_1fr_auto] search w-[430px] bg-gradient-to-tr from-[#d8dfe8]/0 via-[#d8dfe8]/10 to-[#d8dfe8]/0 hover:border-[1.5px] backdrop-blur-[20px] gap-[13px] items-center h-[53px] px-[9px] hover:border-white/70 border-white/10 border-[1.5px] rounded-full"
        onClick={() => setShowHistory(true)}
      >
        <FiSearch className='text-[#f4f4f4] text-[27px]' />
        <input
          className="outline-none font-medium text-[14px] capitalize placeholder:text-[14px] w-full placeholder:text-[#fff]/85 bg-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowHistory(true)}
          type="text"
          placeholder="What's playing in your Stüdyo today?"
        />
        {search && (
          <IoMdClose 
            onClick={(e) => {
              e.stopPropagation();
              setSearch('');
            }} 
            className='text-[#f4f4f4] hover:text-white transition-all text-[28px] cursor-pointer' 
          />
        )}
      </div>
      
      <SearchHistory 
        isVisible={showHistory && !search} 
        onClose={() => setShowHistory(false)}
        onSelect={(query) => {
          setSearch(query);
          addToHistory(query); // Ensure selected query is saved
          setShowHistory(false);
          router.push(`/Search/${encodeURIComponent(query)}`);
        }}
      />
    </form>
  );
}