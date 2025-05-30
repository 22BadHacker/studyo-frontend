'use client';
import Image from 'next/image';
import logo from '@/public/Logo/Studyo_white.svg';
import { motion } from 'framer-motion';

const images = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
  '/images/img7.jpg',
  '/images/img8.jpg',
  '/images/img9.jpg',
  '/images/img10.jpg',
];

const Hero = () => {
  return (
    <div className=" h-svh   flex items-center justify-center  w-full overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`Slide ${i}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: images.length * .2, // Total cycle duration
              delay: i * .3, // Delay based on image index
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Logo on top */}
      <Image
        alt="Logo"
        className="w-[50%] mix-blend-difference z-10"
        src={logo}
        width={140}
        height={140}
      />
    </div>
  );
};

export default Hero;
