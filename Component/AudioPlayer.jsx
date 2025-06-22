'use client';
import { useAudio } from '@/context/AudioProvider';
import { useEffect, useRef, useState } from 'react';
import logo from '@/public/Logo/Studyo_white.svg'
import {  FaVolumeUp, FaExpand, FaCompress, FaMusic} from 'react-icons/fa';
import {IoMdPlay, IoMdPause} from 'react-icons/io';
import {MdSkipPrevious, MdSkipNext} from 'react-icons/md';
import {IoHeartSharp} from 'react-icons/io5';
import {RxDotsVertical} from 'react-icons/rx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiMinimize2 } from "react-icons/fi";
import { CiMinimize1 } from "react-icons/ci";
import { RxLoop } from "react-icons/rx";
import { PiShuffleThin } from "react-icons/pi";
import xx from '@/public/xx.svg'

export default function AudioPlayer() {

  const {
    currentTrack,
    isPlaying,
     isLooping,
    isShuffling,
    nextTrack,
    prevTrack,
    audioRef,
    volume,
    setVolume,
    togglePlay,
    toggleLoop,
    toggleShuffle,
  } = useAudio();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [viewMode, setViewMode] = useState('normal'); // 'normal' | 'fullscreen' | 'minimized'
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const playerRef = useRef(null);



  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [audioRef, currentTrack]);


  useEffect(() => {
  const handleFullscreenChange = () => {
    const isFullscreen = document.fullscreenElement !== null;
    if (!isFullscreen) {
      setViewMode('normal');
    }
  };

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
}, []);


  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleVolume = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
  };

  const enterFullscreen = () => {
  const el = playerRef.current;
if (!el) return; // Prevent error if ref is not yet assigned

if (el.requestFullscreen) {
  el.requestFullscreen().catch(err => {
    console.error('Fullscreen request failed', err);
  });
} else if (el.webkitRequestFullscreen) {
  el.webkitRequestFullscreen();
} else if (el.msRequestFullscreen) {
  el.msRequestFullscreen();
}
setViewMode('fullscreen');
}

const exitFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch((err) => {
      console.error('Exiting fullscreen failed', err);
    });
  }
};


  if (!currentTrack) return null;

 

  return (
    <div ref={playerRef}>
      {viewMode === 'fullscreen' ? (
       <div
         
          className="w-full h-full  flex items-center justify-between text-white z-[50]"
        >
          <img src="/images/img4.jpg " alt="" className="absolute animate-pulse saturate-200 top-0 left-0 object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-black/10 from-[#000]/0 backdrop-blur-[70px] "></div>
       
          <div className="container w-full h-full">
          
            <Link className='absolute top-8 left-12 flex gap-6 items-center' href={'/'}>
              <Image alt='Logo' className='w-[120px] ' src={logo} width={120} height={120}/>
              <div className="w-[.5px] h-[21px] bg-white/90"></div>
              <h1 className="font-medium text-white opacity-95 font-NeueMontreal  text-[17px]">Your Music, Your Way.</h1>
            </Link>

            <div  className="w-full place-items-between z-[50] relative h-screen gap-10 grid grid-rows-[1fr_.2fr]">
              <div className="w-full h-full  flex-center">
                <img src={currentTrack.cover} alt="" className="size-[530px] bg-gradient-to-tl from-[#f9ce34]/50 via-[#ee2a7b]/50 to-[#6228d7]/50 p-[.5px]  object-cover" />

              </div>

              <div onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)} className="h-[100px] px-[14px] items-end grid grid-cols-[.3fr_1fr_.3fr]  w-full">

                    {
                      hovered && (
                        <>
                            {/* Info */}
                            <div className="flex duration-200 ease-in-out  pb-1 h-fit gap-4 items-start">

                                <img src={currentTrack.cover} alt="" className="size-[50px] object-cover" />
                                <div className="flex flex-col items-left gap-0">
                                  <p className="text-[17px] font-NeueMontreal font-medium tracking-wide">{currentTrack.title}</p>
                                  <p className="text-[13px] text-gray-200">{currentTrack.artist}</p>
                                </div>
                            </div>

                              {/* Controller */}
                            <div className="flex duration-200 ease-in-out   justify-center flex-col items-center gap-1">

                              {/* Controls */}
                                  <div className="flex pt-4 pb-2 w-full justify-between items-center">

                                    <div className="flex w-full justify-center items-center space-x-5">
                                        <button onClick={toggleShuffle} className={isShuffling ? 'text-green-500' : 'text-white'}>
                                          <PiShuffleThin  className='mr-1'/>
                                      </button>
                                      <button onClick={prevTrack}>
                                        <MdSkipPrevious className='opacity-80 hover:opacity-100' size={27} />
                                      </button>

                                      <button
                                        onClick={togglePlay}
                                        className=" text-[30px] hover:scale-[1.1] cursor-pointer text-white size-11 flex-center rounded-full"
                                      >
                                        {isPlaying ? <IoMdPause /> : <IoMdPlay className="relative left-[1.5px]" />}
                                      </button>

                                      <button onClick={nextTrack}>
                                        <MdSkipNext className='opacity-80 hover:opacity-100' size={27} />
                                      </button>

                                       <button onClick={toggleLoop} className={isLooping ? 'text-green-500' : 'text-white'}>
                                            <RxLoop className='ml-1 mt-1 opacity-80 text-[14.5px]'/>
                                        </button>
                                    </div>

                                    
                                  </div>

                              {/* Progress */}
                                <div className="flex gap-4 items-center">
                                  <span className='text-sm opacity-85'>{formatTime(progress)}</span>
                                  <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={duration ? (progress / duration) * 100 : 0}
                                    onChange={handleSeek}
                                    className="w-[500px] bg-transparent h-[2px] border-green-500"
                                  />
                                    <span className='text-sm opacity-85'>{formatTime(duration)}</span>
                                  {/* <div className="text-xs text-gray-200 flex justify-between mt-1">
                                  </div> */}
                                </div>
                            </div>

                                {/* Volume */}
                            <div className="flex duration-200 ease-in-out  relative pb-1 gap-7 justify-end w-full items-center">
                                    <div className="flex w-fit relative group gap-2 items-center">
                                      <FaVolumeUp size={16} />
                                          <input
                                            type="range"
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            value={volume}
                                            onChange={handleVolume}
                                            className="w-[110px] -left-[48px] -top-[70px] -rotate-90 opacity-0 absolute group-hover:opacity-100 h-[2px]"
                                          />
                                    </div>
                                <button onClick={exitFullscreen}>
                                    <CiMinimize1 className="text-[20px] text-white hover:text-green-500" />
                                </button>
                                <IoHeartSharp className="hover:text-[#fb2c36] cursor-pointer hover:scale-[1.4] opacity-90 text-[22px]" />
                            </div>
                        </>
                      )
                    }

                    

              </div>
            </div>
          </div>





          
        </div>
          )
           : viewMode === 'minimized' ? (
            <motion.div
                  drag
                  ref={containerRef}
                  whileDrag={{cursor: 'grabbing'}}
                  // dragConstraints={containerRef}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className="fixed z-[9999] mix-blend-difference bottom-7 scale-95 left-10 w-[300px] h-[60px] bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-between text-white px-3 shadow-lg "
                >
                  <div className="flex items-center gap-2">
                    <img src={currentTrack.cover} alt="" className="w-10  h-10 object-cover bg-gradient-to-tl from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full" />
                    <div className='mix-blend-difference text-black'>
                      <p className="text-sm text-white font-semibold">{currentTrack.title}</p>
                      <p className="text-xs text-white ">{currentTrack.artist}</p>
                    </div>
                  </div>
                  <div className="flex mix-blend-difference items-center gap-2">
                    <button onClick={togglePlay}>
                      {isPlaying ? <IoMdPause /> : <IoMdPlay />}
                    </button>
                    {hovered && (
                      <button onClick={() => setViewMode('normal')} className="text-lg">⤢</button>
                    )}
                  </div>
                </motion.div>
          ) 
          
          : (
           
              <motion.div
                drag
                ref={containerRef}
                whileDrag={{cursor: 'grabbing', scale: .95,}}
                // dragConstraints={containerRef}
                
                className={`fixed z-[9999] mix-blend-difference overflow-hidden p-2 rounded-xl shadow-xl text-white backdrop-blur-[20px] border-white/10 border-[1px] -bottom-2 left-4 w-[370px] bg-gradient-to-tr  from-[#d8dfe8]/5 via-[#d8dfe8]/10 to-[#d8dfe8]/0 scale-[.85]`}
              >
                
                {/* Top Bar: Fullscreen/Minimize */}
                <div className="absolute text-sm top-0 bg-black  px-2 py-1 right-0 flex space-x-2 z-10">
                  {viewMode === 'normal' ? (
                    <button onClick={enterFullscreen}>
                      <FaExpand className="hover:text-green-500" />
                    </button>
                  ) : (
                    <button onClick={() => setViewMode('normal')}>
                      <FaCompress className="hover:text-red-500" />
                    </button>
                  )}
                  <button onClick={() => setViewMode('minimized')}>
                    <span className="text-[11.8px] px-2 py-[2px] bg-white/10 rounded hover:bg-white/20">Minimize</span>
                  </button>
                </div>

                <div className="flex relative flex-col items-left gap-2 ">
                  <img
                    src={currentTrack.cover || '/default-cover.jpg'}
                    alt={currentTrack.title}
                    className={`w-full rounded-[6px_6px_0_0] object-cover ${
                      viewMode === 'fullscreen' ? 'h-[60vh]' : 'h-[300px]'
                    }`}
                  />

                  {/* Volume */}
                  <div className="flex absolute bottom-[28px] -right-4 items-center space-x-2 mt-3">
                    <FaVolumeUp size={16} />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleVolume}
                      className="w-[70%] h-[2px]"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex justify-between pt-1 items-start">
                    <div className="flex-grow">
                      <p className="font-bold w-[200px] truncate font-NeueMontreal text-[21px]">{currentTrack.title}</p>
                      <p className="text-[15px] relative -top-1 font-medium text-gray-200">{currentTrack.artist}</p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={duration ? (progress / duration) * 100 : 0}
                    onChange={handleSeek}
                    className="w-full bg-transparent h-[2px] border-green-500"
                  />
                  <div className="text-xs text-gray-200 flex justify-between mt-1">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex pt-4 pb-2 w-full justify-between items-center">
                  <IoHeartSharp className="hover:text-[#fb2c36] cursor-pointer hover:scale-[1.4] opacity-90 text-[22px]" />

                  <div className="flex justify-center items-center space-x-4">
                    <button onClick={prevTrack}>
                      <MdSkipPrevious size={30} />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="bg-white text-[24px] cursor-pointer text-black size-11 flex-center rounded-full"
                    >
                      {isPlaying ? <IoMdPause /> : <IoMdPlay className="relative left-[1.5px]" />}
                    </button>

                    <button onClick={nextTrack}>
                      <MdSkipNext size={30} />
                    </button>
                  </div>

                  <RxDotsVertical className="text-[18px] text-green-500" />
                </div>
              </motion.div>
          
          )}

    </div>
  );
}
