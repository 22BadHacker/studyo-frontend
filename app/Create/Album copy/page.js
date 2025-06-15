import React from 'react'
import CreateAlbumPage from '../../Library/Create_album/Album'

export const metadata = {
  title: "Create Album — 𝗦𝘁ü𝗱𝘆𝗼 ",
}

const page = () => {
  return (
    <div className='relative py-8 flex-center h-auto w-full min-h-screen'>

      <div className=" min-h-screen flex-center">
        <CreateAlbumPage/>

      </div>
    </div>
  )
}

export default page


// w-[600px]