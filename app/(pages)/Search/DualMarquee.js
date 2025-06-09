'use client'
import React, {useEffect, useRef} from 'react'
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image'
import Hand from '@/public/Hand.jpeg'

const DualMarquee = () => {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  })


  return (
    <main className="overflow-hidden">
      <div className='h-[50vh]'/>
      <div ref={container}>
        <Slide src={Hand} direction={'left'} left={"-40%"} progress={scrollYProgress}/>
        <Slide src={Hand} direction={'right'} left={"-25%"} progress={scrollYProgress}/>
        <Slide src={Hand} direction={'left'}  left={"-75%"} progress={scrollYProgress}/>
      </div>
      <div className='h-[50vh]' />
    </main>
  );
}

export default DualMarquee



const Slide = (props) => {
  const direction = props.direction == 'left' ? -1 : 1;
  const translateX = useTransform(props.progress, [0, 1], [150 * direction, -150 * direction])
  return (
    <motion.div style={{x: translateX, left: props.left}} className="relative flex whitespace-nowrap">
      <Phrase src={props.src}/>
      <Phrase src={props.src}/>
      <Phrase src={props.src}/>
    </motion.div>
  )
}

const Phrase = ({src}) => {

  return (
    <div className={'px-5 flex gap-5 items-center'}>
      <p className='text-[7.5vw] font-semibold font-NeueMontreal leading-tight'>Find the Sound That Moves You</p>
      <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image style={{objectFit: "cover"}} src={src} alt="image" fill/>
      </span>
    </div>
  )
}
