"use client";
import React, { useRef, useState } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-4 z-50">
      {/* Audio */}
      <audio ref={audioRef} src="/music/Cinematic2.mp3" loop />

      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
      >
        {playing ? <FaPause /> : <FaPlay />}
      </button>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <FaVolumeUp className="text-white" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="w-24 accent-blue-500"
        />
      </div>

      {/* Animated Waves */}
      <div className="flex gap-[2px] h-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-blue-400 animate-wave"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            height: 0.3rem;
          }
          50% {
            height: 1.5rem;
          }
        }
        .animate-wave {
          animation: wave 1s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
