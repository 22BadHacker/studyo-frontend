'use client';
import { useEffect, useState } from 'react';

export default function Countdown() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000; // 5 seconds
    const endValue = 100;
    
    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * endValue);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, []);

  return (
    <div className=" ">
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>
        
        {/* Main counter */}
        <div className="relative z-10 flex items-center justify-center w-64 h-64 rounded-full bg-gradient-to-br from-blue-900 via-black to-blue-900 border-2 border-blue-400/30 shadow-lg">
          <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
            {count}
          </span>
          
          {/* Percentage symbol with animation */}
          <span className="absolute top-1/2 right-1/4 transform -translate-y-1/2 text-4xl font-bold text-blue-300 opacity-80 ">
            %
          </span>
        </div>
        
        {/* Ring progress indicator (optional) */}
        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(96, 165, 250, 0.3)"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(96, 165, 250, 1)"
            strokeWidth="4"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * count) / 100}
            strokeLinecap="round"
            className="transition-all duration-100"
          />
        </svg>
      </div>
    </div>
  );
}