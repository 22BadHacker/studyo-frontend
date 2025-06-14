'use client'

import { useState, useRef, useEffect } from 'react'
import { BiChevronDown } from 'react-icons/bi'

const monthList = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

export default function MonthDropdown({ selectedMonth, setSelectedMonth }) {
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
        className="w-full  flex items-center justify-between cursor-pointer border border-white/85 hover:border-white text-white bg-transparent px-2 py-2 rounded"
      >
        <span>{selectedMonth ? monthList.find(m => m.value === selectedMonth)?.label : 'MM'}</span>
        <BiChevronDown size={20} />
      </div>
      {open && (
        <ul className="absolute h-[300px] overflow-y-scroll z-10 mt-1 w-full bg-black scrollbar-thin scrollbar-thumb-white border border-white/70 rounded shadow">
          {monthList.map((month) => (
            <li
              key={month.value}
              className="px-3 py-2 font-semibold font-NeueMontreal hover:bg-white/10 cursor-pointer text-white"
              onClick={() => {
                setSelectedMonth(month.value)
                setOpen(false)
              }}
            >
              {month.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}