'use client'
import React from 'react'
import { useAudio } from '@/context/AudioProvider'

export default function TrackListPlayer({ tracks }) {
  const { setQueue, playTrack } = useAudio()

  const handlePlayAll = () => {
    if (!tracks || tracks.length === 0) return

    const formattedQueue = tracks.map(track => ({
      id: track.id,
      title: track.title,
      src: `http://localhost:8000/storage/${track.file_path}`,
    }))

    setQueue(formattedQueue)
    playTrack(formattedQueue[0])
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tracks</h2>
        <button
          onClick={handlePlayAll}
          className="bg-black text-white px-4 py-1 rounded hover:bg-green-600 transition"
        >
          ▶️ Play All
        </button>
      </div>

      <ul className="space-y-3">
        {tracks?.map(track => (
          <li
            key={track.id}
            className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            <span>{track.title}</span>
            <button
              onClick={() =>
                playTrack({
                  id: track.id,
                  title: track.title,
                  src: `http://localhost:8000/storage/${track.file_path}`,
                })
              }
              className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              ▶️ Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
