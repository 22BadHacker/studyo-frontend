'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function JumpingCountdown() {
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState('00');

  useEffect(() => {
    const increments = [15, 30, 45, 60, 75, 90, 100];
    const duration = 5000; // 5 seconds total
    const interval = duration / (increments.length + 1);
    let currentIndex = 0;

    // Initial delay
    const timer = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < increments.length) {
          setCount(increments[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, interval);
    }, 500); // Start after 0.5s

    return () => clearTimeout(timer);
  }, []);

  // Format display with leading zero
  useEffect(() => {
    setDisplayCount(count.toString().padStart(2, '0'));
  }, [count]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative overflow-hidden h-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayCount}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 20,
              duration: 0.5
            }}
            className="text-8xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
          >
            {displayCount}
          </motion.div>
        </AnimatePresence>
        
        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-blue-400 to-purple-600"
          />
        </div>
        
        {/* Bouncing dots animation */}
        <div className="absolute top-0 left-0 right-0 flex justify-center space-x-2">
          {[1, 2, 3, 4, 5, 6].map((dot) => (
            <motion.div
              key={dot}
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                delay: dot * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 rounded-full bg-blue-400"
            />
          ))}
        </div>
      </div>
    </div>
  );
}