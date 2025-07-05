'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppHook } from '@/context/AppProvider'
import toast from 'react-hot-toast'
import { IoMdAdd } from "react-icons/io";
import Link from 'next/link'

export default function PlaylistModal({ trackId, onClose }) {
  const { authToken, user } = useAppHook()
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState(false)

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
      setSelectedPlaylist(true)
      onClose()
    } catch (err) {
      toast.error('Failed to add track')
      console.error(err)
    }
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/70 flex-center">
      <div className="bg-white p-6 rounded-lg w-[400px] max-h-[80vh] overflow-y-auto">
        <div className="w-full border-b-[.5px] border-b-black/30 pb-4 flex items-center justify-between">
          <h3 className="text-main2/90 font-NeueMontreal text-xs font-semibold ">Add to Playlist</h3>
          <Link href={'/Create/Playlist'} className="text-main2 flex gap-3 items-center font-NeueMontreal text-sm font-semibold "><IoMdAdd/> New Playlist</Link>
        </div>

        <ul className="space-y-3">
          {playlists.map((playlist) => (
            <li
              key={playlist.id}
              className="flex justify-between items-center px-2 py-2 rounded hover:bg-main/10 transition"
            >
              <div className="flex gap-2 items-center">
                <img className='w-10 h-10 rounded' src={`http://localhost:8000/storage/${playlist.cover_image}`} alt="" />
                <span className="text-[15px] font-semibold font-NeueMontreal text-main2">{playlist.name}</span>

              </div>
              <button
                onClick={() => handleAddToPlaylist(playlist.id)}
                className="bg-main text-black text-xs px-3 py-1 rounded-full hover:bg-white"
              >
                {selectedPlaylist ? 'Added' : 'Add'}
              </button>
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="mt-6 font-semibold  text-main2/80 font-NeueMontreal text-sm py-2 rounded hover:bg-red-700"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  )
}
