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
        className="w-full flex items-center justify-between cursor-pointer rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px]"
      >
        <span>{selectedGenre ? genres.find(g => g.id === selectedGenre)?.name : ''}</span>
        <BiChevronDown size={20} />
      </div>
      {open && (
        <ul className="absolute z-10 mt-1 h-[400px] overflow-y-scroll w-full bg-white text-main2 backdrop-blur-2xl border border-white/70 rounded ">
          {genres.map((genre) => (
            <li
              key={genre.id}
              className="px-3 py-2 hover:text-main2 hover:bg-gray-200 cursor-pointer"
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