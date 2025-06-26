import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='w-full '>
        <div className="container flex justify-center">
            <div className="w-full w-[900px]   h-screen grid grid-cols-2 pt-[180px]">  <div className="">hheguguy</div>
                {children}

            </div>

        </div>

    </div>
  )
}

export default Layout
