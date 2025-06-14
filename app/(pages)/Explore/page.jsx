import React from 'react'
import Search from './Search';
import DualMarquee from './DualMarquee';

export const metadata = {
  title: "Explore & Discover — 𝗦𝘁ü𝗱𝘆𝗼 ",  
};

const page = () => {
  return (
    <div className='h-auto pt-[200px] pb-[180px] '>
      <Search/>
     
     {/* <div className='container'>
      <DualMarquee />
     </div> */}
    </div>
  )
}

export default page
