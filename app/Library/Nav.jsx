'use client'
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/Logo/Studyo_white.svg';
import { useAppHook } from '@/context/AppProvider';
import { useRouter } from 'next/navigation';
import { IoChevronDown } from "react-icons/io5";
import SearchBar from '@/Component/SearchBar';
import MenuToggle from '@/Component/Menu';
import { AiOutlinePlus } from "react-icons/ai";
import { BsMusicNoteList } from "react-icons/bs";
import { PiMusicNotesPlusLight } from "react-icons/pi";
import { IoAlbumsOutline } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";

const Nav = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authToken} = useAppHook();
    const router = useRouter();

     useEffect(() => {
        if (!authToken) return router.push('/Auth/Login');
    
        axios.get('http://localhost:8000/api/user/profile', {
          headers: { Authorization: `Bearer ${authToken}` },
        })
          .then(res => {
            setUser(res.data);
            
            setLoading(false);
    
           
          })
          .catch(() => router.push('/Auth/Login'));
      }, []);

       if (loading) return <div className='h-screen fixed top-0 left-0 bg-[#121212] w-screen flex-center flex-center'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;

  return (
    <>
      <div className="fixed z-50 bg-[#121212] top-0 left-0 flex  px-7 py-3 border-b-[#222222] border-b-[.5px]  items-center  justify-between w-full mx-auto">

        <div className="flex items-center gap-5">
          <MenuToggle />
          <Link className='z-[70] group relative inline-block overflow-hidden  h-[47px] ' href={'/'}>
                <Image alt='Logo' className='w-[110px] brightness-105 block transition-transform duration-300 group-hover:-translate-y-full h-full' src={logo} width={120} height={120}/>
                <Image alt='Logo' className='w-[110px] brightness-105 absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full h-full' src={logo} width={120} height={120}/>
            </Link>

            {/* <div className="w-[1px] h-[25px] bg-[#222222]"></div>

            <p className='text-white cursor-pointer text-[16.5px]  font-semibold'>Library</p> */}

        </div>


        {/* <SearchBar /> */}

        <div className="flex gap-3 items-center">
          {/* <span className='text-[17.5px] border-[.5px] border-white/70 rounded-full w-[125px] font-NeueMontreal gap-3 h-[45px] flex-center'>Create <AiOutlinePlus/></span> */}
        <div className="size-[50px] p-[3px] shadow-md bg-[#222222] rounded-full flex-center">
            {
                user?.profile_image ?  <img className='size-full rounded-full saturate-[1.3]  object-cover' src={`http://localhost:8000${user.profile_image}`} onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/Hand.jpg'; // fallback image in /public
            }} alt="" />
                    : <span className='size-full bg-white text-black rounded-full flex-center font-bold  text-[16px]'>{user.username.charAt(0).toUpperCase()}</span>
                
            }

        </div>
          <p className="text-white flex gap-2 items-center text-[16px] font-semibold">Profile <IoChevronDown size={14}/></p> 

        </div>
      </div>




      {/* <div className="fixed z-[100] top-0 left-0 bg-black/50 w-full h-screen">

        <div className="flex w-full h-full flex-col gap-10 items-center">
            <h1 className='text-[35px] mix-blend-difference text-white font-NeueMontreal capitalize font-semibold'>What do you wanna create today?</h1>
  
            <div className="flex p-1 gap-1 rounded items-center scale-90 bg-main2 flex-col ">
  
              <div className="flex rounded-lg w-[420px]  bg-main2  flex-col gap-1 ">
                  <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-4 backdrop-blur-2xl  h-fit ">
                    <span className='size-[65px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[30px] flex-center rounded-full mix-blend-difference text-white'><RiPlayListAddFill className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                    <div className="flex flex-col gap-1">
                        <p className='text-[19px] mix-blend-difference text-white   capitalize font-semibold'>Playlist</p>
                        <h5 className='text-white/70 tracking-wide font-NeueMontreal text-[14px]'>Create and share playlists that reflect your mood</h5>
                    </div>
                  </div>
              </div>
  
              <div className="w-[95%]  border-b-[.5px] border-white/40"></div>
                  
              <Link href={'/Create/Album'} className="flex relative  rounded-lg w-[420px]  bg-main2  flex-col gap-1 ">
                  <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-4 backdrop-blur-2xl  h-fit ">
                    <span className='size-[65px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[34px] flex-center rounded-full mix-blend-difference text-white'><IoAlbumsOutline className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                    <div className="flex flex-col gap-1">
                        <p className='text-[19px] mix-blend-difference text-white  capitalize font-semibold'>Album</p>
                        <h5 className='text-white/70 tracking-wide font-NeueMontreal text-[14px]'>Upload a collection of your best tracks</h5>
                    </div>
                  </div>
                  
              </Link>
              <Link href={'/Create/Track'} className="flex rounded-lg w-[420px]  bg-main2  flex-col gap-1 ">
                  <div className="flex py-[10px] hover:bg-main/10 group transition-all duration-200 rounded-md px-[10px] items-center  gap-4 backdrop-blur-2xl  h-fit ">
                    <span className='size-[65px] group-hover:rotate-12 transition-all  group-hover:text-green-500 duration-200 ease-in-out bg-main/10 text-[36px] flex-center rounded-full mix-blend-difference text-white'><PiMusicNotesPlusLight className='group-hover:drop-shadow-lg group-hover:drop-shadow-green-500'/></span>
                    <div className="flex  flex-col gap-1">
                        <p className='text-[19px] mix-blend-difference text-white  capitalize font-semibold'>Track</p>
                        <h5 className='text-white/70 tracking-wide font-NeueMontreal text-[14px]'>let listeners discover your unique style instantly.</h5>
                    </div>
                  </div>
                  
              </Link>
            </div>
          </div>

      </div> */}
    </>
  )
}

export default Nav
