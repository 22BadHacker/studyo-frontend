'use client'

import { useState, useRef, useEffect } from 'react'
import { BiChevronDown } from 'react-icons/bi'

export default function GenreDropdown({ genres, selectedGenre, setSelectedGenre }) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between cursor-pointer border border-white/85 hover:border-white text-white bg-transparent px-2 py-2 rounded"
      >
        <span>{selectedGenre ? genres.find(g => g.id === selectedGenre)?.name : 'Select Genre'}</span>
        <BiChevronDown size={20} />
      </div>
      {open && (
        <ul className="absolute z-10 mt-1 h-[400px] overflow-y-scroll w-full bg-black/95 border border-white/70 rounded ">
          {genres.map((genre) => (
            <li
              key={genre.id}
              className="px-3 font-NeueMontreal font-semibold py-2 hover:bg-white/10 cursor-pointer text-white"
              onClick={() => {
                setSelectedGenre(genre.id)
                setOpen(false)
              }}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}