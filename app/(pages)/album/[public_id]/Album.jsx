'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { IoIosAddCircleOutline, IoMdPlay } from 'react-icons/io'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import Link from 'next/link'
import { useAudio } from '@/context/AudioProvider';
import { PiShuffleLight } from "react-icons/pi";
import { IoPauseSharp, IoPlaySharp } from 'react-icons/io5'



const Album = () => {
  const { public_id } = useParams()
  const [album, setAlbum] = useState(null)
  const [hover, setHover] = useState(false);
   const { playTrack, isPlaying, togglePlay, setQueue, currentTrack} = useAudio();
  const [moreAlbums, setMoreAlbums] = useState([])
  
  

  useEffect(() => {
    if (public_id) {
      axios.get(`http://localhost:8000/api/albums/${public_id}`)
        .then(res => {
          setAlbum(res.data.album)
          setMoreAlbums(res.data.more_albums)
        })
        .catch(err => console.error(err))
    }
  }, [public_id])


   const handlePlayAll = () => {
    const formattedQueue = album.tracks.map(track => ({
     id: track.id,
      title: track.title,
      artist: album.user.username,
      cover: `http://localhost:8000/storage/${track.cover_image}`,
      src: `http://localhost:8000/storage/${track.file_path}`
    }))

    setQueue(formattedQueue)             // Set all tracks in queue
    playTrack(formattedQueue[0])         // Start playing the first one
  }

 

 




//   if (!album) return <p className="text-white">Loading...</p>
if (!album) return <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;

  return (
    <>
    <div className="absolute w-full h-screen top-0 left-0">
        <img className='w-full saturate-[1.2] opacity-65 h-full  object-cover ' src={`http://localhost:8000/storage/${album.cover_image}`} alt="" />
        <div className="w-full  z-[6]   bg-gradient-to-b from-black/50 via-[#000000]/100 to-[#000000]/100 absolute top-0 left-0 h-full" />
    </div>

    <div className="text-white  pt-[60px] relative z-20">

      <div className="w-full flex justify-between items-end">
        <div className="flex gap-5 items-end">
          <img className='size-[250px] rounded-md' src={`http://localhost:8000/storage/${album.cover_image}`} alt="" />
          <div className="flex flex-col">
            {/* <h5 className='text-white/80  font- uppercase tracking-wide font-NeueMontreal text-[13px]'>Album</h5> */}
            <h1 className="text-[72px] max-w-[800px] pb-2 capitalize leading-[1.05]  font-NeueMontreal  text-white  flex gap-3 items-center  font-bold">{album.title}</h1>
            <div className="flex pb-7 font-NeueMontreal items-center gap-3">
              <div className="size-10  bg-green-500/50 rounded-full p-[1px]">
                <img className='size-full  rounded-full  object-cover ' src={`http://localhost:8000/${album.user.profile_image}`} alt="" />

              </div>
                
                <Link href={`/artist/${album.user.public_id}`} className='text-white/80 hover:underline  font-semibold capitalize tracking-wide font-NeueMontreal text-[13px]'>{album.user.username} </Link>
            </div>

            
            <h4 className='text-white/80 flex items-center gap-[6px] uppercase pb-1  font-medium  tracking-wide font-NeueMontreal text-[12px]'>Album <span className='size-1  rounded-full bg-white'></span> {album.tracks.length} songs <span className='size-1  rounded-full bg-white'></span>{album?.release_date ? (
                <p>{new Date(album.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              ) : (
                <p>Unknown Release Date</p>
              )}</h4>
            {/* <h4 className='text-white/80 flex items-end gap-1  font-medium  tracking-wide font-NeueMontreal text-[13px]'>Album <span className='size-1 mb-1 rounded-full bg-white'></span> {album.tracks.length} songs </h4> */}
            {/* <p className='text-white/80 uppercase flex items-end gap-1  font-medium  tracking-wide font-NeueMontreal text-[12px] pt-1'>{formattedDate}</p> */}


         
          </div>

        </div>

       <div className="flex pt-6 text-[13px] relative w-fit items-center gap-4">
              
                <div  onClick={()=> (isPlaying ? togglePlay() : handlePlayAll())} className="cursor-pointer relative text-main2 text-[19px]  bg-green-500 hover:text-white size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out  transition">{isPlaying ?<IoPauseSharp size={22}/> : <IoPlaySharp /> }<span className="absolute group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[80px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/2 -translate-x-1/2">Play Music</span></div>
              {/* <div className="px-6 py-2 text-main2 rounded-full bg-green-500">Play All</div> */}
              <div className="px-6 py-2 text-main rounded-full bg-main2">Shuffle</div>
              <div className="px-6 py-2 text-main rounded-full bg-main2">Save</div>
          </div>

      </div>

      


            <h2 className="text-2xl pt-[60px] hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">Album Songs</h2>

            <div className="grid grid-cols-[1fr_.7fr_auto] pb-2 pt-5 border-b-[.5px] border-white/40 items-center px-4 justify-between">
              <span className=" flex gap-4 uppercase items-center text-[#fff]/70 font-semibold  text-[13px]"><span>#</span> Title</span>
              <span className=" flex relative -left-[14px] gap-4 uppercase items-center text-[#fff]/70 font-semibold  text-[13px]">Artist</span>
              <span className=" flex gap-4 uppercase items-center text-[#fff]/70 font-semibold  text-[13px]">Duration</span>
            </div>
        <div className="">
            <ul className="space-y-2 pt-1">
              {album.tracks.map((track, i) => (
                <div className={`w-full group py-2 ${isPlaying && currentTrack.id === track.id ? 'bg-main2/60' : ''} hover:bg-main2/60 px-3 rounded  grid grid-cols-[1fr_.7fr_auto] items-center justify-between`} key={track.id}>
                    <div className="flex items-center gap-4">
                        <span onClick={ () => playTrack({
                                    id: track.id,
                                    title: track.title,
                                    artist: album.user.username,
                                    cover: `http://localhost:8000/storage/${track.cover_image}`,
                                    src: `http://localhost:8000/storage/${track.file_path}`
                                })}  className={`text-[#d7d7d7]/70 relative cursor-pointer text-[16px] w-3 flex-center font-semibold  mr-1`}><IoMdPlay   className={` ${isPlaying && currentTrack.id === track.id ? 'opacity-100 text-green-500' : 'opacity-0 group-hover:opacity-100'} absolute -left-[3px] top-1/2 -translate-y-1/2 `} size={16} /> <p className={`${isPlaying && currentTrack.id === track.id ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>{ i + 1}</p> </span>
                        {/* <img
                        src={`http://localhost:8000/storage/${track.cover_image}`}
                        
                        className="size-11 saturate-150 object-cover rounded-sm"
                      /> */}
                        <span className={`font-medium ${isPlaying && currentTrack.id === track.id ? 'text-green-500' : ''} text-[#fff]/95  text-[16.5px]`}>{track.title}</span>
                    </div>

                    <Link href={`/artist/${album.user.public_id}`} className="flex hover:underline hover:text-white items-center gap-4">
                        <span className="font-medium text-[#fff] font-NeueMontreal text-[16px]">{album.user.username}</span>
                    </Link>

                    <div className="flex gap-3 items-center">
                      <IoIosAddCircleOutline  className=' text-[17px] relative right-2 opacity-0 group-hover:opacity-100 '/>
                      <p>{track.duration}</p>
                      <HiOutlineDotsHorizontal  className=' text-[17px] opacity-0 group-hover:opacity-100 '/>

                    </div>
                </div>
              ))}
            </ul>
        </div>
      

      <h2 className="text-2xl flex items-center gap-2 pt-20 pb-[6px] hover:underline ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold">More Album by <img  className='size-[32px] object-cover rounded-full' src={`http://localhost:8000/${album.user.profile_image}`}  alt="" /> {album.user.username}</h2>
      

        {moreAlbums.length > 0 ? (
        <div className=' relative -left-2 w-full  grid grid-cols-8 gap-[2px]'>
          {moreAlbums.map(album => (
            <Link href={`/album/${album.public_id}`} className='flex cursor-pointer rounded-md w-fit hover:bg-[#1f1f1f]/50 duration-200 ease-in-out p-2 group  flex-col gap-[6px]' key={album.id}>
              <div className="relative ">
                  <img className='h-[176px]  w-[190px] saturate-[1.4] rounded-sm object-cover' src={`http://localhost:8000/storage/${album.cover_image}`} alt={album.title} />
                  <span className="size-[45px] bottom-2 duration-200  ease-in-out group-hover:opacity-100 opacity-0 text-[18px] right-2 flex-center absolute bg-green-500 shadow-2xl backdrop-blur-[50px] text-[#222222] rounded-full">
                    <IoMdPlay />
                  </span>

              </div>

               <div className="flex flex-col gap-[2px]">
                
                  <h5 className="font-semibold line-clamp-2    tracking-wide leading-tight mt-1 text-[16.5px] font-NeueMontreal text-white capitalize text-lg">{album.title}</h5>

                <p className='text-[12.5px] pt-1 capitalize flex items-end gap-[3.5px] font-normal font-NeueMontreal relative -top-[2px] text-white/75'>{new Date(album.release_date).getFullYear()} <span className='bg-[#9d9d9d] relative -top-[5px] size-1 rounded-full'></span> album</p>

              </div>
              {/* <p className="text-[12px] capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">@{artist.username}</p> */}
            </Link>
          ))}
        </div>
      ) : (
        <p>No albums found</p>
      )}

          
    </div>
      
    </>
  )
}

export default Album
