'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { IoMdPause, IoMdPlay } from 'react-icons/io'
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5"
import { tracks } from '@/Data/data'
import { useAudio } from '@/context/AudioProvider'

const Artists = () => {
  const [artists, setArtists] = useState([])
  const [hover, setHover] = useState(false)
  const scrollRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const { playTrack, isPlaying, togglePlay, setQueue, currentTrack} = useAudio();

  useEffect(() => {
    fetch('http://localhost:8000/api/artists', { withCredentials: true })
      .then(res => res.json())
      .then(data => {
        setArtists(data)
      })
      .catch(err => {
        console.error('Failed to fetch artists:', err)
      })
  }, [])

  const scroll = (direction) => {
    const { current } = scrollRef
    if (!current) return

    const scrollAmount = 1350
    current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return

    setShowLeft(el.scrollLeft > 0)
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScroll()
    el.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)

    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [artists])

  const handlePlayAll = async (artist) => {
    if (!artist.tracks || artist.tracks.length === 0) return;
    
    const formattedQueue = artist.tracks.map(track => ({
      id: track.id,
      title: track.title,
      artist: artist.username,
      cover: `http://localhost:8000/storage/${track.cover_image}`,
      src: `http://localhost:8000/storage/${track.file_path}`
    }))

    setQueue(formattedQueue)
     await new Promise(resolve => setTimeout(resolve, 50));
    
    // Check if the first track is already playing
    if (currentTrack?.id === formattedQueue[0]?.id && isPlaying) {
      togglePlay(); // pause if already playing
    } else {
      playTrack(formattedQueue[0]); // play the first track
    }
  }

  return (
    <div className="pt-0">
      <div className="flex pb-3 relative flex-col gap-2">
        {/* <h1 className='text-2xl flex gap-[7px] pb-3 items-start hover:underline ease-in-out duration-200 w-fit cursor-pointer text-white/95 font-NeueMontreal font-semibold'>
          <span className='bg-[#c42b1c] relative top-1.5 w-[2px] h-[20px] '></span>Fan Favorites
        </h1> */}
        <h1 className='text-2xl relative group  flex gap-[7px] items-start  ease-in-out duration-200 w-fit cursor-pointer   hover:text-[#c42b1c] font-NeueMontreal font-semibold'><span className='bg-[#c42b1c] duration-200 ease-in-out group-hover:opacity-0 absolute top-1/2  opacity-90 w-full h-[2.5px]  '></span>Fan Favorites</h1>

        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="w-full h-auto relative">
          {hover && showLeft && (
            <div onClick={() => scroll('left')} className="absolute flex-center text-[20px] hover:scale-110 cursor-pointer duration-200 ease-in-out z-10 -left-[6px] top-[40%] -translate-y-1/2 rounded-full size-[43px] border-white/10 border-[.5px] bg-main2/50 backdrop-blur-[13px]">
              <IoChevronBackSharp className='relative -left-[2px]' />
            </div>
          )}

          {hover && showRight && (
            <div onClick={() => scroll('right')} className="absolute flex-center text-[20px] hover:scale-110 cursor-pointer duration-200 ease-in-out -right-0 z-10 top-[40%] -translate-y-1/2 rounded-full size-11 border-white/10 border-[.5px]  bg-main2/50 backdrop-blur-[13px]">
              <IoChevronForwardSharp className='relative right-[0px]' />
            </div>
          )}

          <div ref={scrollRef} className="relative duration-200 ease-in-out flex overflow-x-auto hide-scrollbar scroll-smooth w-full gap-[6px]">
            {artists.slice(24, 54).map((artist, i) => (
              <div key={i} className='h-fit'>
                <div
                  className="p-3 coon group relative flex h-fit flex-col gap-1 hover:bg-main2/80 duration-200 ease-in-out cursor-pointer rounded-md text-left"
                >
                  <div className="relative size-[240px]">
                    {artist.profile_image ? (
                      <img
                        src={`http://localhost:8000${artist.profile_image}`}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/Hand.jpeg'
                        }}
                        alt="Profile"
                        className={`size-full  saturate-[1.3] mx-auto rounded-full object-cover`}
                      />
                    ) : (
                      <div className="size-full bg-main text-main2 p-[.2px] mx-auto rounded-full mb-4 flex-center font-NeueMontreal text-[35px] font-bold">
                        {artist.username?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span 
                      onClick={() => handlePlayAll(artist)} 
                      className={`size-[50px] bottom-3 duration-200 ease-in-out ${isPlaying && currentTrack?.id === artist.tracks[0]?.id ? 'opacity-100' : 'group-hover:opacity-100 opacity-0'}  text-[18px] right-3 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full`}
                    >
                      {isPlaying && currentTrack?.id === artist.tracks[0]?.id ? <IoMdPause /> : <IoMdPlay />}
                      
                    </span>
                  </div>
                  <Link href={`/artist/${artist.public_id}`} className="h-[26px] relative inline-block overflow-hidden font-NeueMontreal font-semibold mt-4 text-[16.5px] text-white capitalize text-lg">
                    <h5 className="block  mt-[.5px] transition-transform duration-300 relative top-[1px] group-hover:-translate-y-full ease-in-out">
                      {artist.username} <img className='inline-flex ml-[.5px] mb-[.6px] w-[16px]' src="/check.png" alt="" />
                    </h5>
                    <h5 className="absolute hover:underline ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">
                      {artist.username} <img className='inline-flex ml-[.5px] mb-[.6px] w-[16px]' src="/check.png" alt="" />
                    </h5>
                  </Link>
                  <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">artist</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Artists