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


const UploadProfileImageButton2 = () => {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const { authToken} = useAppHook();

  return (

    <>
    
    
      <div className="cursor-pointer relative bg-main/15 text-[18px]  text-white/80 hover:text-white size-12 group rounded-full flex-center backdrop-blur-xl duration-200 ease-in-out  transition"><IoPlayOutline /> <span className="absolute group-hover:opacity-100 opacity-0 duration-200 ease-in-out text-[11px] font-NeueMontreal w-[80px] flex-center  bg-main/15  py-1  -top-10 backdrop-blur-2xl scale-95 left-1/2 -translate-x-1/2">Play Music</span></div>

  
    </>
  );
};

export default UploadProfileImageButton2;
