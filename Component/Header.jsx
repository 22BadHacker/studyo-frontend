'use client'
import React, { useState } from 'react'
import logo from '@/public/Logo/Studyo_white.svg'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { GrHomeOption } from "react-icons/gr";
import MenuToggle from './Menu'
import Profiles from './Profiles'
import { useAudio } from '@/context/AudioProvider'





const Header = () => {
	const [search, setSearch] = useState("");
	const [isHover, setIsHoverd] = useState("");
	const { playTrack } = useAudio();
  return (
	<div className='container2   '>

		<nav className="grid   pb-5  grid-cols-[auto_1fr_auto] gap-8 w-full">

			<div className="flex z-[30] w-fit items-center gap-[30px]">
				<MenuToggle />
				
				<Link className='z-[70]' href={'/'}>
					<Image alt='Logo' className='w-[125px] ' src={logo} width={120} height={120}/>
				</Link>
				<button onClick={() => playTrack({
				id: 1,
				title: 'The Mute Girl',
				artist: "Yann Tiersen",
				cover: '/images/img32.jpg',
				src: '/girl.mp3',
				})} className="text-white font-bold p-4">
				Play
				</button>
			</div>

			<div className="flex justify-center items-center relative -left-5 w-full gap-2">
				
				<Link href={'/Search'} className="grid  hover:text-white scale-[.99] mt-1  duration-200 ease-in-out grid-cols-[auto_1fr_auto] search w-[430px] bg-gradient-to-tr from-[#d8dfe8]/0 via-[#d8dfe8]/10 to-[#d8dfe8]/0 hover:border-[1.5px] backdrop-blur-[20px]   gap-[13px] items-center h-[53px] px-[9px]   hover:border-white/70 border-white/10 border-[1.5px]  rounded-full">
					<FiSearch className='text-[#f4f4f4] h-fit  text-[27px] relative -top-[1px] cursor-pointer' /> 
					<input className="outline-none font- tracking-wider font-medium text-[14px] capitalize placeholder:text-[14px] w-full  placeholder:text-[#fff]/85"  value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="What’s playing in your Stüdyo today?" />

					{search && (<IoMdClose onClick={() => setSearch("")} className='text-[#f4f4f4]  hover:text-white transition-all text-[28px] cursor-pointer'/>)}
						
				</Link>

			</div>

			<Profiles />
				
		</nav>
	</div>
  )
}

export default Header



// {/* <div className="flex-center w-9 gap-[6px]  flex-col">
// 					<div className="w-full border-b-1 border-b-white"></div>
// 					<div className="w-full border-b-1 border-b-white"></div>
// 				</div> */}


// border-b-[.5px] border-dashed border-white/20