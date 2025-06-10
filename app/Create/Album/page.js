import React from 'react'
import CreateAlbumPage from './Album'

export const metadata = {
  title: "Create Album — 𝗦𝘁ü𝗱𝘆𝗼 ",
}

const page = () => {
  return (
    <div className='relative flex-center  w-full h-screen'>

      <div className=" w-[900px]">
        <CreateAlbumPage/>

      </div>
    </div>
  )
}

export default page
