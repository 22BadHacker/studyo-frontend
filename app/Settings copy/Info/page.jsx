import React from 'react'
import Info from './info'

export const metadata = {
    title: "Info — 𝗦𝘁ü𝗱𝘆𝗼 ",
}

const page = () => {
  return (
    <div  className='w-full bg-[#121212] z-[1] relative  pb-[160px] h-auto'>
            
            {/* <div className="absolute top-0 blur-2xl z-[-2] size-full bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" /> */}
            <div className="container relative z-[20] h-auto">
              <Info />
            </div>
      
          </div>
  )
}

export default page
