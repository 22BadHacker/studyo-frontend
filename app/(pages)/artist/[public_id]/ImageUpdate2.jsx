'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';
import { IoCheckmarkSharp, IoPlayOutline } from "react-icons/io5";
import { PiCopySimpleThin, PiPauseThin } from "react-icons/pi";

import { IoAddSharp } from "react-icons/io5";
import { useAudio } from '@/context/AudioProvider';
import { useParams } from 'next/navigation';


const UploadProfileImageButton2 = () => {
  const [tracks, setTracks] = useState([]);
  const { public_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // const { authToken} = useAppHook();
  const { playTrack, isPlaying, togglePlay, setQueue} = useAudio();

  // const playMusic = () => {
  //   playTrack({
  //     id: 1,
  //     title: 'The Mute Girl',
  //     artist: "Yann Tiersen",
  //     cover: '/images/img32.jpg',
  //     src: '/girl.mp3'
  //   })
  // }


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


    const handlePlayAll = () => {
    const formattedQueue = tracks.map(track => ({
     id: track.id,
      title: track.title,
      artist: track.user.username,
      cover: `http://localhost:8000/storage/${track.cover_image}`,
      src: `http://localhost:8000/storage/${track.file_path}`
    }))

    setQueue(formattedQueue)             // Set all tracks in queue
    playTrack(formattedQueue[0])         // Start playing the first one
  }





  return (

    <>
    
    
      <div  onClick={handlePlayAll} className="cursor-pointer relative bg-main/15 text-[18px]  text-white/80 hover:text-white size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out  transition">{isPlaying ?<PiPauseThin /> : <IoPlayOutline /> }<span className="absolute group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[80px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/2 -translate-x-1/2">Play Music</span></div>
      {/* <div  onClick={()=> (isPlaying ? togglePlay() : playMusic())} className="cursor-pointer relative bg-main/15 text-[18px]  text-white/80 hover:text-white size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out  transition">{isPlaying ?<PiPauseThin /> : <IoPlayOutline /> }<span className="absolute group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[80px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/2 -translate-x-1/2">Play Music</span></div> */}

  
    </>
  );
};

export default UploadProfileImageButton2;
