
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md'

const items = [
  { label: 'Mystical Magical', left: '/gallery/img1.png', right: '/gallery/img2.jpg', video: '/vedios/two.mp4' },
  { label: 'Sweet but Psycho', left: '/gallery/img4.jpg', right: '/gallery/im3.jpg', video: '/vedios/three.mp4' },
  { label: 'YOUR TURN', left: '/images/img5.jpg', right: '/images/img6.jpg', video: '/vedios/one.mp4' },
  { label: 'TINDER', left: '/images/img7.jpg', right: '/images/img8.jpg', video: '/vedios/one.mp4' },
  { label: 'CULLIGAN', left: '/images/img9.jpg', right: '/images/img10.jpg', video: '/vedios/one.mp4' },
  { label: 'JLO BEAUTY', left: '/images/img11.jpg', right: '/images/img12.jpg', video: '/vedios/one.mp4' },
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex]

  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (videoRef.current) {
      videoRef.current.volume = vol
    }
  }

  const handleTimeChange = (e) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.volume = volume
      video.addEventListener('timeupdate', () => setCurrentTime(video.currentTime))
      video.addEventListener('loadedmetadata', () => setDuration(video.duration))
    }
  }, [active.video])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

// const toggleMute = () => {
//   if (videoRef.current) {
//     videoRef.current.muted = !isMuted
//     setIsMuted(!isMuted)
//   }
// }


// const handleVideoClick = () => {
//   if (videoRef.current) {
//     videoRef.current.muted = !videoRef.current.muted
//   }
// }


  return (
    <div className="w-full relative grid grid-rows-[1fr_auto] text-[#03050a] py-[60px]    h-screen">
        <div className="flex items-center pt-[65px] gap-2 flex-col">
            {/* <p className='text-[14px]  border-[.5px] rounded-full px-4 py-2 tracking-wide font-NeueMontreal capitalize font-semibold'>Sounds You Shouldn't Miss </p>
            <h1 className='cursor-pointer px-6 w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[7vw] '>New Discoveries </h1> */}
            {/* <h1 className='cursor-pointer px-6 w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6vw] '>Sounds You Shouldn't Miss </h1> */}
        </div>

            <div onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)} className="absolute flex-center h-[475px] saturate-[1.2]  object-cover   cursor-pointer w-[375px]  left-1/2 top-[45%]  -translate-y-1/2  -translate-x-1/2 z-[50]">
                {/* <AnimatePresence mode="wait"> */}
                    <motion.video
                        key={active.video}
                        ref={videoRef}
                        src={active.video}
                        autoPlay
                        muted={isMuted}
                        loop
                        
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100%' }}
                        exit={{ opacity: 0 , transition: { delay: 1, duration: 0.4, ease: 'easeInOut' } }}
                        transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
                        className="absolute top-0 left-0 size-full saturate-[1.2]  object-cover "
                    />

                    {/* <button
                        onClick={toggleMute}
                        className="absolute bottom-3 right-3  text-white text-md size-[40px] flex-center  rounded-full hover:bg-black/60 border-[.5px] border-white/20 backdrop-blur-sm transition"
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                        
                        {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                    </button> */}

                    {showControls && (
                        <>
                        <button onClick={toggleMute} className="absolute   text-white text-md size-[50px] flex-center  rounded-full hover:bg-black/50 cursor-pointer bg-black/30 border-[.5px] border-white/20 backdrop-blur-sm transition">
                                {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                                </button>
                        <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }} className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 px-3 py-2  text-white rounded-b-lg">
                            
                                <div className="flex items-center justify-between">
               
                                        <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="w-full max-w-[120px] appearance-none h-1 bg-white/40 rounded-full accent-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125"
                                        />
                                    </div>
                                    <div className="w-full text-xs flex items-center justify-between">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>

                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <input
                                        type="range"
                                        min="0"
                                        max={duration}
                                        step="0.1"
                                        value={currentTime}
                                        onChange={handleTimeChange}
                                        className="w-full appearance-none h-1 bg-white/50 rounded-full accent-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125"
                                        />
                                    </div>
                            </motion.div>
                        </>
                    )}
                {/* </AnimatePresence> */}


            </div>

        <AnimatePresence mode="wait">
          <motion.img
            key={active.left}
            src={active.left}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="w-[260px] top-[52%] -translate-y-1/2 left-[28%] absolute h-[380px] object-cover grayscale rotate-[-15deg]"
            alt="left"
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.img
            key={active.right}
            src={active.right}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.5 }}
            className="w-[260px] top-[52%] -translate-y-1/2 right-[29%] absolute h-[380px] object-cover grayscale rotate-[15deg]"
            alt="right"
          />
        </AnimatePresence>

     

      <motion.div
        drag="x"
        dragConstraints={{ left: -400, right: 400 }}
        className="w-screen overflow-hidden mx-auto border-t border-b py-4 cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-center gap-6 md:gap-10 ">
          {items.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setActiveIndex(index)}
              className={`text-xl md:text-2xl font-bold uppercase transition duration-300 whitespace-nowrap ${
                index === activeIndex ? 'text-black' : 'text-gray-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}


// min-h-screen bg-[#fefcf9]