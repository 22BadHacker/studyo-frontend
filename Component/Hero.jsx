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
  '/images/img12.jpg',
  '/images/img13.jpg',
  '/images/img14.jpg',
  '/images/img15.jpg',
  '/images/img16.jpg',
  '/images/img17.jpg',
  '/images/img18.jpg',
  '/images/img19.jpg',
  '/images/img20.jpg',
  '/images/img22.jpg',
  '/images/img21.jpg',
  '/images/img23.jpg',
  '/images/img24.jpg',
  '/images/img25.jpg',
  '/images/img26.jpg',
  '/images/img27.jpg',
  '/images/img28.jpg',
  '/images/img29.jpg',
  '/images/img30.jpg',
  '/images/img31.jpg',
  '/images/img32.jpg',
  '/images/img33.jpg',
  '/images/img34.jpg',

];

const Hero = () => {
const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 300); // Change every 1 second

    return () => clearInterval(interval); // Cleanup
  }, []);
  return (
    <div className="h-svh pb-10  flex items-end justify-center  w-full">
        <div className="w-screen absolute top-0  h-screen  overflow-hidden ">
            {images.map((src, i) => (
                <img
                key={i}
               
                src={src}
                alt={`Slide ${i}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity ease-in-out duration-300 ${
                    i === index ? 'opacity-100' : 'opacity-0'
                }`}
                />
            ))}
        </div>
        
        <Image alt='Logo' className='w-[100%] mix-blend-difference ' src={logo} width={140} height={140}/>
    </div>
  )
}

export default Hero
