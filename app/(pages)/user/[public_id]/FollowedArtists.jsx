'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { IoMdPlay } from 'react-icons/io'
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5'
import { useAppHook } from '@/context/AppProvider'

const FollowedArtists = ({ userId, public_id }) => {
  const [artists, setArtists] = useState([])
  const { authToken } = useAppHook()

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8000/api/users/${userId}/followed-artists`, {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
      })
        .then(res => setArtists(res.data))
        .catch(err => console.error(err))
    }
  }, [userId])

  if (!artists.length) return <p className="text-white/60">You haven’t followed any artists yet.</p>

  return (
    <div className='flex flex-col gap-0 '>
        <div className="w-full flex justify-between items-center">
            <h1 className='text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Artists You Follow</h1>
            <Link className='text-[#aeaeae] font-NeueMontreal text-[15px] hover:underline ease-in-out duration-200 font-semibold' href={`/user/${public_id}/following`}>Show all</Link>

        </div>
        <div className="pt-2  grid grid-cols-6 w-full gap-0">
        {artists.slice(0, 6).map((artist, i) => (
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
        ))}
        </div>
    </div>
  )
}

export default FollowedArtists;
