import Image from 'next/image'
import React from 'react'
import logo from '@/public/Logo/Studyo_white.svg'
import { FaArrowRight } from "react-icons/fa6";
import { IoMdReturnRight } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowRoundUp } from "react-icons/io";
import TimeClock from './TimeClock';


const Footer = () => {
  return (
    <div className="container relative">
      <div className="w-full py-20 grid grid-cols-2 gap-20">
        <Image alt='Logo' className='w-[90%] opacity-90' src={logo} width={140} height={140}/>
        <h1 className='flex pl-5 leading-[.95] font-medium font-NeueMontreal items-center max-w-[450px] text-[40px]'>Your next favorite song is one click away.</h1>
        {/* <h1 className='flex leading-[.95] font-medium font-NeueMontreal items-center max-w-[400px] text-[40px]'>Your next favorite song is one click away.</h1> */}
      </div>

      <div className="grid py-20 w-full grid-cols-2 gap-20">
          <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex w-full gap-7 flex-col">
                  <p className='text-white font-semibold uppercase font-MartianMono flex items-center gap-1 tracking-wide '>Stüdyo LLC. &copy;2025</p>
                  <div className='flex tracking-wider font-semibold uppercase font-MartianMono  leading-[1.15] flex-col'>site by <span className=''>Mounir lagzouli</span></div>
              </div>
              <div className="flex w-full gap-7 flex-col">
                  <TimeClock />
                  <div className='flex tracking-wide uppercase font-NeueMontreal leading-[1.1] flex-col'>site by <span className='font-semibold'>Mounir lagzouli</span></div>
              </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex w-full gap-7 flex-col">
                  <p className='text-white/80 font-semibold uppercase font-NeueMontreal flex items-center gap-1 tracking-wider '>reach out</p>
                  <div className='flex tracking-wide uppercase font-NeueMontreal leading-[1.1] flex-col'>contact@studyo.com <span>+1 234 567 890</span></div>
              </div>
              <div className="flex w-full gap-7 flex-col">
                  <p className='text-white/80 font-semibold uppercase font-NeueMontreal flex items-center gap-1 tracking-wider '>legal</p>
                  <div className='flex tracking-wide uppercase font-NeueMontreal leading-[1.1] flex-col'>privacy policy<span >All right reserved</span></div>
              </div>
          </div>
          {/* <div className="grid grid-cols-2 gap-4 w-full"></div> */}
      </div>


    </div>
  )
}

export default Footer



//  is a music app that allows you to listen to your favorite songs and albums. It is a platform that allows you to listen to your favorite songs and albums.