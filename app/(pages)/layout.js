import Header from '@/Component/Header'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='grid   grid-rows-[auto_1fr_auto] h-screen overflow-y-scroll'>

        <Header />
        {children}
        <footer>Footer</footer>
    </div>
  )
}

export default layout
