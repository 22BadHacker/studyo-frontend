import React from 'react'
import Nav from './Nav'
import Footer from '@/Component/Footer'

const layout = ({children}) => {
  return (
    <div className='min-h-screen grid  grid-rows-[auto_1fr_auto] relative w-full  items-center flex-col gap-[70px]  bg-[#111011]'>
        <Nav />

        <div className="flex flex-col gap-4 container">
          <h1 className='cursor-pointer w-fit  font-NeueMontreal uppercase leading-[.85]  text-[#d8262c] font-[600] tracking-[0.015em] text-[8vw] '>Settings </h1>
        </div>
           

       <div className="w-full  flex justify-center">
          {children}
        </div> 




         {/* <footer style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)'}} className="w-full  h-[640px] relative bg-[#080808]">
                <div className="fixed flex  bottom-0 w-full h-[640px]">
                  <Footer />
                </div>
              </footer> */}
        

    </div>
  )
}

export default layout
