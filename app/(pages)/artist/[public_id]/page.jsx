import React from 'react'
import UserProfile from './UserProfile'

export async function generateMetadata({ params }) {
  const res = await fetch(`http://localhost:8000/api/users/${params.public_id}`, {
    cache: "no-store", // always fetch fresh data
  });

  const data = await res.json();

  return {
    title: `${data.username} — 𝗦𝘁ü𝗱𝘆𝗼 `, // customize as needed
  };
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
