// app/components/Preloader.jsx
'use client';
import Image from 'next/image';
import logo from '@/public/Logo/Studyo_white.svg';
import { AnimatePresence, motion } from 'framer-motion';

const images = [
  '/images/img10.jpg',
  '/images/img4.jpg',
  '/images/img30.jpg',
  '/images/img16.jpg',
  '/images/img3.jpg',
  // '/images/img15.jpg',
  '/images/img22.jpg',

];

const Preloader = () => {
  return (

    <AnimatePresence>
        <div  className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">

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

        <Image
            alt="Logo"
            className="w-[50%] mix-blend-difference opacity-95 z-10"
            src={logo}
            width={140}
            height={140}
        />

        <div className="absolute fill-red-500 mix-blend-difference bottom-10 right-10">
            <svg className='fill-green-500 ' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg>
        </div>
        </div>

    </AnimatePresence>
  );
};

export default Preloader;
