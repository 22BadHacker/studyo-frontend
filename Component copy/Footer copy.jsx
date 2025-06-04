import Image from 'next/image'
import React from 'react'
import logo from '@/public/Logo/Studyo_white.svg'
import { FaArrowRight } from "react-icons/fa6";
import { IoMdReturnRight } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";


const Footer = () => {
  return (
    <div className="container">
      <div className='py-6 w-full flex flex-col gap-[110px]'>
        <div className="grid grid-cols-[1fr_.6fr_.6fr_1fr] gap-12">
            <div className="flex flex-col gap-6">
              <p className='h-fit w-[300px] uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'>Your next favorite song is one click away.</p>
              <div className="w-[80%] pb-3 border-b-[.4px] border-b-white/70  flex justify-between gap-2">
                <input className='font-TWK-Everett w-full border-none uppercase font-medium tracking-wider text-[13.5px] placeholder:text-white/80 placeholder:font-TWK-Everett placeholder:tracking-wider placeholder:text-[13.5px]' type="text" placeholder='email' />
                <IoMdReturnRight className='text-[15px]' />
              </div>

            </div>
            <div className="flex flex-col gap-[6px]">
                <p className='uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'><IoMdReturnRight className='text-[15px]' />instagram </p>
                <p className='uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'><IoMdReturnRight className='text-[15px]' />Snapchat </p>
                <p className='uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'><IoMdReturnRight className='text-[15px]' />tiktok </p>
            </div>
            <div className="flex flex-col">
              <p className='h-fit uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'> &copy; 2025—2026</p>
              <p className='h-fit uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'> <span className='font-[700]'>Stüdyo</span> by mounir lagzouli</p>
            </div>

            <div className="flex flex-col w-full items-start justify-start text-left gap-[6px]">
                <p className='uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'><IoMdReturnRight className='text-[15px]' />Terms & Conditions</p>
                <p className='uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'><IoMdReturnRight className='text-[15px]' />Privacy Policy </p>
                <p className='uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'><IoMdReturnRight className='text-[15px]' />Cookies Policy </p>
            </div>


        </div>
          <Image alt='Logo' className='w-full opacity-90' src={logo} width={140} height={140}/>
      </div>

    </div>
  )
}

export default Footer
