import { useState, useRef, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";

export default function GenderDropdown({ selected, onChange, gender }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const genders = ["male", "female", "Prefer not to say"];

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
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inpuut capitalize flex justify-between items-center"
      >
        <span>{selected || "Select Gender"}</span>
        <BiChevronDown className="text-xl " />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-[#121212] border border-white/50 rounded">
          {genders.map((gender) => (
            <li
              key={gender}
              onClick={() => {
                onChange(gender);
                setOpen(false);
              }}
              className={`px-4 capitalize py-2 cursor-pointer hover:text-black font-medium hover:bg-blue-100 ${
                selected === gender ? "bg-main text-black font-semibold" : ""
              }`}
            >
            <input type="text" name={gender} className="hidden"/>
              {gender}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
