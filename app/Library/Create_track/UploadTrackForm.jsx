'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAppHook } from '@/context/AppProvider'
import { BiChevronDown } from 'react-icons/bi'
import { GoChevronLeft } from 'react-icons/go'
import Link from 'next/link'
import GenreDropdown from '../Create_album/GenreDropdown'
import MonthDropdown from '../Create_album/MothDropdown'
import AlbumDropdown from './AlbumDropdown'
import CoverUpload from '@/SmallComponent/CoverUpload'
import TrackUpload from '@/SmallComponent/TrackUpload'
import Svg from '@/Component/Svg'

export default function UploadTrackForm() {
  const [title, setTitle] = useState('')
  const [albumId, setAlbumId] = useState(null)
  const [genreId, setGenreId] = useState('')
   const [releaseDay, setReleaseDay] = useState('')
  const [releaseMonth, setReleaseMonth] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [trackFile, setTrackFile] = useState(null)
  const [genres, setGenres] = useState([])
  const [albums, setAlbums] = useState([])
  const [coverImage, setCoverImage] = useState(null)
  const [loading, setLoading] = useState(false);

  const { authToken } = useAppHook()

  useEffect(() => {
    axios.get('http://localhost:8000/api/genres').then(res => setGenres(res.data))

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
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    if (!trackFile) return toast.error('Please upload a track file')
    // const fullReleaseDate = `${releaseYear}-${releaseMonth.padStart(2, '0')}-${releaseDay.padStart(2, '0')}`
  const fullReleaseDate = `${releaseYear?.padStart(4, '0')}-${releaseMonth?.padStart(2, '0')}-${releaseDay?.padStart(2, '0')}`

    if (!title || !trackFile || !genreId || !releaseYear || !releaseMonth || !releaseDay) {
      toast.error("Please fill in all required fields.")
      setLoading(false)
      return
    }

    if (!albumId) {
      toast.error("Please select an album.")
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('album_id', albumId || '')
    formData.append('genre_id', genreId || '')
     formData.append('release_date', fullReleaseDate)
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
      setCoverImage(null)
      setReleaseDate('')
      setReleaseMonth('')
      setReleaseYear('')
      setReleaseDay('')
      setGenreId('')
      setAlbumId(null)
      setLoading(false);
    } catch (err) {
      console.error(err)
      toast.error(' Upload failed')
    }
  }

  return (
    <div className="flex  max-w-[800px]  pt-5 flex-col gap-9">
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

        <div className="z-[40] flex w-full relative ">
          <label className="text-[14px] z-[41] absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal">Your Albums</label>
         
          <AlbumDropdown
          albums={albums}
          selectedAlbum={albumId}
          onSelect={(album) => setAlbumId(album)}
          />
        </div>


         {/* Genre Dropdown */}
          <div className="flex z-[20] gap-[6px] flex-col relative">
            <span className='text-[15px] z-2 absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal'>Select Genre</span>
  
            <GenreDropdown
            genres={genres}
            selectedGenre={genreId}
            setSelectedGenre={setGenreId}
            />
            
          </div>

         {/* Release Date: Year - Month - Day */}
        
          <div className="w-full relative pt-[6px] grid-cols-[1fr_1.2fr_1fr] grid gap-4">
            <span className='text-[14px] absolute -top-[6px] left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal'>Release Date</span>
    
                <input
                  ype="text"
                maxLength={2}
                pattern="\d{1,2}" 
                placeholder="DD"
                  className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px]"
                    value={releaseDay}
                onChange={(e) => setReleaseDay(e.target.value)}
                required
                />
    
                  <MonthDropdown
                  selectedMonth={releaseMonth}
                  setSelectedMonth={setReleaseMonth}
                />
    
    
                  <input
                    type="text"
                    maxLength={4}
                    pattern="\d{4}"
                    placeholder="YYYY"
                    className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px]"
                    value={releaseYear}
                    onChange={(e) => setReleaseYear(e.target.value)}
                    required
                  />                     
            </div>

        <div className="relative">
            {/* <label className="block mb-1 font-medium">Cover Image</label> */}
            <label className="text-[14px] z-[10] absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal">Cover Image</label>
            {/* <input
                type="file"
                accept="image/*"
                className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px]"
                onChange={(e) => setCoverImage(e.target.files[0])}
            /> */}
            <CoverUpload onFileSelect={(file) => setCoverImage(file)} />
        </div>

        <div className="relative">
          <label className="text-[14px] z-[10] absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal">Track File (.mp3/.wav)</label>
          {/* <input
            type="file"
            // accept="audio/*"
            className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px]"
            onChange={(e) => setTrackFile(e.target.files[0])}
            required
          /> */}

          <TrackUpload onFileSelect={(file) => setTrackFile(file)} />
        </div>

        

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`w-[160px] border flex-center ${loading ? 'bg-main/15 text-white/30 border-main/15 cursor-not-allowed' 
                      : 'bg-white text-main2 hover:bg-green-500 border-white/50 cursor-pointer'} h-[55px] font-NeueMontreal font-semibold text-black  rounded-full  transition`}
          >
            {/* Upload Track */}
            
            {loading ? <Svg/> : "Upload Track"}
          </button>
        </div>
      </form>
    </div>
  )
}
