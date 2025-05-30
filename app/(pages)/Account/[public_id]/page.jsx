import React from 'react'
import UserProfile from './UserProfile'

export const metadata = {
  title: "Profile — 𝗦𝘁ü𝗱𝘆𝗼 ",
}

const page = () => {
  return (
    <div className='w-full relative py-[120px] h-auto'>
      <div className="container h-screen">
        <UserProfile />
      </div>

    </div>
  )
}

export default page
