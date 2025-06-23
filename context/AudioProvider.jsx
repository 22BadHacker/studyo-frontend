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
  const audio = audioRef.current;
  if (currentTrack && audio) {
    if (audio.src !== currentTrack.src) {
      audio.src = currentTrack.src;
    }
    if (isPlaying) {
      audio.play();
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
      <audio ref={audioRef} src={currentTrack?.src || ''} />
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
