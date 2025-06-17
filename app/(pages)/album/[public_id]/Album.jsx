'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

const Album = () => {
    const { public_id } = useParams()
  const [album, setAlbum] = useState(null)

  useEffect(() => {
    if (public_id) {
      axios.get(`http://localhost:8000/api/albums/${public_id}`)
        .then(res => setAlbum(res.data))
        .catch(err => console.error(err))
    }
  }, [public_id])

//   if (!album) return <p className="text-white">Loading...</p>
if (!album) return <div className='h-screen flex-center container'> <svg className='fill-green-500 relative -top-[170px]' width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="13" cy="3" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12z 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g></svg></div>;

  return (
    <>
    <div className="fixed w-full h-[90%] top-0 left-0">
        <img className='w-full opacity-65 h-full object-top object-cover ' src={`http://localhost:8000/${album.user.profile_image}`} alt="" />
        <div className="w-full  z-[6] opacity-95  bg-gradient-to-b from-[#000000]/100 via-[#000000]/50 to-[#000000]/100 absolute top-0 left-0 h-full" />
    </div>

    <div className="text-white pt-12 relative z-20">
      <div className="flex gap-5 items-end">
        <img className='size-[250px] rounded-md' src={`http://localhost:8000/storage/${album.cover_image}`} alt="" />
        <div className="flex flex-col">
          {/* <h5 className='text-white/80  font-semibold uppercase tracking-wide font-NeueMontreal text-[13px]'>Album</h5> */}
          <h1 className="text-[72px] pb-2 capitalize leading-[1.1]  font-NeueMontreal  text-white  flex gap-3 items-center  font-bold">{album.title}</h1>
          <div className="flex pb-7 font-NeueMontreal items-center gap-3">
            <div className="size-10  bg-green-500/50 rounded-full p-[1px]">
              <img className='size-full  rounded-full  object-cover ' src={`http://localhost:8000/${album.user.profile_image}`} alt="" />

            </div>
              
              <h5 className='text-white/80  font-semibold capitalize tracking-wide font-NeueMontreal text-[13px]'>{album.user.username} </h5>
          </div>

          <h4 className='text-white/80 flex items-end gap-1  font-medium  tracking-wide font-NeueMontreal text-[13px]'>Album <span className='size-1 mb-1 rounded-full bg-white'></span> {album.tracks.length} songs </h4>
          <p className='text-white/80 flex items-end gap-1  font-medium  tracking-wide font-NeueMontreal text-[13px] pt-1'>{album.release_date}</p>


        </div>

      </div>
      {/* <p className="mb-6">{album.description}</p> */}

      {/* <h2 className="text-xl font-semibold mb-2">Tracks:</h2>
      <ul className="space-y-2">
        {album.tracks.map(track => (
          <li key={track.id} className="border p-3 rounded bg-white/5">
            <span className="font-medium">{track.title}</span>
          </li>
        ))}
      </ul> */}
    </div>
      
    </>
  )
}

export default Album
