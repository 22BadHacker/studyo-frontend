'use client';

import { useState, useEffect } from 'react';

export default function TimeClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const formatTimeUnit = (unit) => String(unit).padStart(2, '0');

  return (
    <div className="grid grid-cols-[auto_auto_auto] gap-[10px]">
      <div className="text-[15.5px] tracking-wider w-[57px] font-normal uppercase ">
        {formatTimeUnit(time.getHours())}:
        {formatTimeUnit(time.getMinutes())}:
        {formatTimeUnit(time.getSeconds())}
      </div>

      <span className='text-[14px]  flex items-center gap-2 '><span className=''>|</span> Casablanca</span>
        

    </div>
  );
}
