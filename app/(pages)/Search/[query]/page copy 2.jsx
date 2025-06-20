import axios from 'axios';
import Link from 'next/link';
import { IoMdPlay } from 'react-icons/io';
import { PiSealCheckFill } from 'react-icons/pi';

export const metadata = {
    title: "Search — 𝗦𝘁ü𝗱𝘆𝗼 ",
}

export default async function SearchResults({ params }) {
  const query = decodeURIComponent(params.query);

  let results = [];

  try {
    const res = await axios.get(`http://localhost:8000/api/search?q=${query}`, {
      withCredentials: true,
    });
    results = res.data;
  } catch (err) {
    console.error('Search failed', err);
  }


    // if (!results.tracks.length && !results.albums.length && !results.artists.length) return <p className="text-white min-h-screen">No results found for "{query}"</p>

  return (
    <div className="py-[190px] bg-black h-auto min-h-screen text-white">
        <div className="container ">

            {
                !results.tracks.length && !results.albums.length && !results.artists.length ? <p className="cursor-pointer w-fit  font-NeueMontreal  text-white/60 font-bold leading-tight  tracking-[0.015em] text-[50px]">No results found for "{query}"</p> : (
                        <>
                        {/* <h1 className="text-2xl pb-2 font-bold mb-4">Results for "{query}"</h1> */}
                        {/* <div className="link-wrapper  h-[65px]  cursor-pointer w-fit  font-NeueMontreal  text-white/60 font-bold leading-tight  tracking-[0.015em] text-[50px]">
                            <h1 className=' link-text '>Results for "{query}"</h1>
                            <h1 className=' link-text-clone '>Results for "{query}" </h1>
                        </div> */}
                        <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] '>Results for "{query}" </h1>

                        <div className="flex py-5 gap-3 items-center">
                            <p className={`text-[13px] cursor-pointer duration-200 ease-in-out py-[5px]  text-main2 bg-white capitalize px-4 rounded-full `}>All</p>
                            <p  className={`text-[13px] duration-200 cursor-pointer ease-in-out py-[5px] bg-main2/60 backdrop-blur-2xl text-white capitalize px-4 rounded-full `}>Songs</p>
                            <p  className={`text-[13px] duration-200 ease-in-out cursor-pointer py-[5px] bg-main2/60 backdrop-blur-2xl text-white capitalize px-4 rounded-full `}>Artists</p>
                            <p  className={`text-[13px] duration-200 ease-in-out cursor-pointer py-[5px] bg-main2/60 backdrop-blur-2xl text-white capitalize px-4 rounded-full `}>Albums</p>
                            <p  className={`text-[13px] duration-200 ease-in-out cursor-pointer py-[5px] bg-main2/60 backdrop-blur-2xl text-white capitalize px-4 rounded-full `}>Playlist</p>
                            <p  className={`text-[13px] duration-200 ease-in-out cursor-pointer py-[5px] bg-main2/60 backdrop-blur-2xl text-white capitalize px-4 rounded-full `}>Podcats</p>
                        </div>
                        

                        <div className="flex pt-7 flex-col gap-12 w-full h-auto">

                            <div className="flex flex-col gap-0">
                                <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold pb-4">Songs</h2>
                                <div className="flex flex-col gap-3 w-full ">
                                    {results.tracks.length > 0 ? results.tracks.slice(0, 6).map(track => (
                                        <div className="flex justify-between max-w-[700px] " key={track.id}>

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
                                            
                                            <h5>
                                                {track.duration}
                                            </h5>
                                            
                                        </div>
                                    )) : null}
                                </div>
                            </div>


                            <div className="flex flex-col gap-0">
                                <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold pb-1">Artists</h2>
                                <div className="grid-rows-[.63fr] gap-y-4 grid grid-cols-6 w-full gap-2">

                                    {results.artists.length > 0 ? results.artists.slice(0, 6).map(artist => (
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

                            <div className="flex flex-col gap-1">
                                    <h2 className="text-[26px] hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold pb-2">Albums</h2>
                                <div className=" relative -left-2 w-full  grid grid-cols-8 gap-[2px]">
                                    {results.albums.length > 0 ? results.albums.map(album => (
                                        <div key={album.id}>
                                                
                                                <div className="relative ">
                                                    <img className='h-[176px]  w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${album.cover_image}`} alt={album.title} />
                                                    <span className="size-[45px] bottom-2 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                                                    <IoMdPlay />
                                                    </span>
                                
                                                </div>
                                
                                                <div className="flex flex-col gap-[2px]">
                                                <Link  href={`/album/${album.public_id}`} className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group  flex-col gap-[6px]' className=" h-[26px]  relative inline-block   overflow-hidden font-semibold tracking-wide mt-1 text-[16.5px] font-NeueMontreal text-white/90 capitalize text-lg">
                                                    <h5 className="block transition-transform duration-300 relative top-[0px]  group-hover:-translate-y-full ease-in-out">{album.title}</h5>
                                                    <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{album.title}</h5>
                                                </Link>
                                
                                                <p className='text-[12px] capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>
                                                    {new Date(album.release_date).getFullYear()} <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span>
                                                    <Link href={`/artist/${album.user.public_id}`}  className='hover:text-white hover:underline'>{album.user.username}</Link> 
                                                 </p>
                                
                                                </div>
                                
                                            </div>
                                            
                                            
                                    )) : <p>No albums found.</p>}
                                </div>

                            </div>




                        </div>
                        </>
                )
            }

        </div>
    </div>
  );
}
