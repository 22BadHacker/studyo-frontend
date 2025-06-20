'use client'

import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 200); // waits 500ms
  const router = useRouter();

  useEffect(() => {
    if (debouncedSearch.trim().length >= 1) {
      router.push(`/Search/${encodeURIComponent(debouncedSearch.trim())}`);
    }
    // else{
    //   router.push(`/`);
    // }
  }, [debouncedSearch]);

  return (
    <div className="grid hover:text-white scale-[.99] mt-1 duration-200 ease-in-out grid-cols-[auto_1fr_auto] search w-[430px] bg-gradient-to-l from-[#d8dfe8]/0 via-[#d8dfe8]/10 to-[#d8dfe8]/0 hover:border-[1.5px] backdrop-blur-[20px] gap-[13px] items-center h-[54px] px-[9px] hover:border-white/50 border-white/10 border-[1.5px] rounded-full">
      <FiSearch className='text-[#f4f4f4] text-[27px]' />
      <input
        className="outline-none font-medium text-[18px] text-white/95 font-NeueMontreal tracking-wide placeholder:text-[15px] w-full placeholder:text-[#fff]/70"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="What’s playing in your Stüdyo today?"
      />
      {search && (
        <IoMdClose onClick={() => setSearch('')} className='text-[#f4f4f4] hover:text-white transition-all text-[28px] cursor-pointer' />
      )}
    </div>
  );
}
