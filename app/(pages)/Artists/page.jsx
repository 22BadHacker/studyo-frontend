import React from 'react'
import Artists from './Artists';

export const metadata = {
  title: "Artists — 𝗦𝘁ü𝗱𝘆𝗼 ",  
};


const page = () => {
  return (
    <div className='h-auto pt-[190px] pb-[180px] '>
        <div className="container  h-auto">
            <Artists />
        </div>
    </div>
  )
}

export default page
