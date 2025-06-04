import Image from 'next/image'
import React from 'react'
import logo from '@/public/Logo/Studyo_white.svg'
import { FaArrowRight } from "react-icons/fa6";
import { IoMdReturnRight } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowRoundUp } from "react-icons/io";


const Footer = () => {
  return (
    <div className="container relative">

      <div className="absolute font-bold px-4 py-3 scale-95 border-dashed rounded-full   capitalize bottom-10 flex gap-1 items-center right-8">back to top <IoIosArrowRoundUp size={20} /></div>
      <div className="grid grid-cols-2 gap-6">
          {/* <div className="flex flex-col gap-6">
            <p className='h-fit w-[300px] uppercase text-white/80 font-TWK-Everett flex items-center gap-3 font-medium tracking-wider text-[13.5px]'>Your next favorite song is one click away.</p>
            <div className="w-[80%] pb-3 border-b-[.4px] border-b-white/70  flex justify-between gap-2">
              <input className='font-TWK-Everett w-full border-none uppercase font-medium tracking-wider text-[13.5px] placeholder:text-white/80 placeholder:font-TWK-Everett placeholder:tracking-wider placeholder:text-[13.5px]' type="text" placeholder='email' />
              <IoMdReturnRight className='text-[15px]' />
            </div>

          </div> */}
      </div>

      <div className="grid grid-cols-[1.2fr_1fr] gap-20 pb-20 pt-20">

          <Image alt='Logo' className='w-[90%] opacity-90' src={logo} width={140} height={140}/>
          <div className="flex flex-col h-full items-start justify-center gap-2 ">
              <p className='h-fit  text-white/80 font-NeueMontreal flex items-center gap-1 font-medium tracking-wider text-[16px]'> &copy; 2025 <span className='font-[700] text-white'>Stüdyo</span>. All right reserved</p>
              <div className="flex text-white/80 font-NeueMontreal gap-6 items-center">
                  <p>Privacy Policy</p>
                  <p>Terms of Service</p>
              </div>
          </div>
      </div>

    </div>
  )
}

export default Footer
