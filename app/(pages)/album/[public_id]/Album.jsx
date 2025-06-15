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
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{album.title}</h1>
      {/* <p className="mb-6">{album.description}</p> */}
      <img className='size-[300px]' src={`http://localhost:8000/storage/${album.cover_image}`} alt="" />

      <h2 className="text-xl font-semibold mb-2">Tracks:</h2>
      <ul className="space-y-2">
        {album.tracks.map(track => (
          <li key={track.id} className="border p-3 rounded bg-white/5">
            <span className="font-medium">{track.title}</span>
          </li>
        ))}
      </ul>
    </div>
      
    </>
  )
}

export default Album
