'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md'
import { RxTriangleLeft } from "react-icons/rx";

const items = [
  { label: 'Mystical Magical', left: '/gallery/img1.png', right: '/gallery/img2.jpg', video: '/vedios/two.mp4' },
  { label: 'Sweet but Psycho', left: '/gallery/img4.jpg', right: '/gallery/im3.jpg', video: '/vedios/three.mp4' },
  { label: 'Ordinary', left: '/gallery/img5.jpg', right: '/gallery/img7.png', video: '/vedios/four.mp4' },
  { label: 'Dandadan', left: '/gallery/img8.jpg', right: '/gallery/img9.jpg', video: '/vedios/Five.mp4' },
  { label: "Who's Laughing Now", left: '/gallery/img4.jpg', right: '/gallery/im3.jpg', video: '/vedios/six.mp4' },
  { label: "The Winner Is", left: '/gallery/img10.jpg', right: '/gallery/img11.jpg', video: '/vedios/seven.mp4' },
  { label: "The Door", left: '/gallery/img12.webp', right: '/gallery/img13.jpeg', video: '/vedios/door.mp4' },
]

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = items[activeIndex]
  const scrollRef = useRef(null)
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)

  const repeatedItems = [...items, ...items, ...items, ...items, ...items, ...items];
  const originalStartIndex = items.length;

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
      if (vol > 0) {
        videoRef.current.muted = false
        setIsMuted(false)
      } else {
        videoRef.current.muted = true
        setIsMuted(true)
      }
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

  // Calculate progress percentage for the red progress bar
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  //  useEffect(() => {
  //   if (!scrollRef.current) return
  //   const buttons = scrollRef.current.querySelectorAll('button')
  //   const activeButton = buttons[activeIndex]
  //   if (activeButton) {
  //     activeButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  //   }
  // }, [activeIndex])

  useEffect(() => {
  const target = scrollRef.current?.children[originalStartIndex]
  if (target) {
    target.scrollIntoView({ inline: 'center', behavior: 'instant' })
  }
}, [])

  const handleLabelClick = (labelIndex) => {
  const centerIndex = originalStartIndex + labelIndex;
  const targetButton = scrollRef.current?.children[centerIndex];
  if (targetButton) {
    targetButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActiveIndex(labelIndex); // real index in original items
  }
};

  return (
    <div className="w-full relative grid grid-rows-[1fr_auto] text-[#03050a] py-[25px] h-screen">
      <div className="flex items-center pt-[115px] gap-2 flex-col">
         {/* <p className='text-[14px]   rounded-full px-4 py-2 tracking-wide font-NeueMontreal capitalize font-semibold'>Sounds You Shouldn't Miss </p> */}
         {/* <p className='text-[14px]  border-[.5px] rounded-full px-4 py-2 tracking-wide font-NeueMontreal capitalize font-semibold'>Sounds You Shouldn't Miss </p> */}
            {/* <h1 className='cursor-pointer relative  px-6 w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[7vw] '>New Discoveries <h1 className='cursor-pointer absolute textx top-0 left-0 z-[100]  px-6 w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[7vw] '>New Discoveries </h1></h1> */}
            {/* <h1 className='cursor-pointer px-6 w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6vw] '>Sounds You Shouldn't Miss </h1> */}
      </div>

    
    <div className="group">
        <div 
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)} 
          className="absolute flex-center h-[465px] saturate-[1.2] object-cover cursor-pointer w-[375px] left-1/2 top-[45%] -translate-y-1/2 -translate-x-1/2 z-[50]"
        >
          <motion.video
            key={active.video}
            ref={videoRef}
            src={active.video}
            autoPlay
            muted={isMuted}
            loop
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, transition: { delay: 1, duration: 0.4, ease: 'easeInOut' } }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
            className="absolute top-0 left-0 size-full saturate-[1.3] object-cover"
          />

          {showControls && (
              <>
              <button onClick={toggleMute} className="absolute z-[20]  text-white text-md size-[50px] flex-center  rounded-full hover:bg-black/50 cursor-pointer bg-black/30 border-[.5px] border-white/20 backdrop-blur-sm transition">
                  {isMuted ? <MdVolumeOff /> : <MdVolumeUp />}
                  </button>
              <div className="absolute h-full flex flex-col justify-end bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 via-transparent to-black/30  ">
                  {/* Volume Controls */}
                  <div className="flex w-[40%] items-center gap-3 mb-3">
                  
                      <div className="flex w-[50%] absolute top-1 left-1 gap-2 items-center">
                          {volume === 0 ? <MdVolumeOff className='text-white' /> : <MdVolumeUp className='text-white' />}
                          <div className=" relative z-[10] w-[50%] flex-1 h-[5px] bg-white/60  overflow-hidden">
                              <div 
                              className="absolute  top-0 left-0 h-full bg-green-500 rounded-full"
                              style={{ width: `${volume * 100}%` }}
                              ></div>
                              <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={volume}
                              onChange={handleVolumeChange}
                              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                              />
                          </div>
                      </div>
                  </div>

                  {/* Time Controls */}
                  <div className="flex px-[6px] items-center justify-between text-xs text-white mb-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  
                  <div className="relative h-1.5 w-full bg-white/20  overflow-hidden">
                  {/* Red progress bar that fills as video plays */}
                    <div 
                        className="absolute top-0 left-0 h-full bg-[#d8262c] "
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        onChange={handleTimeChange}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
              </div>
              </>
          )}
        </div>


        <AnimatePresence mode="wait">
          <motion.img
            key={active.left}
            src={active.left}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-[265px] top-[47.2%] -translate-y-1/2 left-[28.3%] absolute h-[352px] object-cover grayscale-100 duration-200 ease-in-out saturate-[1.2] rotate-[-15deg]"
            alt="left"
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.img
            key={active.right}
            src={active.right}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-[265px] duration-200 ease-in-out saturate-[1.2]  top-[47.2%] -translate-y-1/2 right-[28.3%] absolute h-[352px] object-cover grayscale rotate-[15deg]"
            alt="right"
          />
        </AnimatePresence>

    </div>


      <div className="flex flex-col gap-[10px] w-full items-center justify-center">
        <div className="w-screen  flex-center relative   h-[103px]">
          <div className="w-full flex gap-[5.55px]    absolute top-0 left-0 ">
              {[...Array(50)].map((_, i) => (
                <>
                    {[...Array(4)].map((_, j) => (
                      <>
                        <span key={j} className='border-l-[#b0afab]/80  border-l-[1.5px] h-[7.5px]'></span> 
                        
                      </>
                    ))}
                    <span className='border-l-main2/55 someLine border-l-[1.5px] h-[12px]'></span>
                </>
              ))}
          </div>
          <div className="w-full flex gap-[5.55px] items-end   absolute bottom-0 left-0 ">
              {[...Array(50)].map((_, i) => (
                <>
                    {[...Array(4)].map((_, j) => (
                      <>
                        <span key={j} className='border-l-[#b0afab]/80  border-l-[1.5px] h-[7.5px]'></span> 
                        
                      </>
                    ))}
                    <span className='border-l-main2/55 someLine border-l-[1.5px] h-[12px]'></span>
                </>
              ))}
          </div>

              {/* <motion.div
                drag="x"
                dragConstraints={{ left: -400, right: 400 }}
                className="w-screen  z-[30] overflow-hidden mx-auto py-0 cursor-grab active:cursor-grabbing"
              >
                <div ref={scrollRef}  className="flex justify-center gap-10 md:gap-[60px] ">
                  {items.map((item, index) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveIndex(index)}
                      className={`text-xl tracking-wide font-Oswald uppercase md:text-4xl font-bold  transition duration-300 whitespace-nowrap ${
                        index === activeIndex ? 'text-black' : 'text-[#b0afab]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div> */}

             
             <div className="w-screen  z-[30] mx-auto py-0">
                  <div
                    ref={scrollRef}
                    className="flex cursor-pointer gap-10 hide-scrollbar md:gap-[70px] px-10 overflow-x-auto scroll-smooth no-scrollbar scroll-snap-x scroll-snap-mandatory"
                  >
                    {repeatedItems.map((item, index) => {
                      const labelIndex = index % items.length; // match original
                      return (
                        <button
                          key={`${item.label}-${index}`}
                          // onClick={() => handleLabelClick(labelIndex)}
                          onClick={(e) => {
                            const el = e.currentTarget;
                            el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                            setActiveIndex(labelIndex); // Keep state synced to original item
                          }}
                          className={`text-xl cursor-pointer tracking-wide font-Oswald uppercase md:text-4xl font-bold transition duration-300 whitespace-nowrap scroll-snap-align-center ${
                            labelIndex === activeIndex ? 'text-black' : 'text-[#b0afab]'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

        </div>

        <div className="w-full pt-3 grid grid-cols-[.5fr_1fr_.5fr] justify-between items-center px-9">
            <div className="flex gap-20 items-center">
                  <p className='text-[11px] font-normal font-Oswald'>@2025</p>
                  <p className='text-[11px] pl-8 uppercase font-normal font-Oswald'>Last update: JUL 2025</p>
            </div>
            <div className="w-full flex items-center justify-center gap-6">
                  <div className="flex items-center">
                      <RxTriangleLeft/>
                      <RxTriangleLeft/>
                  </div>
            </div>

            <div className="w-full flex justify-end">
              <p className='text-[11px] pl-7 uppercase font-normal font-Oswald'>site by mounir lagzouli</p>

            </div>

        </div>

      </div>


    </div>
  )
}