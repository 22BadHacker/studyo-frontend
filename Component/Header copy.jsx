'use client'
import React, {useState} from 'react'
import Logo from '@/public/Logo/Studyo_black.svg'
import Image from 'next/image'
import Link from 'next/link'
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { CiWavePulse1 } from "react-icons/ci";
import { useAppHook } from '@/context/AppProvider'
import { LogOut, Settings, User, LayoutDashboard } from "lucide-react";
import { IoIosNotifications } from "react-icons/io";
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
	const {logout, user} = useAppHook();
	const [search, setSearch] = useState("");
	const { data: session, status } = useSession();
	return (
		<>
			<nav className='w-full px-8 py-6 flex justify-between items-center'>

					<div className="flex  gap-[40px] items-center">
						
						<Image alt='Logo' className='w-[140px]' src={Logo} width={140} height={140}/> {/* Studyo Logo */}
							<div className="w-[1px] h-[30px] bg-[#323232]/80"></div>

						{/* Search Bar */}
						{/* <div className="grid grid-cols-[auto_1fr_auto] search w-[430px] scale-95   gap-[7px] items-center h-[45px] px-[9px] border-[1.5px] border-[#323232]/95  rounded-full">
							<BiSearch className='text-[#323232] text-[23.5px] cursor-pointer' /> 
							<input className="outline-none font-medium text-[14.5px] capitalize placeholder:text-[14.5px] w-full tracking-wide placeholder:text-[#323232]/95" value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="What’s playing in your Stüdyo today?" />

							{search && (<IoMdClose onClick={() => setSearch("")} className='text-[#323232]  hover:text-black transition-all text-[24px] cursor-pointer'/>)}
								
						</div> */}
						<div className="grid grid-cols-[auto_1fr_auto] search w-[430px]    gap-[7px] items-center h-[43.5px] px-[9px] border-[1.5px] border-[#323232]/95  rounded-full">
							<BiSearch className='text-[#323232] text-[22.5px] cursor-pointer' /> 
							<input className="outline-none font-medium text-[13.5px] capitalize placeholder:text-[13.5px] w-full tracking-wide placeholder:text-[#323232]/95" value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="What’s playing in your Stüdyo today?" />

							{search && (<IoMdClose onClick={() => setSearch("")} className='text-[#323232]  hover:text-black transition-all text-[24px] cursor-pointer'/>)}
								
						</div>


					</div>
						<div className="flex gap-8 items-center">
							{/* <Link className='font-semibold text-[15px]  text-[#323232] hover:text-black' href={'/'}>install the app</Link>   */}
							
							{!user ? (
								<>
									<Link className="font-semibold text-[15px] text-[#323232] hover:text-black" href="/Auth/Signup">
									Sign up
									</Link>
									<Link
									className="font-semibold hover:scale-105 duration-200 ease-out hover:bg-[#323232] text-[14.5px] px-6 h-[45px] flex items-center justify-center rounded-full bg-[#010101] text-[#e4e4e4]"
									href="/Auth/Login"
									>
									Log in
									</Link>
								</>
								) : (
									<>
										<Link
										className="font-semibold hover:scale-105 duration-200 ease-out hover:bg-[#323232] hover:text-white text-[14.5px] px-6 h-[45px] flex items-center justify-center border-[.5px] rounded-full border-[#010101] text-main2"
										href="/Auth/Login"
										>
										Explore premium
										</Link>
										<IoIosNotifications className='text-[#323232] cursor-pointer text-[25px]' />
										<div className="relative cursor-pointer group">
											{/* Circle with first letter */}
											<button className="w-10 cursor-pointer h-10 rounded-full bg-[#323232] text-white font-bold flex items-center justify-center uppercase">
											{user.first_name.charAt(0)}
											</button>

										{/* Dropdown menu */}
										<div className="absolute right-0 mt-4 overflow-hidden w-[180px] bg-white border-[.5px] border-black/50 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
											<Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
												<LayoutDashboard size={18} /> Dashboard
											</Link>
											<Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
												<User size={18} /> Profile
											</Link>
											<Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
												<Settings size={18} /> Settings
											</Link>
											<button
												onClick={logout}
												className="w-full flex items-center gap-3 px-4 py-2 border-t-[.5px] border-black/20 text-sm text-gray-700 hover:bg-gray-100 text-left"
											>
												<LogOut size={18} /> Logout
											</button>
											</div>
										</div>

									
									</>
								)}
							 
							

							{/* <span className="bg-[#d9d9d9] flex justify-center items-center size-12 rounded-full">
								<CiWavePulse1 className='text-[30px]' />
							</span> */}
							{/* <div className="flex menu hover:scale- gap-[4px] items-center justify-center w-10">
								<div className=" bg-[#010101] rounded-full size-[6px]"></div>
								<div className=" bg-[#010101] rounded-full size-[6px]"></div>
								<div className=" bg-[#010101] rounded-full size-[6px]"></div>
								
							</div> */}

						</div>
			</nav>

			{/* <div className="w-screen h-screen fixed z-10 top-0 left-0 bg-black"></div> */}
		</>
	)
}

export default Header


// bg-[#d9d9d9]