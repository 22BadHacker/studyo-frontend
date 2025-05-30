'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoMdPlay } from "react-icons/io";

const images = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
  '/images/img7.jpg',
  '/images/img8.jpg',
  '/images/img16.jpg',
  '/images/img20.jpg',
];

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/artists') // adjust this to your API
      .then(res => res.json())
      .then(data => setArtists(data))
      .catch(err => console.error('Failed to fetch artists:', err));
  }, []);

  return (
    <>
       {/* <h1 className='text-[50px] text-white font leading-tight  max-w-[600px] font-[800]'><span className='w-12 mr-3 h-[3px] bg-white inline-block'></span>Discover Your Next Favorite Artist</h1> */}
      <div className="py-10 grid grid-cols-6 w-full gap-1">
        {artists.map((artist) => (
          <div key={artist.id} className=" p-4 group relative flex flex-col gap-1 hover:bg-[#1f1f1f]/50 cursor-pointer  rounded-xl  text-left">
            <div className="relative size-full">
                {artist.profile_image ? (
                  <img
                    src={images.map((src, i) => src)[Math.floor(Math.random() * images.length)]}
                    alt={artist.username}
                    className="size-full  bg-gradient-to-r from-green-400 to-red-600 p-[.2px] mx-auto rounded-full object-cover"
                  />
                ) : (
                  <div className="size-full text-[24px] bg-gradient-to-r from-gray-400 text-black p-[.2px] mx-auto rounded-full mb-4 bg-gray-300 flex items-center justify-center text-2xl font-bold">
                    {artist.username?.charAt(0).toUpperCase()}
                  </div>
                )}
              <span className='size-[50px] te bottom-3 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[17.5px] right-3 flex-center shadow-md absolute bg-green-500/70 border-[1.5px] border-black/40  backdrop-blur-[20px] text-white rounded-full'><IoMdPlay/></span>

            </div>
            <Link href={`/Profile/${artist.public_id}`} className="font-NeueMontreal pt-3 text-[15.8px] text-white capitalize text-lg">{artist.username}</Link>
            <p className="text-[14.5px] relative -top-[2px]  opacity-85">{artist.role === 'artist' ? 'Artist' : 'Users'}</p>

          </div>
        ))}
      </div>
    </>
  );
}


// artist.profile_image