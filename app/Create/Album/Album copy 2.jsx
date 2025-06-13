'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAppHook } from '@/context/AppProvider'

export default function CreateAlbumPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [genre_id, setGenreId] = useState('')
  const [genres, setGenres] = useState([])
  const [releaseDay, setReleaseDay] = useState('')
  const [releaseMonth, setReleaseMonth] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const router = useRouter()
  const { authToken } = useAppHook()

  useEffect(() => {
    axios.get('http://localhost:8000/api/genres', {
      withCredentials: true,
    }).then(res => setGenres(res.data))
      .catch(err => console.error('Failed to fetch genres:', err))
  }, [])

  const handleDrop = (e) => {
    e.preventDefault()
    setCoverImage(e.dataTransfer.files[0])
  }

  const handleDragOver = (e) => e.preventDefault()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('genre_id', genre_id)

    const fullReleaseDate = `${releaseYear}-${releaseMonth}-${releaseDay}`
    formData.append('release_date', fullReleaseDate)

    if (coverImage) formData.append('cover_image', coverImage)

    try {
      await axios.post('http://localhost:8000/api/albums', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`
        }
      })
      router.push('/create/album')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-9">
      <div className="flex leading-snug flex-col gap-1">
        <p className="text-white/95 font-semibold tracking-wide font-NeueMontreal text-[15px]">Create Album</p>
        <h2 className="text-[37px] text-white font-NeueMontreal font-semibold">Your Next Album Starts Here</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          placeholder="Album Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

       

        {/* Custom Genre Dropdown */}
        <div className="relative w-full">
          <select
            className="w-full p-2 border rounded bg-white text-black"
            value={genre_id}
            onChange={(e) => setGenreId(e.target.value)}
            required
            name='genre_id'
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>

        {/* Release Date Inputs */}
        <div className="flex gap-2">
          <input
            type="text"
            maxLength={4}
            pattern="\d{4}"
            placeholder="YYYY"
            className="w-1/3 p-2 border rounded"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
          />
          <input
            type="text"
            maxLength={2}
            pattern="\d{1,2}"
            placeholder="MM"
            className="w-1/3 p-2 border rounded"
            value={releaseMonth}
            onChange={(e) => setReleaseMonth(e.target.value)}
            required
          />
          <input
            type="text"
            maxLength={2}
            pattern="\d{1,2}"
            placeholder="DD"
            className="w-1/3 p-2 border rounded"
            value={releaseDay}
            onChange={(e) => setReleaseDay(e.target.value)}
            required
          />
        </div>

         <textarea
          placeholder="Description"
          className="w-full min-h-[120px] p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Drag-and-Drop Zone */}
        <div
          className={`border-2 min-h-[200px] border-dashed rounded p-6 text-center ${coverImage ? 'border-green-400' : 'border-gray-300'} transition`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="text-sm mb-2 text-white/70">
            {coverImage ? `Selected: ${coverImage.name}` : 'Drag & Drop Cover Image Here or Click Below'}
          </p>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded bg-white"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-[14px] font-NeueMontreal font-semibold text-black bg-white rounded-full hover:bg-green-500 transition"
          >
            Upload Album
          </button>
        </div>
      </form>
    </div>
  )
}
