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
import { useAppHook } from '@/context/AppProvider'



const Album = () => {
  const { public_id } = useParams()
  const [album, setAlbum] = useState(null)
  const [hover, setHover] = useState(false);
   const { playTrack, isPlaying, togglePlay, setQueue, currentTrack} = useAudio();
  const [moreAlbums, setMoreAlbums] = useState([])
  const {authToken} = useAppHook()
  

  useEffect(() => {
    if (public_id) {
      axios.get(`http://localhost:8000/api/albums/${public_id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
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
    <div className="absolute w-full h-[610px] top-0 left-0">
        <img className='w-full saturate-[1.5] opacity-90  h-full object-center  object-cover ' src={`/images/img21.jpg`} alt="" />
        <div className="w-full  z-[6]   bg-gradient-to-b from-black/0  via-[#000000]/95 to-[#000000]/100 absolute top-0 left-0 h-full" />
    </div>

    <div className="text-white relative pt-[60px] relative z-20">

      <div className="w-full flex justify-between items-end">
        <div className="flex gap-5 items-end">
          <img className='size-[250px] saturate-[1.2] border-white/10 shadow-2xl border-[.5px] rounded-md' src={`http://localhost:8000/storage/${album.cover_image}`} alt="" />
          <div className="flex flex-col">
            <h5 className='text-white/85 pb-2  capitalize tracking-wide font-NeueMontreal text-[14px]'>Album</h5>
            <h1 className="text-[92px] mix-blend-difference line-clamp-2  mb-7 max-w-[800px]  capitalize leading-[.9]  font-NeueMontreal  text-white    font-bold">{album.title}</h1>
           
            <div className="flex gap-1 items-center">
                <img className='size-[27px]  rounded-full  object-cover ' src={`http://localhost:8000/${album.user.profile_image}`} alt="" />
                <Link href={`/artist/${album.user.public_id}`} className='text-white/95 hover:underline  font-semibold capitalize tracking-wide font-NeueMontreal text-[14px]'>{album.user.username} </Link>
                <span className='size-1 relative top-[2px]  rounded-full bg-white/80'></span>
                <div className="text-white/80  font-medium  tracking-wide font-NeueMontreal text-[13.5px]">{new Date(album.release_date).getFullYear()}</div>
                <span className='size-1 relative top-[2px]  rounded-full bg-white/80'></span>
                <h4 className='text-white/80 flex items-end gap-1  font-medium  tracking-wide font-NeueMontreal text-[13.5px]'>  {album.tracks.length} songs </h4>
            </div>
          </div>

        </div>

       <div className="flex pt-6 text-[13px] relative w-fit items-center gap-4">
              
                <div  onClick={()=> (isPlaying ? togglePlay() : handlePlayAll())} className="cursor-pointer relative text-main2 text-[19px]  bg-green-500  size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out  transition">{isPlaying ?<IoPauseSharp size={22}/> : <IoPlaySharp /> }<span className="absolute text-white group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[80px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/2 -translate-x-1/2">Play Music</span></div>
              {/* <div className="px-6 py-2 text-main2 rounded-full bg-green-500">Play All</div> */}
              <div className="px-6 font-NeueMontreal text-[14.5px] font-medium py-3 text-main rounded-full bg-main2">Shuffle</div>
              <div className="px-6 font-NeueMontreal text-[14.5px] font-medium py-3 text-main rounded-full bg-main2">Save</div>
          </div>

      </div>


      <div className="">
        <div className="flex flex-col gap-3">
            <h2 className=" pt-[75px] pb-2 cursor-pointer w-fit  font-NeueMontreal capitalize leading-[.85]   text-[#fff] font-[600] tracking-[0.015em] text-[1.5vw] ">Album Songs</h2>

            
                  <ul className="w-full grid grid-cols-2 gap-x-10 gap-y-2 pt-4">
                    {album.tracks.map((track, i) => (
                      <div className={`w-full p-1 relative rounded-md h-fit group ${isPlaying && currentTrack.id === track.id ? 'bg-main2/60' : ''} hover:bg-main2/60   flex items-center justify-between gap-3  `} key={track.id}>

                        <div className="flex gap-2 items-center">

                          <div className="size-[50px] flex-center rounded overflow-hidden relative">
                              <img
                                src={`http://localhost:8000/storage/${track.cover_image}`}
                                
                                className="size-full   saturate-150 object-cover"
                              />

                              <span onClick={ () => playTrack({
                                    id: track.id,
                                    title: track.title,
                                    artist: album.user.username,
                                    cover: `http://localhost:8000/storage/${track.cover_image}`,
                                    src: `http://localhost:8000/storage/${track.file_path}`
                                })}  className={`text-white bg-black/50 top-0 left-0 absolute size-full  cursor-pointer flex-center  text-[18px] ${isPlaying && currentTrack.id === track.id ? 'opacity-100 text-green-500' : 'opacity-0 group-hover:opacity-100'} flex-center font-semibold  mr-1`}><IoMdPlay /> </span>
                          </div>


                            <div className="flex flex-col leading-snug">
                                <p className={`${isPlaying && currentTrack.id === track.id ? 'text-green-500' : ''} font-NeueMontreal font-semibold text-[15px] ${isPlaying && currentTrack.id === track.id ? 'text-green-500' : ''}`}>{track.title}</p>
                                <Link href={`/artist/${album.user.public_id}`} className="flex hover:underline hover:text-white items-center gap-4">
                                    <span className="font-normal text-[#fff]/80 font-NeueMontreal text-[14px]">{album.user.username}</span>
                                </Link>
                            </div>
                        </div>


                        <div className="flex gap-3 items-center">
                          <IoIosAddCircleOutline  className=' text-[17px] relative right-2 opacity-0 group-hover:opacity-100 '/>
                          <p>{track.duration}</p>
                          <HiOutlineDotsHorizontal  className=' text-[17px] opacity-0 group-hover:opacity-100 '/>
    
                        </div>
                        



                          
                      </div>
                    ))}
                  </ul>

        </div>
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
