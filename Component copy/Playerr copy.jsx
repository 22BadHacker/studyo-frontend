'use client';
import { useAudio } from '@/context/AudioProvider';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from 'react-icons/fa';
import Image from 'next/image';

export default function Player() {
  const {
    currentTrack, isPlaying, togglePlay,
    handleNext, handlePrev,
    volume, setVolume,
    progress
  } = useAudio();

  if (!currentTrack) return null;
  

  return (
    <div className="fixed bottom-6 left-10 w-[500px] bg-black/60 backdrop-blur-[10px] border border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-4 z-50">
      <Image
        src={currentTrack.cover}
        alt="Album Cover"
        width={60}
        height={60}
        className="rounded-lg object-cover"
      />
      <div className="flex-1">
        <h4 className="text-white text-sm font-bold">{currentTrack.title}</h4>
        <p className="text-gray-400 text-xs">{currentTrack.artist}</p>
        <div className="w-full bg-gray-700 h-1 mt-2 rounded">
          <div className="bg-green-500 h-full rounded" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={handlePrev}><FaStepBackward /></button>
        <button onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleNext}><FaStepForward /></button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="w-20"
        />
        <FaVolumeUp className="text-white text-sm" />
      </div>
    </div>
  );
}
