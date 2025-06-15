'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAppHook } from '@/context/AppProvider'
import { BiChevronDown } from 'react-icons/bi'
import { GoChevronLeft } from 'react-icons/go'
import Link from 'next/link'

export default function UploadTrackForm() {
  const [title, setTitle] = useState('')
  const [albumId, setAlbumId] = useState('')
  const [genreId, setGenreId] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [trackFile, setTrackFile] = useState(null)
  const [genres, setGenres] = useState([])
  const [albums, setAlbums] = useState([])
  const [coverImage, setCoverImage] = useState(null)

  const { authToken } = useAppHook()

  useEffect(() => {
    axios.get('http://localhost:8000/api/genres').then(res => setGenres(res.data))
    // axios.get('http://localhost:8000/api/albums', { withCredentials: true }, {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // }).then(res => setAlbums(res.data))

    axios.get("http://localhost:8000/api/my-albums", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    withCredentials: true,
    })
    .then(res => setAlbums(res.data))
    .catch(err => console.error("❌ Failed to fetch albums:", err));
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!trackFile) return toast.error('Please upload a track file')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('album_id', albumId)
    formData.append('genre_id', genreId)
    formData.append('release_date', releaseDate)
    formData.append('file_path', trackFile)
    if (coverImage) {
    formData.append('cover_image', coverImage)
    }

    try {
      const res = await axios.post('http://localhost:8000/api/tracks', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
        
        
      })

      toast.success(`Track "${title}" uploaded!`)
      setTitle('')
      setTrackFile(null)
      setReleaseDate('')
      setGenreId('')
      setAlbumId('')
    } catch (err) {
      console.error(err)
      toast.error(' Upload failed')
    }
  }

  return (
    <div className="flex max-w-[800px]  pt-5 flex-col gap-9">
      <Link href={'/Library'} className='size-12 absolute top-3 mb-1 left-4   flex-center text-white bg-main2 rounded-full text-[23px]'><GoChevronLeft/></Link>
      <div className="flex leading-snug flex-col gap-1">
        <p className="text-white/95 font-semibold tracking-wide font-NeueMontreal text-[15px]">Upload Your Track</p>
        <h2 className="text-[37px] text-white font-NeueMontreal font-semibold">Your Next Track Starts Here</h2>
      </div>

      
      <form  onSubmit={handleSubmit} className="space-y-6 pt-3">

        <div className="flex w-full relative ">
          <label className="text-[14px] absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal">Track Title</label>
          <input
            type="text"
            className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px] "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex w-full relative ">
          <label className="text-[14px] absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal">Album</label>
          <select
            className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px] "
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
          >
            <option value="">None</option>
            {albums.map(album => (
              <option key={album.id} value={album.id}>{album.title}</option>
            ))}
          </select>
        </div>

        <div className="flex w-full relative ">
          <label className="text-[14px] absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal">Genre</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            required
          >
            <option value="">Select Genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Release Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>

        <div>
            <label className="block mb-1 font-medium">Cover Image</label>
            <input
                type="file"
                accept="image/*"
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setCoverImage(e.target.files[0])}
            />
        </div>

        <div>
          <label className="block mb-1 font-medium">Track File (.mp3/.wav)</label>
          <input
            type="file"
            // accept="audio/*"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setTrackFile(e.target.files[0])}
            required
          />
        </div>

        

        <button
          type="submit"
          className="w-full bg-black text-white rounded px-4 py-2 hover:bg-green-600 transition"
        >
          Upload Track
        </button>
      </form>
    </div>
  )
}
