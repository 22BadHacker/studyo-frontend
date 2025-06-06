'use client'
import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import { useAppHook } from '@/context/AppProvider'
import Link from 'next/link';
import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react';
import { IoIosNotifications } from 'react-icons/io';
import { GoArrowUpRight } from "react-icons/go";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { IoPowerSharp } from "react-icons/io5";
import { useParams } from 'next/navigation';


const Profiles = () => {
    const { public_id } = useParams();
     const { logout, user } = useAppHook(); // local login
    const { data: session } = useSession(); // Google login
    const [open, setOpen] = useState(false);

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



  return (
    <div className='w-full  justify-end'>
        {
            !user && !session?.user ? (
                <div className="flex relative w-full justify-end gap-6 items-center">
                    <Link href={'/Auth/Login'} className=' duration-200 ease-in-out hover:scale-[1.05] px-6 py-[14px] rounded-full hover:bg-main2 font-semibold text-white'>Log in</Link>
                    <Link href={'/Auth/Signup'} className='bg-white duration-200 ease-in-out hover:scale-[1.05] px-6 py-3 rounded-full border-white border-[1px] hover:bg-[#f0f0f0] font-semibold text-main2'>Sign up</Link>  
                </div>
            )
            :
            (
                <div className="flex w-full justify-end gap-7 items-center">
                    


                    {/* Profile Circle with Dropdown */}
                    <div className="relative bg-[#d8dfe8]/0  backdrop-blur-[15px] border-white/0 border-[1.5px]  flex gap-6 items-center px-[7px] py-[4.5px] rounded-full cursor-pointer group">
                        {/* Profile image or first letter */}
                        <span className='relative size-[40px] flex-center  backdrop-blur-[6px] rounded-full'>
                            <IoIosNotifications className='relative  text-white cursor-pointer text-[25px]' />
                            {/* <span className='absolute top-0 right-1 bg-red-500  size-[9px] rounded-full'></span> */}
                        </span>
                        {/* <div className="w-[.5px] h-[20px] bg-white"></div> */}
                        <button onClick={() => setOpen(!open)} className="size-[40px]  cursor-pointer rounded-full bg-white text-main2 font-[800] font-sora text-[18px] flex-center uppercase shadow overflow-hidden"z>
                            {profileImage ? (
                            <img src={profileImage} alt="" className="w-full  h-full  object-cover rounded-full" />
                            ) : (
                            firstLetter
                            )}

                            <span className='absolute top-[4.5px] right-[8.5px] bg-green-500 size-[8.5px] rounded-full'></span>
                        </button>

                        {/* Dropdown menu */}
                       {
                        
                            open &&
                            <div className="absolute py-1 right-0 top-[70px] w-[200px] px-2 bg-main2/90 backdrop-blur-[20px] border border-black/40 rounded-md shadow-md   transition-opacity duration-200 z-10">
                                <Link className='linkk' href={'/Profile'}>Account <LuSquareArrowOutUpRight size={16}/></Link>
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
                            </div>
                        }
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default Profiles
