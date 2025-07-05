import React from 'react'
import FollowingPage from './FollowingPage'



export async function generateMetadata({ params }) {
  const res = await fetch(`http://localhost:8000/api/users/${params.public_id}`, {
    cache: "no-store", // always fetch fresh data
  });

  const data = await res.json();

  return {
    title: `Following — ${data.username}`, // customize as needed
  };
}


const page = () => {
  
  return (
    <div className='h-auto min-h-screen  pt-[190px] pb-[180px]'>
        <div className="container  h-auto">
            <FollowingPage/>
        </div>
      
    </div>
  )
}

export default page
