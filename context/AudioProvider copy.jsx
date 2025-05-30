'use client';
import { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime / audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, []);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(prev => !prev);
  const handleNext = () => {
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const nextTrack = queue[currentIndex + 1];
    if (nextTrack) playTrack(nextTrack);
  };

  const handlePrev = () => {
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const prevTrack = queue[currentIndex - 1];
    if (prevTrack) playTrack(prevTrack);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.url;
    if (isPlaying) audio.play();
    else audio.pause();
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <AudioContext.Provider value={{
      queue, setQueue,
      currentTrack, playTrack,
      isPlaying, togglePlay,
      volume, setVolume,
      progress,
      handleNext, handlePrev
    }}>
      {/* <audio ref={audioRef} /> */}
        <audio ref={audioRef}>
        {currentTrack?.src && <source src={currentTrack.src} type="audio/mpeg" />}
      </audio>

      {children}
    </AudioContext.Provider>
  );
};
