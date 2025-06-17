'use client'

import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useAppHook } from '@/context/AppProvider'
import GenresDropdown from './GenreDropdown'
import { BiChevronDown } from 'react-icons/bi'
import { GoChevronLeft } from 'react-icons/go'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Svg from '@/Component/Svg'
import MonthDropdown from './MothDropdown'
import GenreDropdown from './GenreDropdown'
// import naviga

export default function CreateAlbumPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [genreId, setGenreId] = useState('')
  const [genres, setGenres] = useState([])
  const [releaseDay, setReleaseDay] = useState('')
  const [releaseMonth, setReleaseMonth] = useState('')
  const [releaseYear, setReleaseYear] = useState('')
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { public_id } = useParams();
  const { authToken, user } = useAppHook()


   const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
  
  
  
  useEffect(() => {
  const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
      }
  };
  document.addEventListener("click", close);
  return () => document.removeEventListener("click", close);
  }, []);
  

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
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    const fullReleaseDate = `${releaseYear}-${releaseMonth.padStart(2, '0')}-${releaseDay.padStart(2, '0')}`

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('genre_id', genreId)
    formData.append('release_date', fullReleaseDate)
    if (coverImage) formData.append('cover_image', coverImage)

      // Debug: log what's being sent
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`)
  }


    try {
      await axios.post('http://localhost:8000/api/albums', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`
        }
      })
      console.log('✅ Album created:', formData)
      toast.success(`${title} Album Created!`)
      setLoading(false);
      router.push(`/artist/${user?.public_id || user?.id}`)
    } catch (error) {
      console.error('Album upload failed:', error)
    }
  }



  return (
    <div className="flex max-w-[800px]  pt-5 flex-col gap-9">
      
      <Link href={'/Library'} className='size-12 absolute top-3 mb-1 left-4   flex-center text-white bg-main2 rounded-full text-[23px]'><GoChevronLeft/></Link>
      <div className="flex leading-snug flex-col gap-1">
        <p className="text-white/95 font-semibold tracking-wide font-NeueMontreal text-[15px]">Create Album</p>
        <h2 className="text-[37px] text-white font-NeueMontreal font-semibold">Your Next Album Starts Here</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pt-3">
        {/* Album Title */}
        <div className="flex relative ">
          <span className='text-[14px] absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal'>Album Title</span>
          <input
            type="text"
            
            className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px] "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

        </div>

        {/* Description */}
        <div className="flex gap-[6px] flex-col relative">
          <span className='text-[14px] absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal'>Description</span>
          <textarea
            className="min-h-[100px] w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>


        {/* Genre Dropdown */}
        <div className="flex gap-[6px] flex-col relative">
          <span className='text-[15px] z-10 absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal'>Select Genre</span>

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

        {/* Drag-and-Drop Cover Image */}
        <div
          className={`w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px] relative flex-center   flex-col  h-[240px] text-center ${coverImage ? 'border-green-500' : 'border-gray-300'} transition`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >

          <span className='text-[15px] z-10 absolute -top-3 left-2 bg-[#121212] px-[6px] text-white font-semibold  font-NeueMontreal'>Cover Image</span>
          <p className="text-sm mb-2 font-NeueMontreal text-white/85">
            {coverImage ? `Selected: ${coverImage.name}` : 'Drag & Drop Cover Image Here or Click'}
          </p>
          <input
            type="file"
            accept="image/*"
            className="w-full cursor-pointer placeholder:text-transparent opacity-0 absolute top-0 left-0 h-full p-2   bg-transparent"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`w-[160px] border flex-center ${loading ? 'bg-main/15 text-white/30 border-main/15 cursor-not-allowed' 
                      : 'bg-white text-main2 hover:bg-green-500 border-white/50 cursor-pointer'} h-[55px] font-NeueMontreal font-semibold text-black  rounded-full  transition`}
          >
            
            {loading ? <Svg/> : "Upload Album"}
          </button>
        </div>
      </form>
    </div>
  )
}
