import React from 'react'
import Library from './Library'

export const metadata = {
    title: "Library — 𝗦𝘁ü𝗱𝘆𝗼",
}


const page = () => {
  return (
    <div className='min-h-screen pt-[190px] pb-[180px] '>
        <div className="container flex flex-col gap-[30px] relative h-auto">
            <Library />

        </div>
    </div>
  )
}

export default page
