import Footer from '@/Component/Footer'
import Header from '@/Component/Header'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='grid bg-[#000000]  hide-scrollbar grid-rows-[auto_1fr_auto] h-screen overflow-y-scroll'>
      <div className="w-full fixed top-0 left-0 right-0 z-50  transition-all " >
        <Header />
      </div>
        {children}
        <Footer />
    </div>
  )
}

export default layout


// 0d0d0d
// c3c6c8
// 222222
// e9e9e9
// 202020


// bg-black/10 backdrop-blur-[10px]