import React from 'react'
import UploadTrackForm from './UploadTrackForm'


export const metadata = {
  title: "Create Track — 𝗦𝘁ü𝗱𝘆𝗼 ",
}

const page = () => {
  return (
    <div className='relative py-8 flex-center h-auto w-full min-h-screen'>

      <div className=" min-h-screen flex-center">
        
          <UploadTrackForm />
      </div>
    </div>
  )
}

export default page


// w-[600px]