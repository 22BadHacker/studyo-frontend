'use client';
import { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [volume, setVolume] = useState(0.8);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
    }
    setIsPlaying(prev => !prev);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const nextTrack = () => {
    if (isShuffling) {
      const otherTracks = queue.filter(t => t.id !== currentTrack?.id);
      const randomTrack = otherTracks[Math.floor(Math.random() * otherTracks.length)];
      if (randomTrack) {
        playTrack(randomTrack);
      }
    } else {
      const index = queue.findIndex(t => t.id === currentTrack?.id);
      if (index >= 0 && index < queue.length - 1) {
        setCurrentTrack(queue[index + 1]);
        setIsPlaying(true);
      }
    }
  };

  const prevTrack = () => {
    const index = queue.findIndex(t => t.id === currentTrack?.id);
    if (index > 0) {
      setCurrentTrack(queue[index - 1]);
      setIsPlaying(true);
    }
  };

  const toggleLoop = () => {
    setIsLooping(prev => !prev);
  };

  const toggleShuffle = () => {
    setIsShuffling(prev => !prev);
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


  // Handle track end
  useEffect(() => {
    const handleEnded = () => {
      if (isLooping) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        nextTrack();
      }
    };

    const audio = audioRef.current;
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, isLooping, isShuffling, queue]);




  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      volume,
      currentTime, // Expose currentTime
      setCurrentTime,
      queue,
      setQueue,
      setVolume,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack,
      toggleLoop,
      toggleShuffle,
      isLooping,
      isShuffling,
      audioRef,
    }}>
      {children}
      <audio ref={audioRef}
         
        loop={isLooping}
        onEnded={() => isLooping ? audioRef.current.play() : nextTrack()}
      >
        {currentTrack?.src && <source src={currentTrack.src} type="audio/mpeg" />}
      </audio>
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
