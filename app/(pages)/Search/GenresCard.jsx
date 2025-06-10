'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useParallaxEffect } from '@/SmallComponent/useParallax';
import { HiArrowLongRight } from "react-icons/hi2";
import { useEffect, useLayoutEffect, useRef } from 'react';
import { genreHashtags } from '@/Data/data';
import Link from 'next/link';
import gsap from 'gsap';
import scrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(scrollTrigger);



const GenreCard = ({ genre, index }) => {

  const container = useRef(null)
  const imagee = useRef(null)
  const imageRef = useRef(null);

  useLayoutEffect(() => {
   const context = gsap.context(() => {
     const tl = gsap.timeline({
       scrollTrigger: {
         trigger: container.current,
         start: 'top bottom',
         end: 'bottom top',
         scrub: true,
       }
     })

     tl.to(imagee.current, {y: 60}, 0);

    //  tl.to(imageRef.current, {scale: .8}, 0);

    })


    return () => context.revert()
  }, []);

  return (
    <motion.div ref={container} className="flex w-full genres even:col-span-2">
      <motion.div
        ref={imagee}
        className="h-[450px] group chiild p-[10px] odd:bg-main bg-[#dddee2] flex flex-col justify-end items-start gap-1 w-[380px] relative  cursor-pointer"
        initial={{ opacity: 0,  filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
          <motion.img
            ref={imageRef}
            src={genre.image}
            alt={genre.name}
            loading='lazy'
            className="absolute  transition-all duration-200 ease-in-out shadow-2xl top-[6px] right-[6px] w-[210px] h-[250px] object-cover saturate-[1.2]"
          />
        

        <p className="absolute opacity-90 text-[15.5px] text-[#b2b2b2] font-NeueMontreal top-[11px] left-[11px] mix-blend-difference">
          00{index + 1}
        </p>


        <div className="flex flex-wrap relative font-medium gap-3 top-[1px] items-center text-[11.8px]">
          {(genreHashtags[genre.name] || []).map((tag) => (
              <span key={tag} className="text-[#222]/80 hover:text-red-500">#{tag.replace('#', '')}</span>
            ))}
        </div>

        <motion.div  className="w-full   top-[2px] relative flex items-center justify-between gap-2 text-[#222222] font-bold text-[27px] tracking-tight z-10 capitalize font-NeueMontreal transition-all duration-200">
          <Link className='h-[38px]  relative inline-block overflow-hidden' href={'/'}>
            <span className='block transition-transform duration-300  group-hover:-translate-y-full ease-in-out'>{genre.name}</span>
            <span className="absolute ease-in-out left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full">
              {genre.name}
            </span>
          </Link>
          <HiArrowLongRight />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GenreCard;
