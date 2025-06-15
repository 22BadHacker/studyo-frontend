import React from 'react'
import Nav from './Nav'
import Aside from './Aside'

const layout = ({children}) => {
  return (
    <div className='bg-[#121212]  w-full grid  gap-3 relative min-h-screen'>
        <Nav/>

        <aside className="w-[300px] fixed left-0 px-6 pb-6 pt-[92px] h-screen flex flex-col  border-r-[#222222] border-r-[.5px] ">
          <Aside />

        </aside>

        <div className="flex pl-[320px]  pb-10 pt-[94px] w-full overflow-y-scroll px-4 py-4 flex-col gap-4 ">
            {children}


        </div>


        
    </div>
  )
}

export default layout
