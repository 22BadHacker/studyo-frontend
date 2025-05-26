import React from 'react'
import logo from '@/public/Logo/Studyo_blackk.svg'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  return (
	<div className='container'>

		<div className="flex-between w-full">

			<div className="flex items-center gap-[75px]">
				<Link className='' href={'/'}>
					<Image alt='Logo' className='w-[100px] ' src={logo} width={140} height={140}/>
				</Link>
				<div className="w-[1px] h-6 bg-black"></div>
				<div className="flex gap-8 items-center">
					<p className='font-[550] tracking-wide font-NeueMontreal flex items-center gap-[3px] text-[15.5px]'>Explore<IoIosArrowDown className='relative top-[1px]' size={13}/></p>
					<p className='font-[550] text-[15.5px] tracking-wide font-NeueMontreal'>Library</p>
					<p className='font-[550] text-[15.5px] tracking-wide font-NeueMontreal'>Playlists</p>
					<p className='font-[550] text-[15.5px] tracking-wide font-NeueMontreal'>Artists</p>
				</div>

			</div>




		</div>
	</div>
  )
}

export default Header
