'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function EditAlbumModal({ show, album, onClose, onUpdate, token }) {
  const [name, setName] = useState('')
  const [cover, setCover] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (album) {
      setName(album.name)
      setPreview(`http://localhost:8000/storage/${album.cover_image}`)
    }
  }, [album])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    if (cover) formData.append('cover_image', cover)

    try {
      const res = await axios.post(`http://localhost:8000/api/albums/${album.id}/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      toast.success('Album updated!')
      onUpdate(res.data.album)
      onClose()
    } catch (err) {
      toast.error('Failed to update album')
    }
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-[#1e1e1e] text-white p-6 rounded-xl w-[90%] max-w-md shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Edit Album</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 rounded bg-black/20 border border-white/20"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input type="file" onChange={(e) => setCover(e.target.files[0])} />
          {preview && <img src={preview} className="mt-2 w-full rounded" />}
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white/10 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
