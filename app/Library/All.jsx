'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppHook } from '@/context/AppProvider'
import Album from './Album'

const All = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const [albums, setAlbums] = useState([])
    const [tracks, setTracks] = useState([])
    const [playlists, setPlaylists] = useState([])
    const { authToken } = useAppHook()

    useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(res => {
      setAlbums(res.data.albums)
      setTracks(res.data.tracks)
      setPlaylists(res.data.playlists)
    })
    .catch(err => console.error(err))
  }, [])

    


    const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <>
            <h1 className='text-4xl text-green-500  w-fit cursor-pointer  pb-4  font-NeueMontreal font-semibold'>Welcome to your Library</h1>
        
            <div className="flex flex-col gap-4">
                <h1 className='text-2xl hover:text-green-500 ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Albums by </h1>
                {
                    albums.length > 0 ? (
                        <div className=" relative -left-2 w-full  grid grid-cols-7 gap-[2px]">
                        {albums.map(album => (
                            <Album key={album.id} public_id={album.public_id} id={album.id} title={album.title} cover_image={album.cover_image} release_date={album.release_date} />
                        ))}
                        </div>
                    ) : (
                        <div className="p-4 text-white">No Albums Found</div>

                    )
                }

            </div>
        </>;
      case 'tracks':
        return <div className="p-4 text-white">Your Tracks</div>;
      case 'albums':
        return <>
        <section>
            <h1 className='text-2xl hover:text-green-500 ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Albums by </h1>
            {
                albums.length > 0 ? (
                    <div className=" relative -left-2 w-full  grid grid-cols-7 gap-[2px]">
                    {albums.map(album => (
                        <Album key={album.id} public_id={album.public_id} id={album.id} title={album.title} cover_image={album.cover_image} release_date={album.release_date} />
                    ))}
                    </div>
                ) : (
                    <div className="p-4 text-white">No Albums Found</div>

                )
            }

        </section>
        </>;
        // return <div className=""><h1 className='text-2xl hover:text-green-500 ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Albums</h1></div>;
      case 'upload':
        return <div className="p-4 text-white">Upload Center</div>;
      case 'followers':
        return <div className="p-4 text-white">Followers</div>;
      case 'analytics':
        return <div className="p-4 text-white">Analytics</div>;
      default:
        return null;
    }
  };


  return (
    <>

    <div className='min-h-screen flex flex-col gap-7'>

        <div className="flex w-full gap-4 items-center">
            <p onClick={() => setActiveTab('overview')} className={`${activeTab === 'overview' && 'bg-white text-main2'} cursor-pointer text-[14px] text-main bg-main2 px-7 py-2 font-NeueMontreal font-medium rounded-full`}>All</p>
            <p onClick={() => setActiveTab('albums')} className={`${activeTab === 'albums' && 'bg-white text-main2'} cursor-pointer text-[14px] text-main bg-main2 px-7 py-2 font-NeueMontreal font-medium rounded-full`}>Albums</p>
            <p onClick={() => setActiveTab('tracks')} className={`${activeTab === 'tracks' && 'bg-white text-main2'} cursor-pointer text-[14px] text-main bg-main2 px-7 py-2 font-NeueMontreal font-medium rounded-full`}>Tracks</p>
            <p className='bg-main2 text-[14px] px-7 py-2 font-NeueMontreal font-medium rounded-full'>Playlist</p>
            <p className='bg-main2 text-[14px] px-7 py-2 font-NeueMontreal font-medium rounded-full'>Biography</p>
        </div>


        <div className="flex pt-4 flex-col gap-4">
            {/* <h1 className='text-2xl hover:text-green-500 ease-in-out duration-200 w-fit cursor-pointer   text-white/95 font-NeueMontreal font-semibold'>Albums</h1> */}
            {renderContent()}

        </div>


        
    </div>
      
    </>
  )
}

export default All
