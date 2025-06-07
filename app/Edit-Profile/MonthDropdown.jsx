import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // Optional icon

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function MonthDropdown({ selectedMonth, onSelect }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
 const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = months.find((m) => m.value === selectedMonth)?.label || "Select Month";

  return (
    <div className="relative w-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center  border-white/40 border-[1px] rounded px-2 h-full  hover:border-white focus:outline-none"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-[#121212] border border-white/50 rounded max-h-60 overflow-y-scroll">
          {months.map((month) => (
            <li
              key={month.value}
              onClick={() => {
                onSelect(month.value);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:text-black hover:bg-gray-100 ${
                selectedMonth === month.value ? "bg-gray-100 text-black font-medium" : ""
              }`}
            >
              {month.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
