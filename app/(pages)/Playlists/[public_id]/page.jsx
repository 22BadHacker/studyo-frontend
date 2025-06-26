import React from 'react'
import Playlist from './Playlist';

export async function generateMetadata({ params }) {
  const res = await fetch(`http://localhost:8000/api/playlists/${params.public_id}`, {
    cache: "no-store", 
    withCredentials: true,
  });

  const data = await res.json();

  return {
    title: `${data.playlist.name} — ${data.playlist.user.username}`, 
  };
}



const page = () => {
  return (
    <div className='w-full  relative py-[120px] h-auto'>
        <div className="container min-h-screen">
            <Playlist />
        </div>
        
    </div>
  )
}

export default page
