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
  {name : 'search', href : '/'},
  {name : 'artists', href : '/'},
  {name : 'library', href : '/'},
  {name : 'Contact', href : '/'},
]

const Footer = () => {

  // const ref = useRef(null);
  // const [isVisible, setVisible] = useState(false);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => setVisible(entry.isIntersecting),
  //     { threshold: 0.1 }
  //   );
  //   if (ref.current) observer.observe(ref.current);
  //   return () => observer.disconnect();
  // }, []);


  return (
    <div className="container " >

      <div  className="w-full py-20 grid-cols-[1fr_.85fr] grid">
          <div className="flex flex-col gap-5">
              <p className='uppercase tracking-wide font-normal font-NeueMontreal text-[11px]'>/ Reach out </p>
              <div className="flex leading-[1.1] flex-col">
                  <p className='text-[40px] hover:text-green-500 duration-200 ease-in-out cursor-pointer font-NeueMontreal font-semibold'>contact@studyo.com</p>
                  <p className='text-[40px] hover:text-green-500 duration-200 ease-in-out cursor-pointer font-NeueMontreal font-semibold'>/ +1 (123) 456-7890</p>
                  {/* <TimeClock /> */}
              </div>
          </div>

          <div className="grid grid-cols-[1.1fr_.6fr_.4fr] gap-5 w-full">

            <div className="flex flex-col gap-7">
              <p className='uppercase font-normal tracking-wide font-NeueMontreal text-[11.5px]'>/ find us </p>
              <div className="flex leading-[1.28] flex-col">
                  <p className='text-[20px] hover:text-green-500 duration-200 ease-in-out cursor-pointer  max-w-[280px] tracking-wide font-semibold capitalize '>70 Washington Square South, New York, NY 10012, United States</p>
                  
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <p className='uppercase font-normal tracking-wide font-NeueMontreal text-[11.5px]'>/ Socials </p>
              <div className="flex leading-[1.28] flex-col">
                {socail.map((item, index) =>{return(<p key={index} className='text-[20px] tracking-wide font-semibold capitalize hover:text-green-500 duration-200 ease-in-out cursor-pointer'>{item.name}</p>)})}
              </div>
            </div>

            <div className="flex flex-col gap-7">
              <p className='uppercase font-normal tracking-wide font-NeueMontreal text-[11.5px]'>/ Nav </p>
              <div className="flex leading-[1.28] flex-col">
                {company.map((item, index) =>(<p key={index} className='text-[20px] tracking-wide font-semibold capitalize hover:text-green-500 duration-200 ease-in-out cursor-pointer'>{item.name}</p>))}
                 
              </div>
            </div>

          </div>
      </div>

      <motion.div viewport={{ once: false }} initial={{ opacity: 0, filter: 'blur(10px)' }} transition={{ duration: .2, ease: 'easeInOut' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }}  className="flex pb-6  pt-[130px] items-end justify-between w-full">

          <div className="flex  flex-col items-start">
              <p className='text-[14px] font-normal uppercase font-NeueMontreal '>site by</p>
            {/* <Image alt='Logo' className='w-[200px] opacity-90' src={monir} width={140} height={140}/> */}
              <p className='text-[15px] uppercase font-InterTight tracking-wide font-bold'>mounir lagzouli</p>
          </div>
          

        <div className="font-NeueMontreal items-end flex flex-col  text-[15px] uppercase">
          <TimeClock />
          <div className="flex gap-1 items-center">
            <span className='font-bold font-InterTight tracking-wide'>© Stüdyo llc <span className='text-[16px]'>{new Date().getFullYear()}</span> /  </span>
            <span className='font-bold font-InterTight tracking-wide'>Site Credits / </span>
            <span className='font-bold font-InterTight tracking-wide'>Privacy </span>


          </div>
        </div>
      </motion.div>
      

    </div>
  )
}

export default Footer



//  is a music app that allows you to listen to your favorite songs and albums. It is a platform that allows you to listen to your favorite songs and albums.