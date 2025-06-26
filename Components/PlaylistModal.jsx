'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppHook } from '@/context/AppProvider'
import toast from 'react-hot-toast'

export default function PlaylistModal({ trackId, onClose }) {
  const { authToken, user } = useAppHook()
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/users/${user.id}/playlists`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        setPlaylists(res.data)
      } catch (err) {
        toast.error('Failed to load playlists')
      }
    }

    fetchPlaylists()
  }, [user, authToken])

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/playlists/${playlistId}/tracks`,
        { track_id: trackId },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      toast.success('Track added to playlist!')
      onClose()
    } catch (err) {
      toast.error('Failed to add track')
    }
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/70 flex-center">
      <div className="bg-[#121212] p-6 rounded-lg w-[400px] max-h-[80vh] overflow-y-auto">
        <h3 className="text-white font-bold text-lg mb-4">Select Playlist</h3>
        <ul className="space-y-3">
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className="flex justify-between items-center bg-white/5 px-3 py-2 rounded hover:bg-main/10 transition"
            >
              <span className="text-white">{playlist.name}</span>
              <button
                onClick={() => handleAddToPlaylist(playlist.id)}
                className="bg-main text-black text-sm px-3 py-1 rounded-full hover:bg-white"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
