'use client'
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/Logo/Studyo_white.svg';
import { useAppHook } from '@/context/AppProvider';
import { useRouter } from 'next/navigation';
import { IoChevronDown } from "react-icons/io5";
import { PiCopyThin } from 'react-icons/pi';
import { MdSettings } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IoAlbumsSharp } from "react-icons/io5";
import { PiMusicNotesPlusFill } from "react-icons/pi";
import { RiPlayListAddFill } from "react-icons/ri";
import { GoChevronRight } from "react-icons/go";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";


const Aside = () => {
    // const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authToken, user} = useAppHook();
    const router = useRouter();

    //  useEffect(() => {
    
    //     axios.get('http://localhost:8000/api/user/profile', {
    //       headers: { Authorization: `Bearer ${authToken}` },
    //     })
    //       .then(res => {
    //         setUser(res.data);
            
    //         setLoading(false);
    
    //     })
           
    //   }, []);

  return (

    <>
      <div className='h-full flex flex-col justify-between'>
        <div className="flex flex-col gap-4">

          <div className="flex group leading-snug  duration-200 ease-in-out cursor-pointer  flex-col gap-0 ">
            

          <div className="size-[210px] p-1 shadow-md bg-[#222222] rounded-full flex-center">
              {
                  user?.profile_image ?  <img className='size-full rounded-full saturate-[1.3]  object-cover' src={`http://localhost:8000${user.profile_image}`} onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/Hand.jpg'; 
              }} alt="" />
                      : <span className='size-full bg-white text-black rounded-full flex-center font-bold  text-[16px]'>{user.username.charAt(0).toUpperCase()}</span>
                  
              }

          </div>

          <div className="flex gap-[2px] flex-col">
              <div className=" h-[26px]  relative inline-block  overflow-hidden font-NeueMontreal font-semibold mt-3 text-[16px] text-white capitalize text-lg">
                  <h5 className="block mt-[.5px]  transition-transform duration-300 relative top-[1px]  group-hover:-translate-y-full ease-in-out">{user.username} <img className='inline-flex ml-[.5px] mb-[1px] w-[14px]' src="/check.png" alt="" /></h5>
                  <h5 className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">{user.username} <img className='inline-flex ml-[.5px] mb-[1px] w-[14px]' src="/check.png" alt="" /></h5>
                </div>
                <p className="text-[12px] w-full flex items-center gap-4 capitalize font-normal font-NeueMontreal relative -top-[2px] text-white/75">{user.public_id} <PiCopyThin/></p>
          </div>

          </div>

          <div className="pt-10 flex-col flex w-full ">

            <p className=' text-green-500 pb-3 cursor-pointer text-[12px] uppercase font-NeueMontreal font-medium'>Your Library</p>
            
            <Link href={'/Library/Create_album'} className="w-full relative group py-3 ] flex justify-between items-center">
                <p className='flex gap-[14px]  text-white cursor-pointer text-[16.5px] font-NeueMontreal  font-medium items-center'><IoAlbumsSharp className='relative -top-[1px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out group-hover:drop-shadow-lg group-hover:drop-shadow-green-500' size={24}/>Albums</p>
                <span className='text-[15px] size-4 flex-center'><AiOutlinePlus/></span>
                <div className="absolute group-hover:opacity-100 opacity-0 transition-all duration-200 ease-in-out -top-1.5 bg-main2 px-3 py-[2px]  -right-6 font-semibold text-[12px]">create</div>
            </Link>
            <Link href={'/Library/Create_track'} className="w-full relative group flex justify-between items-center py-3 ">
                <p className='flex gap-[14px]  text-white cursor-pointer text-[16.5px] font-NeueMontreal  font-medium items-center'><PiMusicNotesPlusFill className='relative -top-[1px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out group-hover:drop-shadow-lg group-hover:drop-shadow-green-500' size={24}/>Track</p>
                <span className='text-[15px] size-4 flex-center'><AiOutlinePlus/></span>
                <div className="absolute group-hover:opacity-100 opacity-0 transition-all duration-200 ease-in-out -top-1.5 bg-main2 px-3 py-[2px]  -right-6 font-semibold text-[12px]">create</div>
            </Link>
            <div className="w-full relative group flex justify-between items-center py-3 ">
                <p className='flex gap-[17px]  text-white cursor-pointer text-[16.5px] font-NeueMontreal  font-medium items-center'><RiPlayListAddFill className='relative group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out group-hover:drop-shadow-lg group-hover:drop-shadow-green-500 -top-[1px]' size={23}/>Playlist</p>
                <span className='text-[15px]  flex-center'><AiOutlinePlus/></span>
                <div className="absolute group-hover:opacity-100 opacity-0 transition-all duration-200 ease-in-out -top-1.5 bg-main2 px-3 py-[2px]  -right-6 font-semibold text-[12px]">create</div>
            </div>


          </div>
              
        </div>

        
        <div className="w-full group flex justify-between items-center">
          <p className='flex gap-[12px]  text-white cursor-pointer text-[16.5px] font-NeueMontreal  font-medium items-center'><MdSettings className='relative group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out group-hover:drop-shadow-lg group-hover:drop-shadow-green-500 -top-[1px]' size={25}/>Settings</p>
          <span className='text-[17px]  flex-center'><GoChevronRight/></span>

        </div>

        {/* <GoChevronRight/> */}


            
      </div>
    </>
  )
}

export default Aside

{/* <p className=' text-white cursor-pointer text-[12px] uppercase font-NeueMontreal font-medium'>Your Library</p> */}
