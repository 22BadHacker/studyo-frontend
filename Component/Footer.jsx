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
import { motion, AnimatePresence } from 'framer-motion';
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
  {name : 'Backend technology', attr: 'Laravel api, MySQL'},
  {name : 'animation', attr: 'framer motion, gsap, Lenis.js'},
  // {name : 'Copyright', attr: ` © ${new Date().getFullYear()} Studyo by Mounir Lagzouli.`},

  
]

const Footer = () => {

  const [credit, setCredit] = useState(false)



  return (
    <div className="container " >



      {
        credit ? (
            <>
              <AnimatePresence>
                <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ delay: .2, ease: 'easeInOut' }} animate={{ opacity: 1 }} className="h-full pt-0 place-items-center  grid grid-cols-2 gap-2 w-full ">

                  <div className="flex w-full   flex-col gap-4">
                      <div onClick={() => setCredit(false)} className="link-wrapper  w-fit opacity-95 cursor-pointer font-normal tracking-wide hover:text-red-500 font-NeueMontreal text-[18px] uppercase">Close</div>
                      <h1 className='text-[200px]   leading-[.8] flex items-center   font-semibold font-NeueMontreal '>Credits</h1>
                  </div>
                  <div className="w-full grid h-auto grid-rows-3 grid-cols-3 gap-x-8 gap-y-9">
                      {
                        crediit.map((item, index) => (
                          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} transition={{ delay: index*.1, ease: 'easeInOut' }} animate={{ opacity: 1 }} key={index} className="flex flex-col gap-3">
                            <div className="link-wrapper h-[18px] w-fit opacity-95 cursor-pointer font-normal tracking-wide font-NeueMontreal text-[11px] uppercase">
                                <p className='link-text'>/ {item.name} </p>
                                <p className=' link-text-clone '>/ {item.name} </p>
                            </div>
                            {/* <p className='text-[40px] hover:text-green-500 duration-200 ease-in-out cursor-pointer font-NeueMontreal font-semibold'>{item.name}</p> */}
                            <p className='text-[20px] hover:text-green-500 duration-200 ease-in-out cursor-pointer  max-w-[280px] tracking-wide font-semibold capitalize '>{item.attr}</p>
                          </motion.div>
                        ))
                      }
                      
                  </div>

              </motion.div>

              </AnimatePresence>
            </>
        ) :
        (

            <motion.div  initial={{ opacity: 0 }} transition={{duration: .3,delay: .2, ease: 'easeInOut' }} animate={{ opacity: 1 }} className='h-full flex   flex-col '>
            <div  className="w-full py-[70px] grid-cols-[1fr_.85fr] grid">
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

            <div   className="flex pb-6  pt-[180px] items-end justify-between w-full">
                
                    <Image alt='Logo' className='w-[200px] relative top-2 opacity-90' src={logo} width={140} height={140}/>

              <div className="font-NeueMontreal items-end flex flex-col  text-[15px] uppercase">
                <TimeClock />
                <div className="flex gap-1 items-center">
                  <span className='font-bold hover:text-green-500 duration-200 ease-in-out cursor-pointer transition-all font-InterTight tracking-wide'>© Stüdyo llc <span className='text-[16px]'>{new Date().getFullYear()}</span> </span>
                  <span className='font-light font-InterTight '>/ </span>
                  <span className='font-bold hover:text-green-500 duration-200 ease-in-out cursor-pointer transition-all font-InterTight tracking-wide' onClick={()=>setCredit(!credit)}>Site Credits </span>
                  {/* <span className='font-bold font-InterTight tracking-wide'>/ </span>
                  <span className='font-bold font-InterTight tracking-wide'>Privacy </span> */}
                  <span className='font-light font-InterTight '>/ </span>
                  <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  className='font-bold hover:text-green-500 duration-200 ease-in-out cursor-pointer transition-all font-InterTight tracking-wide'>up </span>


                </div>
              </div>
            </div>
            </motion.div>
        )
      }

      

    </div>
  )
}

export default Footer

// viewport={{ once: false }} initial={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: .1, ease: 'easeInOut' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }}

//  is a music app that allows you to listen to your favorite songs and albums. It is a platform that allows you to listen to your favorite songs and albums.