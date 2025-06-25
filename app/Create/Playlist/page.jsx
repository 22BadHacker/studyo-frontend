import React from 'react'
import Playlist from './Playlist'


export const metadata = {
    title: "Create Playlist — 𝗦𝘁ü𝗱𝘆𝗼 ",
}

const page = () => {
  return (
    <div className='w-full relative flex items-center justify-center'>
      <Playlist />
    </div>
  )
}

export default page