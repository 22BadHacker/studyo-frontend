import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/public/Logo/Studyo_white.svg';
import MusicButton from '@/Component/MusicButton';

const layout = ({children}) => {
  return (
    <div className='z-10 flex w-screen h-screen relative'>
        {/* <Link className='z-[40]' href={'/'}>
            <Image alt='Logo' className='w-[120px] fixed top-7 left-9 ' src={Logo} width={140} height={140}/>
        </Link> */}
      <div className="absolute top-6 left-9">
          <Link className='z-[70]  group relative inline-block overflow-hidden  h-[40px] ' href={'/'}>
            <Image alt='Logo' className='w-[120px] block transition-transform duration-300 group-hover:-translate-y-full h-full' src={Logo} width={120} height={120}/>
            <Image alt='Logo' className='w-[120px] absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full h-full' src={Logo} width={120} height={120}/>
          </Link>

      </div>


        <MusicButton />
        
        {children}
    </div>
  )
}

export default layout
