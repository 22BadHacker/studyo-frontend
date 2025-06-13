'use client'
import { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

const GenresDropdown = ({selected, onChange, genre, genres}) => {
    const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);



    useEffect(() => {
    const close = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
    }, []);


  return (
    <>
         <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inpuut capitalize flex justify-between items-center"
      >
        <span>{selected || "Select Genre"}</span>
        <BiChevronDown className="text-xl " />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-[#121212] border border-white/50 rounded">
          {genres.map((genre) => (
            <li
              key={genre}
              onClick={() => {
                onChange(genre);
                setOpen(false);
              }}
              className={`px-4 capitalize py-2 cursor-pointer hover:text-black font-medium hover:bg-blue-100 ${
                selected === genre ? "bg-main text-black font-semibold" : ""
              }`}
            >
            <input type="text" name={genre} className="hidden"/>
              {genre}
            </li>
          ))}
        </ul>
      )}
    </div> 
    </>
  )
}

export default GenresDropdown
