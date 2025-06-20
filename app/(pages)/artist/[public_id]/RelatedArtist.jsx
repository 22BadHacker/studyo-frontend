'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { IoMdPlay } from 'react-icons/io'

const RelatedArtist = () => {
    const { public_id } = useParams()
    const [artist, setArtist] = useState(null);
    const [relatedArtists, setRelatedArtists] = useState([]);

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


  return (
    <div className="w-full  pt-4 flex flex-col gap-2">
      {relatedArtists.length > 0 && (
        <div className="pt-20">
            <h2 className="text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">
            Fans Also Like
            </h2>
            <div className="pt-4 grid-rows-[.63fr] gap-y-4 grid grid-cols-6 w-full gap-2">
            {relatedArtists.map(artist => (
                <div className='h-fit ' key={artist.id}>
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
                        <span className="size-[50px] bottom-3 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-3 flex-center absolute bg-green-500 backdrop-blur-[50px] text-[#222222] rounded-full">
                        <IoMdPlay />
                        </span>
                    </div>
                    <div className=" h-[26px]  relative inline-block  overflow-hidden font-NeueMontreal font-semibold mt-4 text-[16.5px] text-white capitalize text-lg">
                        <h5 className="block mt-[.5px]  transition-transform duration-300 relative top-[1px]  group-hover:-translate-y-full ease-in-out">{artist.username} <img className='inline-flex ml-[.5px] mb-[.5px] w-[16px]' src="/check.png" alt="" /></h5>
                        <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{artist.username} <img className='inline-flex ml-[.5px] mb-[.5px] w-[16px]' src="/check.png" alt="" /></h5>
                    </div>
                    <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{artist.username}</p>
                    </Link>
                </div>
            ))}
            </div>
        </div>
        )}

    </div>
  )
}

export default RelatedArtist
