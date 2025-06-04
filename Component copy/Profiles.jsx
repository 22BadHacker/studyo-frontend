'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import { useAppHook } from '@/context/AppProvider'
import Link from 'next/link';
import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import { IoIosNotifications } from 'react-icons/io';
import { GoArrowUpRight } from "react-icons/go";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { IoPowerSharp } from "react-icons/io5";
import { useParams } from 'next/navigation';
import { AiOutlinePlus } from "react-icons/ai";
import { AnimatePresence, motion } from 'framer-motion';
import { PiMusicNotesPlusFill } from "react-icons/pi";



const Profiles = () => {
    const { public_id } = useParams();
     const { logout, user } = useAppHook(); // local login
    const { data: session } = useSession(); // Google login
    const [open, setOpen] = useState(false);
    const [drop, setDrop] = useState(false);

    const displayUser = user || session?.user;

    const profileImage = displayUser?.profile_image || displayUser?.image;
    const firstLetter = displayUser?.username?.charAt(0) || displayUser?.name?.charAt(0) || "U";


    const handleLogout = async () => {
        if (session) {
            // Google login - NextAuth
            await signOut({ callbackUrl: '/' });
        } else {
            // Regular login - Laravel
            await logout(); // Make sure your logout() in AppProvider also calls your API
        }
    };


    useEffect(() => {
      const handleClickOutside = (e) => {
        if (!e.target.closest(".dropdown")) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);





  return (
    <div className='w-full  justify-end'>
        {
            !user && !session?.user ? (
                <div className="flex relative w-full justify-end gap-6 items-center">
                    <Link href={'/Auth/Login'} className=' duration-200 ease-in-out hover:scale-[1.05] px-6 py-[14px] rounded-full hover:bg-main2/50 backdrop-blur-xl font-semibold text-white'>Log in</Link>
                    <Link href={'/Auth/Signup'} className='bg-white duration-200 ease-in-out hover:scale-[1.05] px-6 py-3 rounded-full border-white border-[1px] hover:bg-[#f0f0f0] font-semibold text-main2'>Sign up</Link>  
                </div>
            )
            :
            (
                <div className="flex w-full justify-end gap-7 items-center">
                    


                    {/* Profile Circle with Dropdown */}
                    <div className="relative  flex gap-6 items-center p-1 rounded-full cursor-pointer group">
                        <button className=' relative text-[16.5px] font-semibold bg-main2/50 backdrop-blur-xl pl-[11px] p-1 flex gap-[14px] flex-center  ] rounded-full'>
                           Create <span className='bg-[#2d2e2f]  size-[35px] rounded-full flex-center'><AiOutlinePlus className='text-green-500'/> </span>
                        </button>
                        {/* Profile image or first letter */}
                        <button onClick={() => setOpen(!open)} className="dropdown size-[40px]  cursor-pointer rounded-full bg-white text-main2 font-[800] font-sora text-[18px] flex-center uppercase shadow overflow-hidden"z>
                            {profileImage ? (
                            <img src={profileImage} alt="" className="w-full  h-full  object-cover rounded-full" />
                            ) : (
                            firstLetter
                            )}

                            {/* <span className='absolute top-[4.5px] right-[8.5px] bg-green-500 size-[8.5px] rounded-full'></span> */}
                        </button>

                        {/* Dropdown menu */}
                        <AnimatePresence>
                            {
                                
                                    open &&
                                    <motion.div initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.2 }} exit={{ opacity: 0, filter: 'blur(10px)' }} className=" absolute overflow-hidden  right-0 top-[70px] w-[200px]  bg-main2/60 backdrop-blur-[20px] border border-black/40 rounded-md shadow-md   transition-opacity duration-200 z-10">
                                        <Link className='linkk' href={
                                            displayUser?.role === 'artist'
                                            ? `/artist/${displayUser?.public_id || displayUser?.id}`
                                            : `/user/${displayUser?.public_id || displayUser?.id}`
                                        }>Account <LuSquareArrowOutUpRight size={16}/></Link>
                                        <Link className='linkk' href={'/'}>My Music </Link>
                                        <Link className='linkk' href={'/'}>Upgrade to Premium <LuSquareArrowOutUpRight size={16}/></Link>
                                        <Link className='linkk' href={'/'}> Notifications </Link>
                                        <Link className='linkk' href={'/'}>Settings </Link>
                                        <button
                                        onClick={handleLogout}
                                        className="linkk  border-t border-t-white/20 cursor-pointer hover:text-green-500  "
                                        >
                                        Logout 
                                        <IoPowerSharp size={18}/>
                                        </button>
                                    </motion.div>
                                }

                        </AnimatePresence>
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default Profiles
