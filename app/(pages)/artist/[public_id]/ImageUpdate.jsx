'use client';
import { useState } from 'react';
import axios from 'axios';
import { useAppHook } from '@/context/AppProvider';
import toast from 'react-hot-toast';
import { FiEdit2 } from "react-icons/fi";
import { IoCheckmarkSharp, IoPlayOutline } from "react-icons/io5";
import { PiCopySimpleThin } from "react-icons/pi";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Edit2 } from 'lucide-react';
import EditModel from '@/Component/EditModel';
import CopyLinkButton from '@/Component/CopyLinkButton';
import { IoAddSharp } from "react-icons/io5";
import { useAudio } from '@/context/AudioProvider';
import { PiPauseThin } from "react-icons/pi";
import Link from 'next/link';


const UploadProfileImageButton = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const { playTrack, isPlaying, togglePlay} = useAudio();

  const playMusic = () => {
    playTrack({
      id: 1,
      title: 'The Mute Girl',
      artist: "Yann Tiersen",
      cover: '/images/img32.jpg',
      src: '/girl.mp3'
    })
  }



  const { authToken, user: currentUser } = useAppHook();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true, // for Sanctum
      });

      toast.success('Image uploaded successfully');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
    
      <div  onClick={()=> (isPlaying ? togglePlay() : playMusic())} className="cursor-pointer relative bg-main/15 text-[18px]  text-white/80 hover:text-white size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out  transition">{isPlaying ?<PiPauseThin /> : <IoPlayOutline /> }<span className="absolute group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[80px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/2 -translate-x-1/2">Play Music</span></div>
      <Link href="/Create"  className="cursor-pointer relative bg-main/15 text-[18px]  text-white/80 hover:text-white size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out  transition"><IoAddSharp /> <span className="absolute group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[80px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/2 -translate-x-1/2">Your Library</span></Link>
      
      <EditModel />

      <div className="flex relative w-fit  flex-col items-center gap-4 ">

        <label className="cursor-pointer relative bg-main/15 text-[18px]  text-white/80 hover:text-white size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out   ">
          {loading ? <IoCheckmarkSharp className='text-green-700'/> : <AiOutlineCloudUpload size={20}/>}

          <span className="absolute group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[112px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/3 -translate-x-1/2">Upload Profile Image</span>
          
          {/* {loading ? 'Uploading...' : 'Upload Profile Image'} */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </label>
        {successMsg && <p className="text-sm text-gray-700">{successMsg}</p>}
      </div>
    </>
  );
};

export default UploadProfileImageButton;
