'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useAppHook } from '@/context/AppProvider';
import { IoMdPlay } from 'react-icons/io';
import {motion} from 'framer-motion';
import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5"

const FollowingPage = () => {
  const { public_id } = useParams();
  const [artists, setArtists] = useState([]);
  const { authToken } = useAppHook();

  useEffect(() => {
    if (public_id) {
      axios.get(`http://localhost:8000/api/users/${public_id}/following`, {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
      })
        .then(res => setArtists(res.data))
        .catch(err => console.error(err));
    }
  }, [public_id]);

  return (
    <>
      <h1 className="cursor-pointer relative w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] "><Link href={`/user/${public_id}`} className='size-[35px] absolute text-[16px] bg-gradient-to-r from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 border border-white/10 backdrop-blur-sm -left-0  -top-10 flex-center text-white rounded-full'><IoChevronBackSharp /></Link>Followed Artists</h1>
      {artists.length === 0 ? (
        <p className="text-white/60">No followed artists.</p>
      ) : (
        <div className="grid pt-2 grid-cols-6 gap-1">
          {artists.map((artist, i) => (
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
      )}
    </>
  );
};

export default FollowingPage;
