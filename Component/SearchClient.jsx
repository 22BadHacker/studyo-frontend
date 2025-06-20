'use client';

import axios from 'axios';
import Link from 'next/link';
import { IoIosAddCircleOutline, IoMdPlay } from 'react-icons/io';
import { PiSealCheckFill } from 'react-icons/pi';
import { useState, useEffect } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

export default function SearchClient({ query }) {
    const [tabs, setTabs] = useState('all');
  const [results, setResults] = useState({
    tracks: [],
    albums: [],
    artists: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topResult, setTopResult] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/search?q=${query}`, {
          withCredentials: true,
        });
        setResults(res.data);
      } catch (err) {
        console.error('Search failed', err);
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
  if (results) {
    const queryLower = query.toLowerCase();

    // Prefer exact username match for artist
    const topArtist = results.artists.find(a =>
      a.username.toLowerCase() === queryLower
    );

    if (topArtist) {
      setTopResult({ type: 'artist', data: topArtist });
      return;
    }

    // Then prefer exact title match for track
    const topTrack = results.tracks.find(t =>
      t.title.toLowerCase() === queryLower
    );
    if (topTrack) {
      setTopResult({ type: 'track', data: topTrack });
      return;
    }

    // Then use album
    const topAlbum = results.albums.find(al =>
      al.title.toLowerCase() === queryLower
    );
    if (topAlbum) {
      setTopResult({ type: 'album', data: topAlbum });
      return;
    }

    // Otherwise fallback to first artist/track/album
    if (results.artists.length > 0) {
      setTopResult({ type: 'artist', data: results.artists[0] });
    } else if (results.tracks.length > 0) {
      setTopResult({ type: 'track', data: results.tracks[0] });
    } else if (results.albums.length > 0) {
      setTopResult({ type: 'album', data: results.albums[0] });
    }
  }
}, [results, query]);


//   if (loading) return <div className="text-white min-h-screen">Loading...</div>;
//   if (error) return <div className="text-white min-h-screen">{error}</div>;

  return (
    <div className="py-[190px] bg-black h-auto min-h-screen text-white">
      <div className="container">
        
        <h1 className='cursor-pointer w-fit font-NeueMontreal uppercase leading-[.85] text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw]'>
              Results for "{query}"
            </h1>

            <div className="flex py-5 pb-6 gap-3 items-center">
                <p onClick={() => setTabs('all')}  className={`text-[14px] hover:scale-105 tracking-wide font-NeueMontreal cursor-pointer duration-200 ease-in-out py-[6px]  ${tabs === 'all' ? 'text-main2 bg-white': 'bg-main2/90 backdrop-blur-2xl text-white'} capitalize px-5 rounded-full `}>All</p>
                <p onClick={() => setTabs('songs')}  className={`text-[14px] ${tabs === 'songs' ? 'text-main2 bg-white': 'bg-main2/90 backdrop-blur-2xl text-white'} font-NeueMontreal tracking-wide duration-200 cursor-pointer ease-in-out py-[6px] bg-main2/90 backdrop-blur-2xl  capitalize px-5 rounded-full  hover:scale-105`}>Songs</p>
                <p onClick={() => setTabs('artists')}  className={`text-[14px] ${tabs === 'artists' ? 'text-main2 bg-white': 'bg-main2/90 backdrop-blur-2xl text-white'} font-NeueMontreal tracking-wide duration-200 ease-in-out cursor-pointer py-[6px] bg-main2/90 backdrop-blur-2xl capitalize px-5 rounded-full  hover:scale-105`}>Artists</p>
                <p onClick={() => setTabs('albums')}  className={`text-[14px] ${tabs === 'albums' ? 'text-main2 bg-white': 'bg-main2/90 backdrop-blur-2xl text-white'} font-NeueMontreal tracking-wide duration-200 ease-in-out cursor-pointer py-[6px] bg-main2/90 backdrop-blur-2xl  capitalize px-5 rounded-full  hover:scale-105`}>Albums</p>
                <p onClick={() => setTabs('playlist')}  className={`text-[14px] ${tabs === 'playlist' ? 'text-main2 bg-white': 'bg-main2/90 backdrop-blur-2xl text-white'} font-NeueMontreal tracking-wide duration-200 ease-in-out cursor-pointer py-[6px] bg-main2/90 backdrop-blur-2xl  capitalize px-5 rounded-full  hover:scale-105`}>Playlist</p>
                <p onClick={() => setTabs('podcast')}  className={`text-[14px] ${tabs === 'podcast' ? 'text-main2 bg-white': 'bg-main2/90 backdrop-blur-2xl text-white'} font-NeueMontreal tracking-wide duration-200 ease-in-out cursor-pointer py-[6px] bg-main2/90 backdrop-blur-2xl  capitalize px-5 rounded-full  hover:scale-105`}>Podcats</p>
            </div>

        {!results.tracks.length && !results.albums.length && !results.artists.length ? (
        //   <p className="cursor-pointer w-fit font-NeueMontreal text-white/60 font-bold leading-tight tracking-[0.015em] text-[50px]">
        //     No results found for "{query}"
        //   </p>
        null
        ) : (
          <>
            

            <div className="flex pt-7 flex-col gap-12 w-full h-auto">

             {tabs === 'all' && (
                 <>

                    <div className="grid grid-cols-[auto_1fr] gap-10">
                        {topResult && (
                        <div className=" pt-1 pb-8">
                            <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer text-white/95 font-NeueMontreal font-semibold pb-4">Top Result</h2>

                        {topResult.type === 'artist' && (
                        <Link
                            href={`/artist/${topResult.data.public_id}`}
                            className="flex flex-col duration-200 ease-in-out relative group gap-4 px-6 pb-9 pt-6 w-[420px] rounded-md bg-main2/70 hover:bg-[#282828]/70 transition"
                        >
                             <span className="size-[50px]  bottom-2 group-hover:bottom-4 shadow-2xl duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[19px] right-4 flex-center absolute bg-green-500  backdrop-blur-[50px] text-[#222222] rounded-full">
                                <IoMdPlay />
                                </span>
                            <img
                            src={`http://localhost:8000${topResult.data.profile_image}`}
                            className="size-[110px] object-cover rounded-full"
                            alt={topResult.data.username}
                            />
                            <div className='flex gap-1 pt-1 flex-col leading-tight'>
                                <h3 className="text-white font-NeueMontreal text-[30px] font-bold">{topResult.data.username}</h3>
                                <p className="text-white/70 font-NeueMontreal text-sm">Artist</p>
                            </div>
                        </Link>
                        )}

                        {topResult.type === 'track' && (
                        <div className="flex flex-col duration-200 ease-in-out relative group gap-4 px-6 pb-9 pt-6 w-[420px] rounded-md bg-main2/70 hover:bg-[#282828]/70 transition">
                            <img
                            src={`http://localhost:8000/storage/${topResult.data.cover_image}`}
                            className="size-[80px] object-cover rounded-md"
                            alt={topResult.data.title}
                            />
                            <div>
                            <h3 className="text-white text-xl font-bold">{topResult.data.title}</h3>
                            <p className="text-white/70 text-sm">Track · {topResult.data.user.username}</p>
                            </div>
                        </div>
                        )}

                        {topResult.type === 'album' && (
                        <Link
                            href={`/album/${topResult.data.public_id}`}
                            className="flex flex-col duration-200 ease-in-out relative group gap-4 px-6 pb-9 pt-6 w-[420px] rounded-md bg-main2/70 hover:bg-[#282828]/70 transition"
                        >

                            <span className="size-[50px]  bottom-2 group-hover:bottom-4 shadow-2xl duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[19px] right-4 flex-center absolute bg-green-500  backdrop-blur-[50px] text-[#222222] rounded-full">
                                <IoMdPlay />
                                </span>

                            <img
                            src={`http://localhost:8000/storage/${topResult.data.cover_image}`}
                            className="size-[110px] shadow-2xl  object-cover rounded-md"
                            alt={topResult.data.title}
                            />
                            <div className='flex pt-1 gap-1 flex-col leading-tight'>
                                <h3 className="text-white font-NeueMontreal text-[30px] font-bold">{topResult.data.title}</h3>
                                <p className="text-white/70 flex items-center gap-[6px] font-NeueMontreal text-sm">Album <span className="size-1 relative top-[2px] rounded-full bg-white/50"></span> <Link href={`/artist/${topResult.data.user.public_id}`} className="font-medium hover:underline text-white">{topResult.data.user.username}</Link></p>
                            </div>
                        </Link>
                        )}
                        </div>
                        )}

                        <div className="flex flex-col gap-0">
                            <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer text-white/95 font-NeueMontreal font-semibold pb-2">Songs</h2>
                            <div className="flex pt-1 flex-col gap-0 w-full">
                            {results.tracks.length > 0 ? results.tracks.slice(0, 4).map(track => (
                                <div className="flex group py-2 hover:bg-main2/60 px-3 rounded justify-between " key={track.id}>
                                <div className="flex items-center gap-2 ">
                                    <img
                                    src={`http://localhost:8000/storage/${track.cover_image}`}
                                    alt={track.title}
                                    className={`size-[46px] saturate-[1.2] mx-auto rounded-sm object-cover`}
                                    />
                                    <div className="flex flex-col gap-">
                                    <p className="text-md font-medium">{track.title}</p>
                                    <Link href={`/artist/${track.user?.public_id}`} className="text-sm font hover:text-white hover:underline text-white/60">{track.user?.username}</Link>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <IoIosAddCircleOutline  className=' text-[17px] relative right-2 opacity-0 group-hover:opacity-100 '/>
                                    <p>{track.duration}</p>
                                    <HiOutlineDotsHorizontal  className=' text-[17px] opacity-0 group-hover:opacity-100 '/>
            
                                </div>
                                </div>
                            )) : null}
                            </div>
                        </div>


                    </div>

                    <div className="flex flex-col gap-0">
                        <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer text-white/95 font-NeueMontreal font-semibold pb-1">Artists</h2>
                        <div className="grid-rows-[.63fr] gap-y-4 grid grid-cols-6 w-full gap-2">
                        {results.artists.length > 0 ? results.artists.slice(0, 6).map(artist => (
                            <div key={artist.id}>
                            <Link
                                href={`/artist/${artist.public_id}`}
                                className="p-4 group relative flex h-fit flex-col gap-1 hover:bg-main2/70 duration-200 ease-in-out cursor-pointer rounded-md text-left"
                            >
                                <div className="relative size-[230px]">
                                {artist.profile_image ? (
                                    <img
                                    src={`http://localhost:8000${artist.profile_image}`}
                                    className={`size-full ${artist.id === 14 && 'object-top'} ${artist.id === 86 && 'object-top'} ${artist.id === 72 && 'object-top'} ${artist.id === 52 && 'saturate-[1]'} saturate-[1.2] mx-auto rounded-full object-cover`}
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
                                <h5 className="block mt-[.5px] transition-transform duration-300 relative top-[1px] group-hover:-translate-y-full ease-in-out">{artist.username}</h5>
                                <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{artist.username}</h5>
                                </div>
                                <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">Artist</p>
                            </Link>
                            </div>
                        )) : <p>No artists found.</p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer text-white/95 font-NeueMontreal font-semibold pb-2">Albums</h2>
                        <div className="relative -left-2 w-full grid grid-cols-8 gap-[2px]">
                        {results.albums.length > 0 ? results.albums.map(album => (
                            <Link href={`/album/${album.public_id}`} className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group flex-col gap-[6px]' key={album.id}>
                            <div className="relative">
                                <img className='h-[176px] w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${album.cover_image}`} alt={album.title} />
                                <span className="size-[45px] bottom-2 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                                <IoMdPlay />
                                </span>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                                <Link href={`/artist/${album.public_id}`} className="h-[26px] relative inline-block overflow-hidden font-semibold tracking-wide mt-1 text-[16.5px] font-NeueMontreal text-white/90 capitalize text-lg">
                                <h5 className="block transition-transform duration-300 relative top-[0px] group-hover:-translate-y-full ease-in-out">{album.title}</h5>
                                <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{album.title}</h5>
                                </Link>
                                <p className='text-[12px] capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>
                                {new Date(album.release_date).getFullYear()} <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span>
                                <Link href={`/artist/${album.user.public_id}`} className='hover:text-white hover:underline'>{album.user.username}</Link>
                                </p>
                            </div>
                            </Link>
                        )) : <p>No albums found.</p>}
                        </div>
                    </div>
                 </>
             )}   


             {
                tabs === 'songs' && (
                    <div className="flex flex-col gap-0">
                        <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer text-white/95 font-NeueMontreal font-semibold pb-4">Songs</h2>
                        <div className="flex flex-col gap-3 w-full">
                        {results.tracks.length > 0 ? results.tracks.map(track => (
                            <div className="flex justify-between max-w-[700px]" key={track.id}>
                            <div className="flex items-center gap-2">
                                <img
                                src={`http://localhost:8000/storage/${track.cover_image}`}
                                alt={track.title}
                                className={`size-[50px] saturate-[1.2] mx-auto rounded-sm object-cover`}
                                />
                                <div className="flex flex-col gap-">
                                <p className="text-sm font-semibold">{track.title}</p>
                                <Link href={`/artist/${track.user?.public_id}`} className="text-sm hover:text-white hover:underline text-white/60">{track.user?.username}</Link>
                                </div>
                            </div>
                            <h5>{track.duration}</h5>
                            </div>
                        )) : null}
                        </div>
                    </div>
                )
             }


             {
                tabs === 'artists' && (
                    <>
                        <div className="flex flex-col gap-0">
                        <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold pb-1">Artists</h2>
                        <div className="grid-rows-[.63fr] gap-y-4 grid grid-cols-6 w-full gap-2">

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
                                            <h5 className="block mt-[.5px]  transition-transform duration-300 relative top-[1px]  group-hover:-translate-y-full ease-in-out">{artist.username} </h5>
                                            <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{artist.username} </h5>
                                        </div>
                                        <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">Artist</p>
                                        </Link>
                                    </div>
                            )) : <p>No artists found.</p>}

                        </div>

                    </div>
                    </>
                )
            }

            {
                tabs === 'albums' && (
                        <div className="flex flex-col gap-1">
                        <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer text-white/95 font-NeueMontreal font-semibold pb-2">Albums</h2>
                        <div className="relative -left-2 w-full grid grid-cols-8 gap-[2px]">
                        {results.albums.length > 0 ? results.albums.map(album => (
                            <Link href={`/album/${album.public_id}`} className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group flex-col gap-[6px]' key={album.id}>
                            <div className="relative">
                                <img className='h-[176px] w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${album.cover_image}`} alt={album.title} />
                                <span className="size-[45px] bottom-2 duration-200 ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                                <IoMdPlay />
                                </span>
                            </div>
                            <div className="flex flex-col gap-[2px]">
                                <Link href={`/artist/${album.public_id}`} className="h-[26px] relative inline-block overflow-hidden font-semibold tracking-wide mt-1 text-[16.5px] font-NeueMontreal text-white/90 capitalize text-lg">
                                <h5 className="block transition-transform duration-300 relative top-[0px] group-hover:-translate-y-full ease-in-out">{album.title}</h5>
                                <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{album.title}</h5>
                                </Link>
                                <p className='text-[12px] capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>
                                {new Date(album.release_date).getFullYear()} <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span>
                                <Link href={`/artist/${album.user.public_id}`} className='hover:text-white hover:underline'>{album.user.username}</Link>
                                </p>
                            </div>
                            </Link>
                        )) : <p>No albums found.</p>}
                        </div>
                    </div>
                )
            }


            </div>
          </>
        )}
      </div>
    </div>
  );
}