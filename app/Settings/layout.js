import React from 'react'
import Nav from './Nav'
import Footer from '@/Component/Footer'

const layout = ({children}) => {
  return (
    <div className='min-h-screen  h-auto   relative w-full  items-center flex-col   bg-[#111011]'>
        <Nav />          

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
