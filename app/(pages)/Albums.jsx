'use client'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { IoMdPlay } from 'react-icons/io'
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5"
import { tracks } from '@/Data/data'
import { useAudio } from '@/context/AudioProvider'
import { useAppHook } from '@/context/AppProvider'

export default function LatestAlbums() {
  const [albums, setAlbums] = useState([])
  const [hover, setHover] = useState(false)
   const scrollRef = useRef(null)
    const [showLeft, setShowLeft] = useState(false)
    const [showRight, setShowRight] = useState(false)
    const { playTrack, isPlaying, togglePlay, setQueue, currentTrack} = useAudio();
    const { authToken } = useAppHook();

    
    

  useEffect(() => {
    axios.get('http://localhost:8000/api/allAlbums', {  
      headers: {
        authorization: `Bearer ${authToken}`
      }
    })
      .then(res => setAlbums(res.data))
      .catch(err => console.error('Error fetching albums:', err))
  }, [])



  // const selectedAlbums = albums.filter(album => album.id === [46, 47, 41])
  const selectedAlbums =  [
    albums.find(album => album.id === 46),
    albums.find(album => album.id === 47),
    albums.find(album => album.id === 41)
  ]
  


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
    }, [albums])


    const handlePlayAll = async (album) => {
        if (!album.tracks || album.tracks.length === 0) return;
        
        const formattedQueue = album.tracks.map(track => ({
          id: track.id,
          title: track.title,
          album: album.username,
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
    <section className="relative">
      <div className="flex pb-3 flex-col gap-2">
        <h1 className='text-2xl relative group  flex gap-[7px] items-start  ease-in-out duration-200 w-fit cursor-pointer   hover:text-[#c42b1c] font-NeueMontreal font-semibold'><span className='bg-[#c42b1c] duration-200 ease-in-out group-hover:opacity-0 absolute top-1/2  opacity-90 w-full h-[2px]  '></span>Latest Albums</h1>
        </div>

        {/* <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="w-full h-auto relative">
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
                    {albums.map(album => (
                        <Link href={`/album/${album.public_id}`} className='flex cursor-pointer rounded-md w-[400px] hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group  flex-col gap-[6px]' key={album.id}>
                            <div className="w-full cursor-pointer  relative  ">
                                <img className='h-[185px]  w-[full] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${album.cover_image}`} alt={album.title} />
                                <span onClick={() => handlePlayAll(album)}  className="size-[45px] group-hover:bottom-2 bottom-0 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                                    <IoMdPlay />
                                </span>

                            </div>

                            <div className="flex flex-col gap-[2px]">
                                
                                <h5 className="font-semibold line-clamp-2      tracking-wide leading-tight mt-1 text-[16.5px] font-NeueMontreal text-white capitalize text-lg">{album.title}</h5>

                                <p className='text-[12.5px] pt-1 capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>{new Date(album.release_date).getFullYear()} <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span> album</p>

                            </div>
                            <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{album.user.username}</p>
                        </Link>
                    ))}
                  </div>
                </div> */}
                <div className='  pt-1  h-auto w-full  grid grid-cols-8 gap-[2px]'>
                
                            {
                                albums.map((album, index) => (
                                    <div key={index} className="w-full group p-[6px] hover:bg-main2/90 duration-200 ease-in-out rounded  relative flex flex-col gap-[7px]   ">
                                        <div className="w-full cursor-pointer  relative ">
                                             <img className='h-[185px]  w-[full] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${album.cover_image}`} alt={album.title} />
                                              <span onClick={() => handlePlayAll(album)}  className="size-[45px] group-hover:bottom-2 bottom-0 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                                                  <IoMdPlay />
                                              </span>
                                        </div>
                
                                         <div className="flex flex-col gap-[2px]">
                                
                                              <h5 className="font-semibold line-clamp-2      tracking-wide leading-tight mt-1 text-[16.5px] font-NeueMontreal text-white capitalize text-lg">{album.title}</h5>

                                              <p className='text-[12.5px] pt-1 capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>{new Date(album.release_date).getFullYear()} <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span> album</p>

                                          </div>
                                          <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{album.user.username}</p>
                                </div>
                            ))
                        }
                
                                            
                        
                           
                
                        </div>
    </section>
  )
}
