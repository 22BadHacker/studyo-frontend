import React from 'react'
import Nav from './Nav'
import Footer from '@/Component/Footer'

const layout = ({children}) => {
  return (
    <div className='min-h-screen grid  grid-rows-[auto_1fr_auto] relative w-full  items-center flex-col gap-[70px]  bg-[#111011]'>
        <Nav />

        <div className="pt-10 container">
          <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[6.05vw] '>Settings </h1>
        </div>

       <div className="w-full  min-h-screen flex justify-center">
          {children}
        </div> 
         <footer style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)'}} className="w-full  h-[640px] relative bg-[#080808]">
                <div className="fixed flex  bottom-0 w-full h-[640px]">
                  <Footer />
                </div>
              </footer>
        
        {/* <div className="flex  max-w-[1100px] py-6  items-center  justify-between w-full mx-auto">
          <span className='font-medium text-[14px] uppercase hover:text-green-500 duration-200 ease-in-out cursor-pointer transition-all font-InterTight tracking-wide'>© <span className='text-[16px]'>{new Date().getFullYear()}</span> Stüdyo llc.ALL RIGHTS RESERVED  </span>

          <div className="flex text-[14px] gap-2 items-center">
            <span className='font-medium uppercase hover:text-green-500 duration-200 ease-in-out cursor-pointer transition-all font-InterTight tracking-wide'>Privacy Policy</span>
            |
            <span className='font-medium uppercase hover:text-green-500 duration-200 ease-in-out cursor-pointer transition-all font-InterTight tracking-wide'>Terms of Use</span>
          </div>
        </div> */}

    </div>
  )
}

export default layout
