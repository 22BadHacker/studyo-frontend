
'use client'
import { useState, useEffect } from 'react';
import { getUserByPublicId } from '@/lib/api';
import { useParams } from 'next/navigation';
import { IoMdPlay } from 'react-icons/io';
import Link from 'next/link';

export default function Playlist() {
  const { public_id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const year = new Date(release_date).getFullYear();

  useEffect(() => {
    if (!public_id) return;

    const fetchData = async () => {
      try {
        const data = await getUserByPublicId(public_id);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [public_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div className=''>
      {/* <h1>{userData.name}'s Profile</h1> */}
      
      {/* <h1 className='text-2xl text-white font-NeueMontreal font-semibold'>Discover {userData.username} Albums</h1> */}
          {/* <h1 className='text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Artist Playlist</h1> */}
     
      {userData.playlists.length > 0 ? (
        <div className=' relative -left-2 w-full  grid grid-cols-8 gap-[2px]'>
          {userData.playlists.map(playlist => (
            <Link href={`/Playlists/${playlist.public_id}`} className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group  flex-col gap-[6px]' key={playlist.id}>
              <div className="relative ">
                  <img className='h-[176px]  w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${playlist.cover_image}`} alt={playlist.title} />
                  <span className="size-[45px] group-hover:bottom-2 bottom-0 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                    <IoMdPlay />
                  </span>

              </div>

              <div className="flex flex-col gap-[2px]">
                
                  <h5 className="font-semibold line-clamp-2      tracking-wide leading-tight mt-1 text-[16.5px] font-NeueMontreal text-white capitalize text-lg">{userData.username} - {playlist.name}</h5>

                <p className='text-[12.5px] pt-1 capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>playlist <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span> by {userData.username} </p>

              </div>
              {/* <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{artist.username}</p> */}
            </Link>
          ))}
        </div>
      ) : (
        <p>No playlists found</p>
      )}
    </div>
  );
}


// items-start flex-nowrap overflow-x-scroll w-full  flex