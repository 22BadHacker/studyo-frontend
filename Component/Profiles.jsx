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

const Profiles = () => {

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
                    <Link href={'/Auth/Login'} className=' duration-200 ease-in-out hover:scale-[1.05] px-6 py-3 rounded-full hover:bg-main2 font-semibold text-white'>Log in</Link>
                    <Link href={'/Auth/Signup'} className='bg-white duration-200 ease-in-out hover:scale-[1.05] px-6 py-3 rounded-full hover:bg-[#f0f0f0] font-semibold text-main2'>Sign up</Link>


                     
                </div>
            )
            :
            (
                <div className="flex w-full justify-end gap-7 items-center">
                    <Link
                        className="font-semibold hover:bg-[#f0f0f0] duration-200 ease-in-out hover:scale-[1.05] ] bg-white text-[#000] text-[14.5px] px-6 h-[51px] flex items-center justify-center rounded-full  capitalize"
                        href="/Auth/Login"
                    >
                        Explore premium
                    </Link>

                    {/* <IoIosNotifications className='text-[#fff] cursor-pointer text-[25px]' /> */}

                    {/* Profile Circle with Dropdown */}
                    <div className="relative cursor-pointer group">
                        {/* Profile image or first letter */}
                        <button onClick={() => setOpen(!open)} className="size-[53px] cursor-pointer rounded-full bg-green-500 text-[#000] font-[800] font-sora text-[18px] flex-center uppercase overflow-hidden">
                            {profileImage ? (
                            <img src={profileImage} alt="" className="w-full h-full bg-green-500 p-[.5px] object-cover rounded-full" />
                            ) : (
                            firstLetter
                            )}
                        </button>

                        {/* Dropdown menu */}
                       {
                        
                            open &&
                            <div className="absolute py-1 right-0 top-20 w-[200px] px-2 bg-main2/80 backdrop-blur-[20px] border border-black/40 rounded-md shadow-md   transition-opacity duration-200 z-50">
                                <Link className='linkk' href={'/'}>Account <LuSquareArrowOutUpRight size={16}/></Link>
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
