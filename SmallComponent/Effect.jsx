'use client'
import React from 'react'
import Image from 'next/image';
import logo from '@/public/Logo/Studyo_white.svg'
import { motion } from 'framer-motion';


const Effect = () => {

  return (
    <>
      <motion.div  initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }} className="container2 relative  pb-4 pt-20">
        <Image  alt='Logo' className='w-full opacity-90' src={logo}  width={140} height={140}/>
        </motion.div>
    </>
  )
}

export default Effect

