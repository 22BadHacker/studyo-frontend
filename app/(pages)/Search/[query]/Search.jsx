'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { IoMdPlay } from 'react-icons/io';
import Link from 'next/link';
import { PiSealCheckFill } from 'react-icons/pi';




export default async function SearchResults({ params }) {
 const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState({ tracks: [], albums: [], artists: [] })

  
  useEffect(() => {
    if (!query) return

    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/search?q=${query}`, {
          withCredentials: true
        })
        setResults(res.data)
      } catch (err) {
        console.error('Search failed:', err)
      }
    }

    fetchResults()
  }, [query])

  if (!query) return <p className="text-white">Please enter a search term</p>

  if (!results.tracks.length && !results.albums.length && !results.artists.length) return <p className="text-white">No results found for "{query}"</p>

  return (
    <div className=" text-white">
        <div className="">
            {/* <h1 className="text-2xl font-bold mb-4">Results for "{query}"</h1> */}
            <div className="">
                <h2 className="text-xl font-semibold">Tracks</h2>
                {results.tracks.length > 0 ? results.tracks.map(track => (
                    <div key={track.id}>{track.title}</div>
                )) : <p>No tracks found.</p>}


                <h2 className="text-2xl pb-2 hover:text-green-500 ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">Artists</h2>
                {results.artists.length > 0 ? results.artists.map(artist => (
                    <div key={artist.id}>
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
                                <h5 className="block mt-[.5px]  transition-transform duration-300 relative top-[1px]  group-hover:-translate-y-full ease-in-out">{artist.username} <PiSealCheckFill className={`inline-flex text-blue-500 ${artist.id === 105 && '-top-[1.5px]'} ${artist.id === 108 && '-top-[1.5px]'} text-[15.5px] relative left-[1px] -top-[.5px]`}/></h5>
                                <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{artist.username} <PiSealCheckFill className={`inline-flex text-blue-500 ${artist.id === 105 && '-top-[1.5px]'} ${artist.id === 108 && '-top-[1.5px]'} text-[15.5px] relative left-[1px] -top-[.5px]`}/></h5>
                            </div>
                            <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{artist.username}</p>
                            </Link>
                        </div>
                )) : <p>No artists found.</p>}




                 <h2 className="text-2xl pb-2 hover:text-green-500 ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">Albums</h2>
               <div className=" relative -left-2 w-full  grid grid-cols-8 gap-[2px]">
                {results.albums.length > 0 ? results.albums.map(album => (
                    <Link href={`/album/${album.public_id}`}  className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group  flex-col gap-[6px]' key={album.id}>
                            
                            <div className="relative ">
                                <img className='h-[176px]  w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${album.cover_image}`} alt={album.title} />
                                <span className="size-[45px] bottom-2 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
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
            
                        </Link>
                        
                        
                )) : <p>No albums found.</p>}
               </div>




            </div>

        </div>
    </div>
  );
}
