'use client'
import { useState, useEffect, useRef } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { IoIosArrowDown } from "react-icons/io"

export default function AlbumDropdown({ albums, selectedAlbum, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between cursor-pointer rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px]"
      >
        <span>{selectedAlbum ? selectedAlbum.title : ''}</span>
        {/* <span>{selectedAlbum ? albums.find(g => g.id === selectedAlbum)?.name : ''}</span> */}
        
        <BiChevronDown size={20} />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 h-auto max-h-[400px] overflow-y-scroll w-full bg-[#121212] border border-white/70 rounded ">
          {albums.length === 0 ? (
            <li className="px-4 py-2 text-white/50">No albums found</li>
          ) : (
            albums.map(album => (
              <li
                key={album.id}
                onClick={() => {
                  onSelect(album)
                  setIsOpen(false)
                }}
                className="px-3 font-NeueMontreal font-semibold py-2 hover:bg-white/10 cursor-pointer text-white"
              >
                {album.title}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
