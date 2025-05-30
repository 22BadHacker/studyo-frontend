'use client';
import { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(prev => !prev);
  };

  const nextTrack = () => {
    const index = queue.findIndex(t => t.id === currentTrack?.id);
    if (index >= 0 && index < queue.length - 1) {
      setCurrentTrack(queue[index + 1]);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    const index = queue.findIndex(t => t.id === currentTrack?.id);
    if (index > 0) {
      setCurrentTrack(queue[index - 1]);
      setIsPlaying(true);
    }
  };

  // Auto play when track changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  // Volume update
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      volume,
      queue,
      setQueue,
      setVolume,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      audioRef,
    }}>
      {children}
      <audio ref={audioRef}>
        {currentTrack?.src && <source src={currentTrack.src} type="audio/mpeg" />}
      </audio>
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
