'use client'
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import { IoMdClose, IoMdPause } from "react-icons/io";
import { IoPauseSharp } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickedTime = (e.nativeEvent.offsetX / rect.width) * duration;
    audioRef.current.currentTime = clickedTime;
  };

  return (
    <div className="max-w-3xl text-black fixed bottom-5 left- w-full bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium tracking-wider text-black">SADGROVE — KITCHEN PT.1</p>
        <button>
          <IoMdClose className="text-xl text-black" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Image
          src="/cover.jpg" // replace with your dynamic source
          alt="cover"
          width={56}
          height={56}
          className="w-14 h-14 object-cover rounded-sm"
        />
        <p className="w-12 text-sm font-mono">{formatTime(currentTime)}</p>
        <button onClick={togglePlay}>
          {isPlaying ? <IoMdPause size={22}/> : <IoMdPlay size={22} />}
        </button>
        <div
          className="h-[2px] overflow-hidden hover:h-[4px] duration-200 ease-in-out flex-1 bg-[#d9d9d9] cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="h-2 bg-black "
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          ></div>
        </div>
        <p className="w-12 text-sm text-right font-mono">{formatTime(duration)}</p>
        <FaVolumeUp />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 rounded-none appearance-none bg-[#d9d9d9] h-1"

        />
      </div>

      <audio ref={audioRef} src="/audio.mp3" preload="metadata" />
    </div>
  );
}

