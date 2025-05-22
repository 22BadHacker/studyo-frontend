import React from 'react'
import Form from './Form'
import Logo from '@/public/bg.webp'
import Image from 'next/image'

export const metadata = {
  title: "Sign up — 𝗦𝘁ü𝗱𝘆𝗼 ",  
};
const page = () => {
  return (
    <div className='w-screen justify-center relative bg-[#121212]  h-screen overflow-hidden '>
       <Image className='absolute  saturate-[1.2]  opacity-75  top-20  left-0 w-full  object-cover' alt='' src={Logo} />
       <Form />
    </div>
  )
}

export default page


// rotate-180