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





const Header = () => {
	const [search, setSearch] = useState("");
	const [isHover, setIsHoverd] = useState("");
  return (
	<div className='container2    '>

		<div className="grid grid-cols-[auto_1fr_auto] gap-8 w-full">

			<div className="flex  items-center gap-[30px]">
				
				<MenuToggle />
				<Link className='' href={'/'}>
					<Image alt='Logo' className='w-[130px] ' src={logo} width={120} height={120}/>
				</Link>
			</div>

			<div className="flex-center gap-2">
				
				<Link href={'/Search'} className="grid  hover:text-white  duration-200 ease-in-out grid-cols-[auto_1fr_auto] search w-[430px] bg-main2 hover:border-[1.5px]   gap-[13px] items-center h-[52px] px-[9px] border-[1.5px]  hover:border-white/80 border-transparent rounded-full">
					<FiSearch className='text-[#b3b3b3] h-fit  text-[27px] relative -top-[1px] cursor-pointer' /> 
					<input className="outline-none font- tracking-wider font-medium text-[14px] capitalize placeholder:text-[14px] w-full  placeholder:text-[#b3b3b3]" value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="What’s playing in your Stüdyo today?" />

					{search && (<IoMdClose onClick={() => setSearch("")} className='text-[#b3b3b3]  hover:text-white transition-all text-[28px] cursor-pointer'/>)}
						
				</Link>

			</div>

			<Profiles />
				
		</div>
	</div>
  )
}

export default Header



// {/* <div className="flex-center w-9 gap-[6px]  flex-col">
// 					<div className="w-full border-b-1 border-b-white"></div>
// 					<div className="w-full border-b-1 border-b-white"></div>
// 				</div> */}
