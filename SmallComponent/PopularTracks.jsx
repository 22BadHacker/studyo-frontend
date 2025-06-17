'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppHook } from '@/context/AppProvider'
import { useParams } from 'next/navigation'

export default function PopularTracks({ showModal, setShowModal, tracks }) {
  // const [showModal, setShowModal] = useState(false)
  const [allTracks, setAllTracks] = useState([])
  const { authToken } = useAppHook()
  const { public_id } = useParams();


  const togglePopular = async (trackId) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/tracks/${trackId}/toggle-popular`, {}, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setAllTracks(prev =>
        prev.map(track =>
          track.id === trackId ? { ...track, is_popular: res.data.is_popular } : track
        )
      );
    } catch (err) {
      console.error("Failed to toggle popular:", err)
    }
  }

  return (

    <>
    {showModal && (
        <div className='w-full fixed top-0 left-0 flex-center bg-black/50 backdrop-blur-2xl h-screen z-[600]'>
        <div className="  z-[200] flex items-center justify-center">
          <div className="border p-6 rounded-lg w-[600px] h-[500px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Select Hot Tracks</h2>
            <ul className="space-y-3 text-white">
              {tracks.map(track => (
                <li key={track.id} className="flex justify-between items-center">
                  <span className='text-white'>{track.title}</span>
                  <button
                    className={`px-3 py-1 rounded ${
                      track.is_popular ? 'bg-green-500 text-white' : 'bg-gray-300'
                    }`}
                    onClick={() => togglePopular(track.id)}
                  >
                    {track.is_popular ? 'Hot 🔥' : 'Make Hot'}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={setShowModal} className="mt-4 text-red-600 underline">Close</button>
          </div>
        </div>

        </div>
    
      )}
    </>
  );
}
