'use client';
import { useEffect, useState } from 'react';
import React from 'react'
import logo from '@/public/Logo/Studyo_white.svg'
import Image from 'next/image'

const images = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img6.jpg',
  '/images/img7.jpg',
  '/images/img8.jpg',
  '/images/img9.jpg',
  '/images/img10.jpg',
  '/images/img11.jpg',

];

const Hero = () => {
const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 400); // Change every 1 second

    return () => clearInterval(interval); // Cleanup
  }, []);
  return (
    <div className="h-svh  flex items-end justify-center  w-full">
        <div className="w-screen absolute bottom-0  h-screen  overflow-hidden ">
            {images.map((src, i) => (
                <img
                key={i}
               
                src={src}
                alt={`Slide ${i}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                    i === index ? 'opacity-100' : 'opacity-0'
                }`}
                />
            ))}
        </div>

        <Image alt='Logo' className='w-[50%] opacity-95' src={logo} width={140} height={140}/>
    </div>
  )
}

export default Hero
