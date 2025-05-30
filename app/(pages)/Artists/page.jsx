import React from 'react'
import Artists from './Artists';

export const metadata = {
  title: "Artists — 𝗦𝘁ü𝗱𝘆𝗼 ",  
};


const page = () => {
  return (
    <div className='py-[140px] w-full h-auto'>
        <div className="container  h-auto">
            <Artists />
        </div>
    </div>
  )
}

export default page
