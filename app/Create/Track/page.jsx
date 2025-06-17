import React from 'react'
import UploadTrackForm from './UploadTrackForm'

export const metadata = {
    title: "Create Track — 𝗦𝘁ü𝗱𝘆𝗼 ",
}

const page = () => {
  return (
    <div className='w-full relative flex items-center justify-center'>
        <UploadTrackForm />
    </div>
  )
}

export default page
