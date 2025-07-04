'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoMdPlay } from "react-icons/io"
import { motion } from 'framer-motion'
import { PiSealCheckFill } from "react-icons/pi";



export default function ArtistsPage() {
  const [artists, setArtists] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const filteredArtists = artists.slice(0, 60).filter(artist =>
    artist.username.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('http://localhost:8000/api/artists', { withCredentials: true })
        .then(res => res.json())
        .then(data => {
          setArtists(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Failed to fetch artists:', err)
          setLoading(false)
        })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>
    )
  }

  

  return (
    <>
      {/* <h1 className="text-2xl pb-3 pt-10 font-NeueMontreal tracking-wide text-green-500 rounded-full w-fit font-bold mb-6">
        Discover Your Next Favorite Artist
      </h1> */}

      {/* <div className="link-wrapper  h-[65px]  cursor-pointer w-fit  font-NeueMontreal  text-white/60 font leading-tight font-[600] tracking-[0.015em] text-[50px]">
        <h1 className=' link-text '>Discover Your Next Favorite Artist</h1>
        <h1 className=' link-text-clone '>Discover Your Next Favorite Artist </h1>
        
        </div> */}
        <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] '>Discover Your Next Favorite Artist </h1>

      <div className="py-10 pt-11 min-h-screen grid-rows-[.63fr] gap-y-4 grid grid-cols-6 w-full gap-2">
        {filteredArtists.map((artist, i) => (

          <motion.div className='h-fit ' viewport={{ once: true}} key={artist.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: .04, delay: i * .07, ease: 'easeInOut' }}>
            <Link
              href={`/artist/${artist.public_id}`}
             
              className="p-4  group relative flex h-fit flex-col gap-1 hover:bg-main2/70  duration-200 ease-in-out cursor-pointer rounded-md text-left"
            >
              <div className="relative size-[230px]">
                {artist.profile_image ? (
                  <img
                    src={`http://localhost:8000${artist.profile_image}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/Hand.jpeg'; // fallback image in /public
                    }}
                    alt="Profile"
                    // alt={artist.username}
                    className={`size-full  ${artist.id === 14 && 'object-top'} ${artist.id === 86 && 'object-top'}  ${artist.id === 72 && 'object-top'} ${artist.id === 52 && 'saturate-[1]'} saturate-[1.2] mx-auto rounded-full object-cover`}
                  />
                ) : (
                  <div className="size-full  bg-main text-main2 p-[.2px] mx-auto rounded-full mb-4 flex-center font-NeueMontreal text-[35px] font-bold">
                    {artist.username?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="size-[50px] bottom-2 group-hover:bottom-3 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-3 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full">
                  <IoMdPlay />
                </span>
              </div>
              <div className=" h-[26px]  relative inline-block  overflow-hidden font-NeueMontreal font-semibold mt-4 text-[16.5px] text-white capitalize text-lg">
                <h5 className="block mt-[.5px]  transition-transform duration-300 relative top-[1px]  group-hover:-translate-y-full ease-in-out">{artist.username} <img className='inline-flex ml-[.5px] mb-[.5px] w-[16px]' src="/check.png" alt="" /></h5>
                <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{artist.username} <img className='inline-flex ml-[.5px] mb-[.5px] w-[16px]' src="/check.png" alt="" /></h5>
              </div>
              <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{artist.username}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  )
}



{/* <PiSealCheckFill className={`inline-flex text-blue-500 ${artist.id === 105 && '-top-[1.5px]'} ${artist.id === 108 && '-top-[1.5px]'} text-[15.5px] relative left-[1px] -top-[.5px]`}/> */}