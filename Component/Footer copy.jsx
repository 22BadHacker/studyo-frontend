'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import React from 'react'
import logo from '@/public/Logo/Studyo_white.svg'
import { FaArrowRight } from "react-icons/fa6";
import { IoMdReturnRight } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import { IoIosArrowRoundUp } from "react-icons/io";
import TimeClock from './TimeClock';
import monir from '@/public/Logo/MounirLagzouliWhite.svg'
import { motion } from 'framer-motion';
import Link from 'next/link';





const socail = [
  {name : 'Youtube', href : '/'},
  {name : 'Instagram', href : '/'},
  {name : 'TikTok', href : '/'},
  {name : 'X', href : '/'},
  {name : 'Facebook', href : '/'},
]

const company = [
  {name : 'Home', href : '/'},
  {name : 'explore', href : '/'},
  // {name : 'search', href : '/'},
  {name : 'artists', href : '/'},
  {name : 'library', href : '/'},
  {name : 'Contact', href : '/'},
]


const crediit = [
  {name : 'Website Name', attr: 'Stüdyo'},
  {name : 'Site Design & Development', attr: 'Mounir Lagzouli'},
  {name : 'supervisor', attr: 'el harti mohammed'},
  {name : 'Frontend technology', attr: 'Next jS, Tailwind CSS'},
  {name : 'Copyright', attr: ` © ${new Date().getFullYear()} Studyo by Mounir Lagzouli.`},

  
]

const Footer = () => {

  const [credit, setCredit] = useState(false)



  return (
    <div className="container " >



      {
        !credit && 
            <>
              <div className="h-[400px]  fixed right-5 w-[400px] items-end flex z-[60] bg-gradient-to-t  from-[#d8dfe8]/10 via-[#d8dfe8]/10 to-[#d8dfe8]/10 backdrop-blur-3xl bg gap-6">

                {/* <div className="flex  flex-col gap-4">
                    <h1 className='text-[210px] leading-[.8] flex items-center   font-semibold font-NeueMontreal '>Credits</h1>
                </div>
                <div className="flex  pb-3 h-fit items-start flex-wrap gap-2 leading-[1.05]">


                    <div className="flex  flex-wrap items-center gap-[6px] leading-[1]">
                        <div className="flex   font-NeueMontreal gap-[5px] text-[16px] capitalize font-normal text-green-500 items-center"><span className='size-[8.5px] bg-green-500 rounded-full'></span>Website Name <span className='pl-[3px] text-white '> / Stüdyo</span></div>
                        <div className="flex  font-NeueMontreal  gap-[5px] text-[16px] capitalize font-normal text-[#e82525] items-center"><span className='size-[8.5px] bg-[#e82525] rounded-full'></span>Site Design & Development <span className='pl-[3px]  text-main'> / Mounir lagzouli</span></div>
                        <div className="flex  font-NeueMontreal  gap-[5px] text-[16px] capitalize font-normal text-[#e82525] items-center"><span className='size-[8.5px] bg-[#e82525] rounded-full'></span>supervisor <span className='pl-[3px]  text-main'> / el harti mohammed</span></div>
                        <div className=" flex font-NeueMontreal  gap-[5px] text-[16px] capitalize font-normal text-[#e82525] items-center"><span className='size-[8.5px] bg-[#e82525] rounded-full'></span>Frontend <span className=' pl-[3px] text-main'> / Next jS, Tailwind CSS</span></div>
                        <div className="flex  font-NeueMontreal  gap-[5px] text-[16px]  capitalize font-normal text-[#e82525] items-center"><span className='size-[8.5px] bg-[#e82525] rounded-full'></span>Backend <span className=' pl-[3px] text-main'> / Laravel (API), MySQL</span></div>
                        <div className=" flex font-NeueMontreal gap-1 text-[16px] capitalize font-normal text-[#e82525] items-center"><span className='size-[8px] bg-[#e82525] rounded-full'></span>Copyright <span className=' pl-[3px] text-main'> / © {new Date().getFullYear()} Studyo by Mounir Lagzouli.</span></div>
                    </div>
                </div> */}

            </div>
            </>
        
      }

      <>
      <div  className="w-full py-20 grid-cols-[1fr_.85fr] grid">
          <div className="flex flex-col gap-6">
              <div className="link-wrapper h-[18px] w-fit opacity-95 cursor-pointer font-normal tracking-wide font-NeueMontreal text-[11.5px] uppercase">
                  <p className='link-text'>/ Reach out </p>
                  <p className=' link-text-clone '>/ Reach out </p>
              </div>
              <div className="flex w-fit leading-[1.1] flex-col">
                  <p className='text-[40px] hover:text-green-500 duration-200 ease-in-out cursor-pointer font-NeueMontreal font-semibold'>contact@studyo.com</p>
                  <p className='text-[40px] hover:text-green-500 duration-200 ease-in-out cursor-pointer font-NeueMontreal font-semibold'>/ +1 (123) 456-7890</p>
                  {/* <TimeClock /> */}
              </div>
          </div>

          <div className="grid grid-cols-[1.1fr_.6fr_.4fr] gap-5 w-full">

            <div className="flex flex-col gap-7">
              <div className="link-wrapper h-[18px] w-fit opacity-95 cursor-pointer font-normal tracking-wide font-NeueMontreal text-[11.5px] uppercase">
                  <p className='link-text'>/ find us </p>
                  <p className=' link-text-clone '>/ find us </p>
              </div>
              <div className="flex leading-[1.4] flex-col">
                  <p className='text-[20px] hover:text-green-500 duration-200 ease-in-out cursor-pointer  max-w-[280px] tracking-wide font-semibold capitalize '>70 Washington Square South, New York, NY 10012, United States</p>
                  
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <div className="link-wrapper h-[18px] w-fit opacity-95 cursor-pointer font-normal tracking-wide font-NeueMontreal text-[11.5px] uppercase">
                  <p className='link-text'>/ Socials </p>
                  <p className=' link-text-clone '>/ Socials </p>
              </div>

              <div className="flex leading-[1.28] flex-col">
                {socail.map((item, index) =>{return(<div className='h-[30px]'>
                  <p key={index} className='text-[20px] tracking-wide font-semibold capitalize hover:text-green-500 duration-200 ease-in-out cursor-pointer'>{item.name}</p>
                </div>)})}
              </div>
            </div>

            <div className="flex flex-col gap-7">
              <div className="link-wrapper h-[18px] w-fit opacity-95 cursor-pointer font-normal tracking-wide font-NeueMontreal text-[11.5px] uppercase">
                  <p className='link-text'>/ Nav </p>
                  <p className=' link-text-clone '>/ Nav </p>
              </div>
              
              <div className="flex leading-[1.28] flex-col">
                {company.map((item, index) =>(<p key={index} className='text-[20px] tracking-wide h-[30px] font-semibold capitalize hover:text-green-500 duration-200 ease-in-out cursor-pointer'>{item.name}</p>))}
                
              </div>
            </div>

          </div>
      </div>

      <div   className="flex pb-6  pt-[170px] items-end justify-between w-full">

          {/* <div className="flex  flex-col items-start">
              <p className='text-[14px] font-normal uppercase font-NeueMontreal '>site by</p>
              <p className='text-[15px] uppercase font-InterTight tracking-wide font-bold'>mounir lagzouli</p>
              </div> */}
          
              <Image alt='Logo' className='w-[200px] relative top-2 opacity-90' src={logo} width={140} height={140}/>

        <div className="font-NeueMontreal items-end flex flex-col  text-[15px] uppercase">
          <TimeClock />
          <div className="flex gap-1 items-center">
            <span className='font-bold font-InterTight tracking-wide'>© Stüdyo llc <span className='text-[16px]'>{new Date().getFullYear()}</span> /  </span>
            <Link href={'/SiteCredits'} className='font-bold font-InterTight tracking-wide'>Site Credits </Link>
            {/* <span className='font-bold font-InterTight tracking-wide'>/ </span>
            <span className='font-bold font-InterTight tracking-wide'>Privacy </span> */}
            <span className='font-bold font-InterTight tracking-wide'>/ </span>
            <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  className='font-bold hover:text-green-500 duration-200 ease-in-out cursor-pointer transition-all font-InterTight tracking-wide'>up </span>


          </div>
        </div>
      </div>
      </>
      

    </div>
  )
}

export default Footer

// viewport={{ once: false }} initial={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: .1, ease: 'easeInOut' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }}

//  is a music app that allows you to listen to your favorite songs and albums. It is a platform that allows you to listen to your favorite songs and albums.