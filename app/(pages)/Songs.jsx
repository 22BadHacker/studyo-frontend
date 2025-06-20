'use client'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { IoMdPlay } from 'react-icons/io'
import { useAudio } from '@/context/AudioProvider'
import { trackss, trackss2 } from '@/Data/data'
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5"
import { motion } from 'framer-motion'

const Songs = () => {
    const {playTrack} = useAudio()
     const [hover, setHover] = useState(false)
      const scrollRef = useRef(null)
      const scrollRef2 = useRef(null)
      const scrollRef3 = useRef(null)
      const [tab, setTabs] = useState('popular')
      const [artists, setArtists] = useState([])

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (direction === 'left') {
        current.scrollBy({ left: -1312, behavior: 'smooth' });
        } else {
        current.scrollBy({ left: 1312, behavior: 'smooth' });
        }
    };

    const scroll2 = (direction) => {
        const { current } = scrollRef2;
        if (direction === 'left') {
        current.scrollBy({ left: -1312, behavior: 'smooth' });
        } else {
        current.scrollBy({ left: 1312, behavior: 'smooth' });
        }
    };

    const scroll3 = (direction) => {
        const { current } = scrollRef3;
        if (direction === 'left') {
        current.scrollBy({ left: -1312, behavior: 'smooth' });
        } else {
        current.scrollBy({ left: 1312, behavior: 'smooth' });
        }
    };

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


  return (
    <div className=''>
        <div className="w-full  flex items-end justify-between">
            <div className="flex pb-4 flex-col gap-2">
                <h1 className='text-2xl  hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Discover this Week on Stüdyo</h1>
                {/* <h1 className='text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Discography</h1> */}
                <div className="flex gap-3 items-center">
                    <p onClick={() => setTabs('popular')}  className={`text-[13px] cursor-pointer duration-200 ease-in-out py-[5px] ${tab === 'popular' ? 'text-main2 bg-white': 'bg-main2/60 backdrop-blur-2xl text-white'} capitalize px-4 rounded-full `}>popular releases</p>
                    <p onClick={() => setTabs('new')} className={`text-[13px] duration-200 cursor-pointer ease-in-out py-[5px] ${tab === 'new' ? 'text-main2 bg-white': 'bg-main2/60 backdrop-blur-2xl text-white'} capitalize px-4 rounded-full `}>New Songs</p>
                    <p onClick={() => setTabs('trending')} className={`text-[13px] duration-200 ease-in-out cursor-pointer py-[5px] ${tab === 'trending' ? 'text-main2 bg-white': 'bg-main2/60 backdrop-blur-2xl text-white'} capitalize px-4 rounded-full `}>Trending Artists</p>
                </div>
            </div>

            {/* Arrows */}

            {
                tab === 'popular' && (
                    <div className="flex pb-1 items-center gap-5">
                        <div onClick={() => scroll('left')} className=" flex-center text-[16px] hover:scale-110 cursor-pointer duration-200 ease-in-out z-10 -left-0 top-[40%] -translate-y-1/2 rounded-full size-10 border-white/10 shadow-xl border-[.5px] bg-main2/50 backdrop-blur-[13px]">
                            <IoChevronBackSharp className='relative -left-[2px]' />
                        </div>
                        
                        <div onClick={() => scroll('right')} className=" flex-center text-[16px] hover:scale-110 cursor-pointer duration-200 ease-in-out -right-0 z-10 top-[40%] -translate-y-1/2 rounded-full size-10 border-white/10 shadow-xl border-[.5px] bg-main2/50 backdrop-blur-[13px]">
                            <IoChevronForwardSharp className='relative right-[0px]' />
                        </div>

                    </div>

                )    
            }


            {
                tab === 'new' && (
                    <div className="flex pb-1 items-center gap-5">
                        <div onClick={() => scroll2('left')} className=" flex-center text-[16px] hover:scale-110 cursor-pointer duration-200 ease-in-out z-10 -left-0 top-[40%] -translate-y-1/2 rounded-full size-10 border-white/10 shadow-xl border-[.5px] bg-main2/50 backdrop-blur-[13px]">
                            <IoChevronBackSharp className='relative -left-[2px]' />
                        </div>
                        
                        <div onClick={() => scroll2('right')} className=" flex-center text-[16px] hover:scale-110 cursor-pointer duration-200 ease-in-out -right-0 z-10 top-[40%] -translate-y-1/2 rounded-full size-10 border-white/10 shadow-xl border-[.5px] bg-main2/50 backdrop-blur-[13px]">
                            <IoChevronForwardSharp className='relative right-[0px]' />
                        </div>

                    </div>

                )    
            }




            {
                tab === 'trending' && (
                    <div className="flex pb-1 items-center gap-5">
                        <div onClick={() => scroll3('left')} className=" flex-center text-[16px] hover:scale-110 cursor-pointer duration-200 ease-in-out z-10 -left-0 top-[40%] -translate-y-1/2 rounded-full size-10 border-white/10 shadow-xl border-[.5px] bg-main2/50 backdrop-blur-[13px]">
                            <IoChevronBackSharp className='relative -left-[2px]' />
                        </div>
                        
                        <div onClick={() => scroll3('right')} className=" flex-center text-[16px] hover:scale-110 cursor-pointer duration-200 ease-in-out -right-0 z-10 top-[40%] -translate-y-1/2 rounded-full size-10 border-white/10 shadow-xl border-[.5px] bg-main2/50 backdrop-blur-[13px]">
                            <IoChevronForwardSharp className='relative right-[0px]' />
                        </div>

                    </div>

                )    
            }




        </div>

        <div className="w-full h-full relative"  >
                       

                {
                    tab === 'popular' && (
                        
                        <>
                        <div ref={scrollRef}  className='relative pb-[11.5px] duration-200 ease-in-out flex overflow-x-auto hide-scrollbar scroll-smooth w-full gap-5'>
                            {
                                    trackss.map((track, index) => (
                                        <motion.div initial={{opacity: 0}} animate={{ opacity: 1}} transition={{duration: .06, delay: index * .06, ease: 'easeInOut'}} key={index} className="  relative flex flex-col gap-[10px]   ">
                                            <div className=" w-[308px] rounded-md overflow-hidden cursor-pointer group relative h-[310px]">
                                                <img className='w-full saturate-[1.3] h-full  object-cover' src={track.cover} alt="" />
                                                <span onClick={()=>playTrack({id: track.id, title: track.title, artist: track.artist, cover: track.cover, src: track.src})} className="size-[55px] bottom-3 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[20px] right-3 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full">
                                                    <IoMdPlay />
                                                </span>
                                            </div>

                                            <div className="w-full pt-[4px] flex gap-3">
                                                <h4 className='text-2xl hover:text-red-500 relative -top-[1px]  ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>{track.title}</h4>
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
                                    </motion.div>
                                ))

                            }
                        </div>
                        </>
                    )
                }

                
                {
                    tab === 'new' && (
                        
                        <>
                            <div ref={scrollRef2}  className='relative duration-200 pb-[11.5px] ease-in-out flex overflow-x-auto hide-scrollbar scroll-smooth w-full gap-5'>
                                {
                                    trackss2.map((track, index) => (
                                        <motion.div initial={{opacity: 0}} animate={{ opacity: 1}} transition={{duration: .06, delay: index * .06, ease: 'easeInOut'}} key={index} className="  relative flex flex-col gap-[10px]   ">
                                            <div className=" w-[308px] rounded-md overflow-hidden cursor-pointer group relative h-[310px]">
                                                <img className='w-full saturate-[1.3] h-full  object-cover' src={track.cover} alt="" />
                                                <span onClick={()=>playTrack({id: track.id, title: track.title, artist: track.artist, cover: track.cover, src: track.src})} className="size-[55px] bottom-3 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[20px] right-3 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full">
                                                    <IoMdPlay />
                                                </span>
                                            </div>

                                            <div className="w-full pt-[4px] flex gap-3">
                                                <h4 className='text-2xl hover:text-red-500 relative -top-[1px]  ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>{track.title}</h4>
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
                                        </motion.div>
                                    ))

                                }
                            </div>
                        </>
                    )
                }


                {
                    tab === 'trending' && (
                        
                        <>
                            <div ref={scrollRef3}  className='relative  duration-200 ease-in-out flex overflow-x-auto hide-scrollbar scroll-smooth w-full gap-5'>
                                {
                                    artists.slice(76, 100).map((artist, index) => (
                                        <motion.div initial={{opacity: 0}} animate={{ opacity: 1}} transition={{duration: .06, delay: index * .06, ease: 'easeInOut'}} key={index} className="  relative flex flex-col gap-[10px]   ">
                                            <div className=" w-[308px]  overflow-hidden cursor-pointer group relative h-[310px]">
                                                <img className='w-full shadow rounded-full saturate-[1.3] h-full  object-cover' src={`http://localhost:8000${artist.profile_image}`} alt="" />
                                                <span  className="size-[55px] bottom-4 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[20px] right-4 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full">
                                                    <IoMdPlay />
                                                </span>
                                            </div>

                                            <div className="w-full flex-col pt-[3px] flex gap-0">
                                                <Link href={`/artist/${artist.public_id}`} className='text-lg relative hover:text-red-500 hover:underline -top-[1px]  ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>{artist.username}</Link>
                                                <p className='text-[11px] font-semibold text-white/[.75px] '>@{artist.username}</p>
                                                {/* <img className='inline-flex object-cover ml-[.5px] mb-[.6px] w-[16px]' src="/check.png" alt="" /> */}
                                                
                                            </div>
                                        </motion.div>
                                    ))

                                }
                            </div>
                        </>
                    )
                }


        </div>


    </div>
  )
}

export default Songs
