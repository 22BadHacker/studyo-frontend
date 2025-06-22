
'use client'
import { useState, useEffect } from 'react';
import { getUserByPublicId } from '@/lib/api';
import { useParams } from 'next/navigation';
import { IoMdPlay } from 'react-icons/io';
import Link from 'next/link';

export default function Albums() {
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
    <div className='w-full  pt-11 flex flex-col gap-2'>
      {/* <h1>{userData.name}'s Profile</h1> */}
      
      {/* <h1 className='text-2xl text-white font-NeueMontreal font-semibold'>Discover {userData.username} Albums</h1> */}
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <h1 className='text-2xl hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Discography</h1>
          <div className="flex gap-3 items-center">
            <p className='text-[13px] py-[5px] capitalize px-4 rounded-full text-main2 bg-white'>popular releases</p>
            <p className='text-[13px] py-[5px] capitalize px-4 rounded-full bg-main2 text-white'>Albums</p>
            <p className='text-[13px] py-[5px] capitalize px-4 rounded-full bg-main2 text-white'>Singles and EPs</p>
          </div>

        </div>
      <p className='text-white/80 relative right-[10px] top-1 font-semibold text-[15px]  hover:bg-main2 cursor-pointer duration-200 ease-in-out hover:text-white font-NeueMontreal rounded-full '>Show all</p>

      </div>
      {userData.albums.length > 0 ? (
        <div className=' relative -left-2 w-full  grid grid-cols-8 gap-[2px]'>
          {userData.albums.map(album => (
            <Link href={`/album/${album.public_id}`} className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group  flex-col gap-[6px]' key={album.id}>
              <div className="relative ">
                  <img className='h-[176px]  w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${album.cover_image}`} alt={album.title} />
                  <span className="size-[45px] group-hover:bottom-2 bottom-0 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                    <IoMdPlay />
                  </span>

              </div>

              <div className="flex flex-col gap-[2px]">
                <div className=" h-[26px]  relative inline-block   overflow-hidden font-semibold tracking-wide mt-1 text-[16.5px] font-NeueMontreal text-white/90 capitalize text-lg">
                  <h5 className="block transition-transform duration-300 relative top-[0px]  group-hover:-translate-y-full ease-in-out">{album.title}</h5>
                  <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{album.title}</h5>
                </div>

                <p className='text-[12px] capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>{new Date(album.release_date).getFullYear()} <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span> album</p>

              </div>
              {/* <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{artist.username}</p> */}
            </Link>
          ))}
        </div>
      ) : (
        <p>No albums found</p>
      )}
    </div>
  );
}


// items-start flex-nowrap overflow-x-scroll w-full  flex