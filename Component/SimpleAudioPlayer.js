'use client';
import { useEffect, useRef, useState } from 'react';
import ReactHowler from 'react-howler';
import { FaPlay, FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IoMdPlay, IoMdPause } from "react-icons/io";
// import {  } from "react-icons/md";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleSeekChange = (e) => {
    const value = parseFloat(e.target.value);
    setSeek(value);
    playerRef.current.seek(value);
  };

  const onLoad = () => {
    const dur = playerRef.current.duration();
    setDuration(dur);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSeek(playerRef.current.seek());
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  return (
    <motion.div drag className="fixed bottom-4 backdrop-blur-[20px] left-10 transform  bg-[#d8dfe8]/20 border-white/20  border-[1.5px] text-white rounded-md  w-[500px] p-4 flex flex-col gap-3 z-50">
      <ReactHowler
        src="/audio.mp3"
        playing={isPlaying}
        volume={0.7}
        ref={playerRef}
        onLoad={onLoad}
        onEnd={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold">Test Track</p>
          <p className="text-sm text-gray-400">Artist Name</p>
        </div>
        
        <button
          onClick={togglePlay}
          className="bg-green-500 cursor-pointer p-2 rounded-full text-black hover:bg-green-600"
        >
          {isPlaying ? <IoMdPause /> : <IoMdPlay />}
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span className='text-white'>{formatTime(seek)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          step="0.1"
          value={seek}
          onChange={handleSeekChange}
          className="w-full rounded-none"
        />
        <span className='text-white'>{formatTime(duration)}</span>
      </div>
    </motion.div>
  );
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
