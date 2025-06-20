import React from 'react'
import Album from './Album';

export async function generateMetadata({ params }) {
  const res = await fetch(`http://localhost:8000/api/albums/${params.public_id}`, {
    cache: "no-store", 
    withCredentials: true,
  });

  const data = await res.json();

  return {
    title: `${data.album.title} — ${data.album.user.username} `, 
  };
}

const page = () => {
  return (
     <div  className='w-full relative py-[120px] h-auto'>
          <div className="container min-h-screen">
            <Album />
          </div>
    
        </div>
  )
}

export default page
