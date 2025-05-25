import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/public/Logo/Studyo_white.svg';
import MusicButton from '@/Component/MusicButton';

const layout = ({children}) => {
  return (
    <div className='z-10 flex w-screen h-screen relative'>
        <Link className='z-[40]' href={'/'}>
            <Image alt='Logo' className='w-[120px] fixed top-7 left-9 ' src={Logo} width={140} height={140}/>
        </Link>
        <MusicButton />
        
        {children}
    </div>
  )
}

export default layout
