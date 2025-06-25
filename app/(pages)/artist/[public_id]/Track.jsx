'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useAppHook } from '@/context/AppProvider';
import { IoMdAdd, IoMdPause } from "react-icons/io";
import PopularTracks from '@/SmallComponent/PopularTracks';
import { BiSolidHot } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoMdPlay } from "react-icons/io";
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAudio } from '@/context/AudioProvider';
import AddToPlaylistButton from '@/SmallComponent/AddToPlaylistButton';
// import AddToPlaylistForm from '@/Component/AddToPlaylistForm';
// import AddToPlaylistModal from '@/Component/AddToPlaylistModal';
import PlaylistPage from '@/lib/PlaylistMOdel';


const Track = ({owner}) => {
  const [tracks, setTracks] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const { public_id } = useParams(); 
  const { authToken} = useAppHook()
   const [allTracks, setAllTracks] = useState([])
   const [showAll, setShowAll] = useState(false);
   const [hover, setHover] = useState(false);
   const { playTrack, isPlaying, togglePlay, currentTrack} = useAudio();

   const popularTracks = tracks.filter(track => track.is_popular).slice(0, 5);
  const tracksToShow = showAll ? tracks.filter(track => track.is_popular) : popularTracks;

  


  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/${public_id}/tracks`, {
        });
        setTracks(res.data);
        // setShowModal(true);
      } catch (err) {
        console.error('❌ Failed to fetch tracks', err);
      }
    };

    fetchTracks();
  }, [public_id]);


    // const play = (track) => playTrack({
    //   id: track.id,
    //   title: track.title,
    //   artist: 'null',
    //   cover: `http://localhost:8000/storage/${track.cover_image}`,
    //   src: `http://localhost:8000/storage/${tracks.file_path}`
    // })
      







  const togglePopular = async (trackId) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/tracks/${trackId}/toggle-popular`, {}, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setTracks(prev =>
        prev.map(track =>
          track.id === trackId ? { ...track, is_popular: res.data.is_popular } : track
        )
      );
    } catch (err) {
        if (err.response?.status === 403) {
          toast.error("You can only mark up to 10 tracks as Popular");
        } else {
          console.error("Failed to toggle popular:", err);
          toast.error("Something went wrong");
        }
      }
  }





 

  return (

    <>
        <div className='w-full  pt-11 grid grid-cols-[1.6fr_1fr] gap-[60px]'>
            <div className="flex flex-col gap-6">
                <h1 className='text-2xl flex items-center gap-8 text-white font-NeueMontreal font-semibold'>Popular Tracks {owner && <span onClick={()=> setShowModal(true)}  className='text-[12px] scale-90 flex items-center  cursor-pointer bg-red-500 w-[65px] justify-center gap-[2px] px-1 pr-3 py-1 rounded-full' ><IoMdAdd size={20}/> add</span>}</h1>

                {tracks.length === 0 ? (
                    <p>No popular tracks yet.</p>
                  ) : (
                    <ul className="">
                      
                      {tracksToShow.map((track , i) => (
                        <div  className={`w-full group py-2 ${isPlaying && currentTrack.id === track.id ? 'bg-main2/60' : 'hover:bg-main2/60'} px-3 rounded  grid grid-cols-[1fr_.7fr_auto] items-center justify-between`} key={track.id}>
                            <div   className="flex items-center gap-4">
                                <span onClick={ () => playTrack({
                                      id: track.id,
                                      title: track.title,
                                      artist: track.user.username,
                                      cover: `http://localhost:8000/storage/${track.cover_image}`,
                                      src: `http://localhost:8000/storage/${track.file_path}`
                                    })} className={`text-[#d7d7d7] cursor-pointer relative text-[16px] font-semibold   w-[20px]`}> 
                                   <IoMdPlay   className={` ${isPlaying && currentTrack.id === track.id ? 'opacity-100 text-green-500' : 'opacity-0 group-hover:opacity-100'} absolute -left-[3px] top-1/2 -translate-y-1/2 `} size={16} /> <p className={`${isPlaying && currentTrack.id === track.id ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}>{ i + 1}</p>  </span>
                                {/* <span className={`text-[#d7d7d7] text-[16px] font-semibold   w-[20px]`}>{hover ? <IoMdPlay className='' size={15} /> : i + 1}  </span> */}
                                <img
                                src={`http://localhost:8000/storage/${track.cover_image}`}
                                alt={track.title}
                                className="size-11 saturate-150 object-cover rounded-sm"
                              />
                                <span className="font-medium text-[#fff]/90  text-[16px]">{track.title}</span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* <span className="font-medium text-[#fff] font-NeueMontreal text-[16px]">{track.user.username}</span> */}
                                <span className="font-medium text-[#fff]/90 text-[16px]"><span className=''></span>{track.album.title}</span>
                            </div>

                            <div className="flex gap-3 items-center">
                              {/* <IoIosAddCircleOutline onClick={() => setShowModal2(true)}  className=' text-[17px] relative right-2 opacity-0 group-hover:opacity-100 '/> */}
                              {/* <AddToPlaylistButton trackId={track.id}/> */}
                              <PlaylistPage/>
                              <p>{track.duration}</p>
                              <HiOutlineDotsHorizontal  className=' text-[17px] opacity-0 group-hover:opacity-100 '/>
                              {/* <AddToPlaylistForm trackId={track.id} userId={track.user.id} /> */}
                            </div>

                            

                           


                        </div>
                      ))}
                    </ul>
                  )}

                  {tracks.length > 5 && (
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="mt-1  w-fit text-left text-sm text-[#d7d7d7] hover:text-white cursor-pointer font-NeueMontreal font-semibold"
                    >
                      {showAll ? 'Show Less' : 'Show All'}
                    </button>
                  )}
            </div>
            
            <div className="flex flex-col gap-6">
                <h1 className='text-2xl text-white font-NeueMontreal font-semibold'>Latest Releases</h1>

                {tracks.length === 0 ? (
                    <p>No tracks yet.</p>
                  ) : (
                    <ul className="pt-0">
                      {tracks.slice(0, 2).map((track) => (
                        <div className={`w-full  relative ${isPlaying && currentTrack.id === track.id ? 'bg-main2/60' : 'hover:bg-main2/60'}  bg-transparent rounded-md px-2  flex justify-between py-2 group  `} key={track.id}>
                          <div className="flex items-center gap-5">
                            <img
                              src={`http://localhost:8000/storage/${track.cover_image}`}
                              alt={track.title}
                              className="size-[130px] saturate-150 object-cover rounded-sm"
                            />
                            <div className="flex flex-col gap-1">
                              <span className=" font-NeueMontreal font-semibold  text-[#fff] text-[21px]">{track.title}</span>
                              <p className='flex text-[14px] font-medium font-NeueMontreal  items-center gap-2 '>
                                By
                                <img
                                src={`http://localhost:8000/${track.user.profile_image}`}
                                alt={track.title}
                                className="size-[25px] rounded-full saturate-150 object-cover "
                              />
                                <span className='text-white font-semibold'>{track.user.username}</span></p>
                              <span className="flex pt-2 gap-[6px] items-center text-[12px] font-NeueMontreal font-semibold text-[#fff]/80 ">Album <span className='size-1 rounded-full bg-white/50'> </span><Link href={`/album/${track.album.public_id}`}>{track.album.title}</Link></span>
                            </div>
                          </div>

                          <div className="flex absolute bottom-4 right-4  gap-4 items-center">
                              {/* <IoIosAddCircleOutline /> */}
                              <span onClick={ () => playTrack({
                                id: track.id,
                                title: track.title,
                                artist: track.user.username,
                                cover: `http://localhost:8000/storage/${track.cover_image}`,
                                src: `http://localhost:8000/storage/${track.file_path}`
                              })} className={`size-10 text-[15px] rounded-full  flex-center ${isPlaying && track.id === currentTrack.id ? 'bg-green-500' : 'bg-white'}  text-main2`}>{isPlaying && track.id === currentTrack.id ? <IoMdPause onClick={()=> togglePlay()} /> : <IoMdPlay />}</span>
                              {/* <HiOutlineDotsHorizontal  size={20}/> */}
                          </div>
                        </div>
                      ))}
                    </ul>
                  )}
            </div>
        </div>


        <>
          {showModal && (
              <div   className='w-full fixed bottom-0 left-0 flex-center bg-black/50  min-h-screen z-[600]'>
              <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: .25, delay: .1, ease: 'easeInOut' }}  className="fixed bottom-0 py-2  h-full  w-full flex bg-main2 justify-center">
                <div className=" container pb-20  w-full h-full ">


                {tracks.length === 0 ? (
                  <div className="w-full pb-9 items-start flex justify-between">
                  <div className="flex flex-col gap-4">
                    <p className='text-3xl  flex items-center gap-8 text-white font-NeueMontreal font-semibold'>No  tracks yet.</p>
                    <Link className=' bg-white text-main2 w-fit px-4 py-2 rounded-full font-NeueMontreal font-medium text-[14px] hover:text-green-600 ' href={'/Create/Track'}>Upload Tracks</Link>


                  </div>

                    <button onClick={() => setShowModal(false)} className=" text-[19px] font-NeueMontreal font-bold relative top-2 hover:text-red-600 ">Close</button>
                  </div>
                  ) : (
                    <>
                      <div className="w-full pb-9 flex justify-between">
                      <h2 className="text-3xl  flex items-center gap-8 text-white font-NeueMontreal font-semibold">Select Your Popular Tracks</h2>
                      <button onClick={() => setShowModal(false)} className=" text-[19px] font-NeueMontreal font-bold hover:text-red-600 ">Close</button>

                      </div>
                      <ul className="w-full pb-[100px] grid grid-cols-7 gap-5 text-white">
                        {tracks.map(track => (
                          <li onClick={() => togglePopular(track.id)} key={track.id} className="flex h-[212px] w-full  overflow-hidden flex-col relative gap-2 ">


                              <img
                                src={`http://localhost:8000/storage/${track.cover_image}`}
                                alt={track.title}
                                className="w-full h-full object-cover "
                              />

                              <div className="absolute top-0 left-0 size-full bg-gradient-to-b from-transparent capitalize via-[#000]/30 to-[#000]/70"></div>

                              <span className='text-white text-[14px] absolute bottom-2 left-2 font-NeueMontreal font-semibold'>{track.title}</span>
                              <div className={`absolute ${track.is_popular ? 'bg-white' : 'bg-transparent'} bottom-3 right-2 size-4 rounded-full border-[.5px] border-white`}></div>
                            
                            
                          </li>
                        ))}
                      </ul>
                    </>
                    )}
                    
                  
                </div>
              </motion.div>

              </div>
          
            )}
          </>


            






    
    </>
  )
}

export default Track
