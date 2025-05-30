'use client';
import { useEffect, useState } from 'react';
import React from 'react'
import logo from '@/public/Logo/Studyo_white.svg'
import logo2 from '@/public/Logo/MounirLagzouliWhite.svg'
import Image from 'next/image'

const images = [
  '/images/img10.jpg',
  '/images/img4.jpg',
  '/images/img30.jpg',
  '/images/img16.jpg',
  '/images/img3.jpg',
  '/images/img22.jpg',
  '/images/img32.jpg',
  '/images/img17.jpg',
  '/images/img27.jpg',
  '/images/img28.jpg',

];




const Hero = () => {
const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 1000); // Change every 1 second

    return () => clearInterval(interval); // Cleanup
  }, []);
  return (
    <div className="absolute h-svh inset-0 z-[9999] bg-black flex items-center flex-col justify-center overflow-hidden">
        <div className="absolute inset-0  ">
            {images.map((src, i) => (
                <img
                key={i}
               loading='lazy'
                src={src}
                alt={`Slide ${i}`}
                className={`absolute saturate-[1.2] top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                    i === index ? 'opacity-100' : 'opacity-0'
                }`}
                />
            ))}
        </div>
        {/* <div className="flex flex-col gap-6 items-right"></div> */}
        <div className="flex mix-blend-difference relative -top-8 -left-[350px]  items-center">
          <Image alt='Logo' className='w-[220px]  ' src={logo2} width={140} height={140}/>
          {/* <p className='text-[22px] pb-[3px] tracking-wider font-NeueMontreal '>' s</p> */}
        </div>
        <Image alt='Logo' className='w-[55%] mix-blend-difference' src={logo} width={140} height={140}/>

        <div className="absolute fill-green-500   mix-blend-difference bottom-9 right-9">
            <svg className='' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg>
        </div>
    </div>
  )
}

export default Hero
