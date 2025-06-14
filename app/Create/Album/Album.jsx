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
    await new Promise((res) => setTimeout(res, 3000));

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

  const months = [
    { label: 'January', value: '01' },
    { label: 'February', value: '02' },
    { label: 'March', value: '03' },
    { label: 'April', value: '04' },
    { label: 'May', value: '05' },
    { label: 'June', value: '06' },
    { label: 'July', value: '07' },
    { label: 'August', value: '08' },
    { label: 'September', value: '09' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
  ]

  return (
    <div className="flex scale-95 flex-col gap-9">
      
      <Link href={'/Create'} className='size-12 mb-1 relative top-5  flex-center text-white bg-main2 rounded-full text-[23px]'><GoChevronLeft/></Link>
      <div className="flex leading-snug flex-col gap-1">
        <p className="text-white/95 font-semibold tracking-wide font-NeueMontreal text-[15px]">Create Album</p>
        <h2 className="text-[37px] text-white font-NeueMontreal font-semibold">Your Next Album Starts Here</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 pt-3">
        {/* Album Title */}
        <div className="flex flex-col gap-[6px]">
          <span className='text-[15px] text-white  font-NeueMontreal'>/ Album Title</span>
          <input
            type="text"
            
            className="w-full rounded hover:border-white  ease-in-out border-white/85 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-2 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

        </div>

        {/* Description */}
        <div className="flex gap-[6px] flex-col">
          <span className='text-[15px] text-white  font-NeueMontreal'>/ Description</span>
          <textarea
            className="min-h-[100px] hover:border-white  ease-in-out w-full rounded border-white/85 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[6px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>


        {/* Genre Dropdown */}
        <div className="flex gap-[6px] flex-col">
          <span className='text-[15px] text-white  font-NeueMontreal'>/ Select Genre</span>

          <GenreDropdown
          genres={genres}
          selectedGenre={genreId}
          setSelectedGenre={setGenreId}
        />
          {/* <select
            className="w-full rounded hover:border-white  ease-in-out border-white/85 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-1 h-[36px]"
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
            required
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select> */}
        </div>

          
        

        {/* Release Date: Year - Month - Day */}

        <span className='text-[15px] text-white  font-NeueMontreal'>/ Release Date</span>
        <div className="w-full pt-[6px] grid-cols-[1fr_1.2fr_1fr] grid gap-4">

            <input
              ype="text"
            maxLength={2}
            pattern="\d{1,2}"
            placeholder="DD"
              className="w-full placeholder:text-white/70  rounded border-white/85 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-2 hover:border-white  ease-in-out"
               value={releaseDay}
            onChange={(e) => setReleaseDay(e.target.value)}
            required
            />
          
            {/* <select
                className="w-full   rounded border-white/85 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-1 h-[36px] hover:border-white  ease-in-out"
                value={releaseMonth}
                onChange={(e) => setReleaseMonth(e.target.value)}
                required
              >
                <option className='text-white/70' value="">MM</option>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select> */}

              <MonthDropdown
              selectedMonth={releaseMonth}
              setSelectedMonth={setReleaseMonth}
            />


              <input
                type="text"
                maxLength={4}
                pattern="\d{4}"
                placeholder="YYYY"
                className="w-full hover:border-white  ease-in-out placeholder:text-white/70  rounded border-white/85 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-2"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                required
              />                     
        </div>

        {/* Drag-and-Drop Cover Image */}
        <div
          className={`border-[1px] flex-center hover:border-white  ease-in-out  overflow-hidden flex-col relative h-[240px] bg-transparent backdrop-blur-2xl  rounded  text-center ${coverImage ? 'border-green-500' : 'border-gray-300'} transition`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
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
