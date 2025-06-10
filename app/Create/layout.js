import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/public/Logo/Studyo_white.svg';
import Gradient from '@/public/images/img4.jpg'
// import Gradient from '@/public/images/img9.jpg'
// import Gradient from '@/public/images/img34.jpg'
import Nav from './Nav';

const layout = ({children}) => {
  return (
    <div className='relative min-h-screen bg-[#222222]'>

        <div className="fixed w-screen h-screen top-0 left-0">
            <Image alt='Logo' className='size-full object-cover' src={Gradient}/>
        </div>
      
      <div className="absolute right-6 top-9">
        <Nav />
      </div>


      <div className="w-full relative bg-black/40 min-h-screen h-full flex-center">
        {children}

      </div>
    </div>
  )
}

export default layout
