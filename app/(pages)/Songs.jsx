'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { IoMdPlay } from 'react-icons/io'
import { useAudio } from '@/context/AudioProvider'
import { trackss } from '@/Data/data'
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5"

const Songs = () => {
    const {playTrack} = useAudio()
     const [hover, setHover] = useState(false)
      const scrollRef = useRef(null)
      const [showLeftt, setShowLeftt] = useState(false)
      const [showRightt, setShowRightt] = useState(false)

      const scroll = (direction) => {
          const { current } = scrollRef
          if (!current) return
      
          const scrollAmount = 1312
          current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
        }
      
        const checkScroll = () => {
          const el = scrollRef.current
          if (!el) return
      
          setShowLeftt(el.scrollLeft > 0)
          setShowRightt(el.scrollLeft + el.clientWidth < el.scrollWidth)
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
        }, [])
  return (
    <div className='pb-3'>
        <div className="w-full  flex items-end justify-between">
            <div className="flex pb-4 flex-col gap-2">
                <h1 className='text-2xl  hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Discover this Week on Stüdyo</h1>
                {/* <h1 className='text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Discography</h1> */}
                <div className="flex gap-3 items-center">
                    <p className='text-[13px] py-[5px] capitalize px-4 rounded-full text-main2 bg-white'>popular releases</p>
                    <p className='text-[13px] py-[5px] capitalize px-4 rounded-full bg-main2/60 backdrop-blur-2xl text-white'>New Songs</p>
                    <p className='text-[13px] py-[5px] capitalize px-4 rounded-full bg-main2/60 backdrop-blur-2xl text-white'>Trending Artists</p>
                </div>
            </div>

            <div className="flex pb-0 items-center gap-5">
                <div onClick={() => scroll('left')} className=" flex-center text-[16px] hover:scale-110 cursor-pointer duration-200 ease-in-out z-10 -left-0 top-[40%] -translate-y-1/2 rounded-full size-10 border-white/10 shadow-xl border-[.5px] bg-main2/50 backdrop-blur-[13px]">
                    <IoChevronBackSharp className='relative -left-[2px]' />
                </div>
                
                 <div onClick={() => scroll('right')} className=" flex-center text-[16px] hover:scale-110 cursor-pointer duration-200 ease-in-out -right-0 z-10 top-[40%] -translate-y-1/2 rounded-full size-10 border-white/10 shadow-xl border-[.5px] bg-main2/50 backdrop-blur-[13px]">
                    <IoChevronForwardSharp className='relative right-[0px]' />
                </div>

            </div>

        </div>

        <div className="w-full h-full relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                       

            <div ref={scrollRef}  className='relative duration-200 ease-in-out flex overflow-x-auto hide-scrollbar scroll-smooth w-full gap-5'>

                {
                    trackss.map((track, index) => (
                        <div key={index} className="  relative flex flex-col gap-[10px]   ">
                            <div className=" w-[308px] rounded-md overflow-hidden cursor-pointer group relative h-[310px]">
                                <img className='w-full saturate-[1.3] h-full  object-cover' src={track.cover} alt="" />
                                <span onClick={()=>playTrack({id: track.id, title: track.title, artist: track.artist, cover: track.cover, src: track.src})} className="size-[55px] bottom-3 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[20px] right-3 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full">
                                    <IoMdPlay />
                                </span>
                            </div>

                            <div className="w-full pt-[3px] flex gap-3">
                                <h4 className='text-2xl relative -top-[1px]  ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>{track.title}</h4>
                                <div className="flex gap-2 text-[12.5px] font-semibold items-center">
                                    <img className='size-[29px] rounded-full object-cover' src={track.profileImage} alt="" />
                                    <Link className='hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold' href={track.link}>{track.artist}</Link>

                                    {
                                        track.artist2 && track.link2 ? (
                                            <>
                                                <span className=''>feat,</span>
                                                <div className='flex gap-2 text-[12.5px] font-semibold items-center'>
                                                    {/* <img className='size-[29px] rounded-full object-cover' src={track.profileImage2} alt="" /> */}
                                                    <Link className='hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold' href={track.link2}>{track.artist2}</Link>
                                                </div>
                                            </>
                                        ) : null
                                    }
                                </div>
                        </div>
                    </div>
                ))
            }

                                
            
            

            </div>

            

        </div>


    </div>
  )
}

export default Songs
