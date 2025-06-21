'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { IoMdPlay } from 'react-icons/io'
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5'

const RelatedArtist = () => {
    const { public_id } = useParams()
    const [artist, setArtist] = useState(null);
    const [relatedArtists, setRelatedArtists] = useState([]);
    const [hover, setHover] = useState(false)
      const scrollRef = useRef(null)
      const [showLeft, setShowLeft] = useState(false)
      const [showRight, setShowRight] = useState(false)

  useEffect(() => {
    if (public_id) {
      axios.get(`http://localhost:8000/api/artist/${public_id}`)
        .then(res => {
          setArtist(res.data.artist)
          setRelatedArtists(res.data.related_artists)
        })
        .catch(err => console.error('Error loading artist', err))
    }
  }, [public_id])


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
    }, [artist]) // also re-check when artists load


  return (
    <div className="w-full  pt-4 flex flex-col gap-2">
      {relatedArtists.length > 0 && (
        <div className="pt-20">
            <h2 className="text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">
            Fans Also Like
            </h2>

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
                <div ref={scrollRef} className="relative pt-2 duration-200 ease-in-out flex overflow-x-auto hide-scrollbar scroll-smooth w-full gap-[6px]">
                {relatedArtists.map((artist, i) => (
                    <div key={i} className='h-fit'>
                            <Link
                            href={`/artist/${artist.public_id}`}
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
                                    className={`size-full ${[14, 86, 72].includes(artist.id) ? 'object-top' : ''} ${artist.id === 52 ? 'saturate-[1]' : ''} saturate-[1.2] mx-auto rounded-full object-cover`}
                                />
                                ) : (
                                <div className="size-full bg-main text-main2 p-[.2px] mx-auto rounded-full mb-4 flex-center font-NeueMontreal text-[35px] font-bold">
                                    {artist.username?.charAt(0).toUpperCase()}
                                </div>
                                )}
                                <span className="size-[50px] bottom-3 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-3 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full">
                                <IoMdPlay />
                                </span>
                            </div>
                            <div className="h-[26px] relative inline-block overflow-hidden font-NeueMontreal font-semibold mt-4 text-[16.5px] text-white capitalize text-lg">
                                <h5 className="block mt-[.5px] transition-transform duration-300 relative top-[1px] group-hover:-translate-y-full ease-in-out">
                                {artist.username} <img className='inline-flex ml-[.5px] mb-[.6px] w-[16px]' src="/check.png" alt="" />
                                </h5>
                                <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">
                                {artist.username} <img className='inline-flex ml-[.5px] mb-[.6px] w-[16px]' src="/check.png" alt="" />
                                </h5>
                            </div>
                            <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">artist</p>
                            </Link>
                        </div>
                        ))}
                </div>

            </div>

        </div>
        )}

    </div>
  )
}

export default RelatedArtist
