'use client';
import { useEffect, useState } from 'react';
import React from 'react'
import logo from '@/public/Logo/Studyo_white.svg'
import Image from 'next/image'

const images = [
  '/images/img10.jpg',
  '/images/img4.jpg',
  '/images/img30.jpg',
  '/images/img16.jpg',
  '/images/img3.jpg',
  '/images/img22.jpg',

];




const Hero = () => {
const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 600); // Change every 1 second

    return () => clearInterval(interval); // Cleanup
  }, []);
  return (
    <div className="fixed h-svh inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 ">
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

        <Image alt='Logo' className='w-[50%] mix-blend-difference' src={logo} width={140} height={140}/>
        <div className="absolute fill-red-500 mix-blend-difference bottom-10 right-10">
            <svg className='fill-green-500 ' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg>
        </div>
    </div>
  )
}

export default Hero
