'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useAppHook } from '@/context/AppProvider'

export default function CreateAlbumPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [release_date, setReleaseDate] = useState('')
  const [genreId, setGenreId] = useState('')
  const [genres, setGenres] = useState([])
  const router = useRouter()
  const {authToken} = useAppHook()

  // Fetch genres on mount
   useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/genres', {
          withCredentials: true,
        });
        setGenres(res.data);
      } catch (err) {
        console.error('Failed to fetch genres:', err);
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('genre_id', genreId)
    formData.append('release_date', release_date)
    if (coverImage) formData.append('cover_image', coverImage)

    try {
      await axios.post('http://localhost:8000/api/albums', formData, {
        headers: { 
            'Content-Type': 'multipart/form-data', 
            Authorization: `Bearer ${authToken}`
         }
      })
      router.push('/create/album') // Redirect after success
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className=" flex flex-col gap-9 ">
        <div className="flex leading-snug flex-col lead gap-1">
            <p className='text-white/95 font-semibold tracking-wide font-NeueMontreal text-[15px]'>Create Album</p>
            <h2 className="text-[37px] mix-blend-difference text-white font-NeueMontreal capitalize font-semibold">Your Next Album Starts Here</h2>

        </div>
      <form onSubmit={handleSubmit} className="space-y-4">


       
        <input
          type="text"
          placeholder="Album Title"
          name='title'
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          name='description'
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
          required
          name='genre_id'
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full p-2 border rounded"
          value={release_date}
          name='release_date'
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          name='cover_image'
          onChange={(e) => setCoverImage(e.target.files[0])}
        />

          <div className="w-full justify-end flex">
                <button
                type="submit"
                className="px-6 py-[14px] font-NeueMontreal font-semibold  text-black bg-white rounded-full hover:bg-green-500 cursor-pointer duration-200 ease-in-out transition"
                >
                Upload Album
                </button>

          </div>
      </form>
    </div>
  )
}
