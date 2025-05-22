'use client'
import React, {useState} from 'react'
import Logo from '@/public/Logo/Studyo_black.svg'
import Image from 'next/image'
import Link from 'next/link'
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { CiWavePulse1 } from "react-icons/ci";

const Header = () => {
	const [search, setSearch] = useState("");
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
							
							<Link className='font-semibold text-[15px]  text-[#323232] hover:text-black'  href={'/'}>Sign up</Link>  
							<Link className='font-semibold hover:scale-105 duration-200 ease-out hover:bg-[#323232]  text-[14.5px] px-6 h-[45px] flex items-center justify-center rounded-full bg-[#010101] text-[#e4e4e4]' href={'/'}>Log in</Link>

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