'use client'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAppHook } from '@/context/AppProvider'
import { BiChevronDown } from 'react-icons/bi'
import { GoChevronLeft } from 'react-icons/go'
import Link from 'next/link'
import Svg from '@/Component/Svg'
import { useParams, useRouter } from 'next/navigation'

export default function UploadTrackForm() {
  const [title, setTitle] = useState('')
  const [albumId, setAlbumId] = useState('')
  const [genreId, setGenreId] = useState('')
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [trackFile, setTrackFile] = useState(null)
  const [trackFileName, setTrackFileName] = useState('')
  const [genres, setGenres] = useState([])
  const [albums, setAlbums] = useState([])
  const [coverImage, setCoverImage] = useState(null)
  const [coverImageName, setCoverImageName] = useState('')
   const [coverImagePreview, setCoverImagePreview] = useState('')
  const [isAlbumDropdownOpen, setIsAlbumDropdownOpen] = useState(false)
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false)
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false)
  const [trackDragActive, setTrackDragActive] = useState(false)



  const { authToken } = useAppHook()

  const isFormValid =
    title.trim() !== '' &&
    // albumId !== '' &&
    genreId !== '' &&
    day !== '' &&
    month !== '' &&
    year !== '' &&
    trackFile !== null &&
    coverImage !== null
  

  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ]

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

  // const handleTrackUpload = (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     setTrackFile(file)
  //     setTrackFileName(file.name)
  //   }
  // }


   const handleDrag = useCallback((e, type) => {
      e.preventDefault()
      e.stopPropagation()
      if (type === 'image') setDragActive(e.type === 'dragenter' || e.type === 'dragover')
      if (type === 'track') setTrackDragActive(e.type === 'dragenter' || e.type === 'dragover')
    }, [])

     const handleDrop = useCallback((e, type) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setTrackDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      
      if (type === 'image') {
        if (!file.type.match('image.*')) {
          return toast.error('Please upload an image file')
        }
        handleCoverImageUpload({ target: { files: [file] } })
      } else if (type === 'track') {
        if (!file.type.match('audio.*')) {
          return toast.error('Please upload an audio file')
        }
        handleTrackUpload({ target: { files: [file] } })
      }
    }
  }, [])

   const handleTrackUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.match('audio.*')) {
        return toast.error('Please upload an audio file')
      }
      setTrackFile(file)
      setTrackFileName(file.name)
    }
  }

    const handleCoverImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.match('image.*')) {
        return toast.error('Please upload an image file')
      }
      
      setCoverImage(file)
      setCoverImageName(file.name)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setCoverImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    setCoverImageName('')
    setCoverImagePreview('')
  }

  const removeTrackFile = () => {
    setTrackFile(null)
    setTrackFileName('')
  }


  // const handleCoverImageUpload = (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     setCoverImage(file)
  //     setCoverImageName(file.name)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    if (!trackFile) return toast.error('Please upload a track file')
      if (!day || !month || !year) return toast.error('Please enter a valid release date')

    // Format release date as YYYY-MM-DD
    const releaseDate = `${year}-${month}-${day.padStart(2, '0')}`

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
      setLoading(false);
      setTitle('')
      setTrackFile(null)
      setTrackFileName('')
      setDay('')
      setMonth('')
      setYear('')
      setGenreId('')
      setAlbumId('')
      setCoverImage(null)
      setCoverImageName('')
      setCoverImagePreview('')
    } catch (err) {
      console.error(err)
      toast.error('Upload failed')
    }
  }

  return (
    <div className="flex w-[650px]  py-5 pt-10 flex-col gap-9">


      {/* <h2 className="text-xl font-bold mb-4">Upload New Track</h2> */}
      <Link href={'/'} className='size-12 mb-1 relative top-5  flex-center text-white bg-main2 rounded-full text-[23px]'><GoChevronLeft/></Link>
            <div className="flex leading-snug flex-col gap-1">
              <p className="text-white/95 font-semibold tracking-wide font-NeueMontreal text-[15px]">Create New Track</p>
              <h2 className="text-[37px] text-white font-NeueMontreal font-semibold">Your Next Track Starts Here</h2>
            </div>
      <form onSubmit={handleSubmit} className="space-y-6 pt-3 w-full flex flex-col">
        <div className='relative'>
          <label className="text-[14px] absolute -top-3 left-2 bg-black px-[6px] text-white font-semibold  font-NeueMontreal">Track Title</label>
          <input
            type="text"
            className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px] "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Custom Album Dropdown */}
        <div className="relative w-full">
          <label className="text-[14px] absolute -top-3 left-2 bg-black px-[6px] text-white font-semibold  font-NeueMontreal">Your Albums</label>
          <div 
            className=" cursor-pointer w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 h-[46px]  flex justify-between items-center"
            onClick={() => setIsAlbumDropdownOpen(!isAlbumDropdownOpen)}
          >
            <span>{albumId ? albums.find(a => a.id === albumId)?.title || '' : ''}</span>
            <span><BiChevronDown size={22}/></span>
          </div>
          {isAlbumDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 border text-main2 rounded bg-white  max-h-60 overflow-y-auto">
              {albums.map(album => (
                <div 
                  key={album.id} 
                  className="px-3 py-2 hover:text-main2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setAlbumId(album.id)
                    setIsAlbumDropdownOpen(false)
                  }}
                >
                  {album.title}
                </div>
              ))}
              <div 
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setAlbumId('')
                  setIsAlbumDropdownOpen(false)
                }}
              >
                None
              </div>
            </div>
          )}
        </div>

        {/* Custom Genre Dropdown */}
        <div className="relative w-full">
          <label className="text-[14px] absolute -top-3 left-2 bg-black px-[6px] text-white font-semibold  font-NeueMontreal">Genre</label>
          <div 
            className=" cursor-pointer w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 h-[46px]  flex justify-between items-center"
            onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
          >
            <span>{genreId ? genres.find(g => g.id === genreId)?.name || 'Select Genre' : 'Select Genre'}</span>
            <span><BiChevronDown size={22}/></span>
          </div>
          {isGenreDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 border text-main2 rounded bg-white  max-h-60 overflow-y-auto">
              {genres.map(genre => (
                <div 
                  key={genre.id} 
                  className="px-3 py-2 hover:text-main2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setGenreId(genre.id)
                    setIsGenreDropdownOpen(false)
                  }}
                >
                  {genre.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Release Date - Split into Day, Month, Year */}
        <div className='relative w-full'>
          <label className="text-[14px] absolute -top-3 left-2 bg-black px-[6px] text-white font-semibold  font-NeueMontreal">Release Date</label>
          <div className="grid w-full grid-cols-[1fr_.8fr_1fr] gap-2">
            {/* Day */}
            <input
              type="number"
              placeholder="Day"
              min="1"
              max="31"
              className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px] "
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
            
            {/* Month Dropdown */}
            <div className="relative ">
              <div 
                className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px]  cursor-pointer flex justify-between items-center"
                onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              >
                <span>{month ? months.find(m => m.value === month)?.name || 'Month' : 'Month'}</span>
                <span><BiChevronDown size={22}/></span>
              </div>
              {isMonthDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 border text-main2 rounded bg-white max-h-60 overflow-y-auto">
                  {months.map(m => (
                    <div 
                      key={m.value} 
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        setMonth(m.value)
                        setIsMonthDropdownOpen(false)
                      }}
                    >
                      {m.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Year */}
            <input
              type="number"
              placeholder="Year"
              min="1900"
              max={new Date().getFullYear()}
              className="w-full rounded hover:border-white  ease-in-out border-white/50 duration-200 border-[1px]  bg-transparent font-NeueMontreal  outline-none px-2 py-[10px] "
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Custom Cover Image Upload */}
        <div className='relative w-full h-auto'>
          <label className="text-[14px] absolute -top-3 left-2 bg-black px-[6px] text-white font-semibold  font-NeueMontreal">Cover Image</label>
          <div 
            className={`"w-full min-h-[110px] border border-dashed  rounded  hover:border-white/60 transition cursor-pointer p-6 text-center flex items-center justify-center flex-col space-y-3 ${dragActive ? 'bg-blue-50 text-black' : 'border-white/70'}`}
            onDragEnter={(e) => handleDrag(e, 'image')}
            onDragLeave={(e) => handleDrag(e, 'image')}
            onDragOver={(e) => handleDrag(e, 'image')}
            onDrop={(e) => handleDrop(e, 'image')}
          >
            {coverImagePreview ? (
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <img 
                    src={coverImagePreview} 
                    alt="Cover preview" 
                    className="h-32 w-32 object-cover rounded-md"
                  />
                </div>
                <p className="font-medium text-sm text-white/80 mb-2">{coverImageName}</p>
                <button
                  type="button"
                  className="text-sm cursor-pointer text-red-500"
                  onClick={removeCoverImage}
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="flex flex-col gap-1 items-center">
                  <span className={` ${dragActive ? 'text-main2' : 'text-white/80'} font-medium text-sm`}>
                    {dragActive ? 'Drop your image here' : 'Drag & drop or click to upload'}
                  </span>
                  <span className={` ${dragActive ? 'text-black/50' : 'text-white/40'} text-xs`}>PNG / JPG / JPEG • Max 5MB</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageUpload}
                />
              </label>
            )}
          </div>
        </div>

        {/* Custom Track File Upload */}
        <div className='relative w-full'>
          <label className="text-[14px] absolute -top-3 left-2 bg-black px-[6px] text-white font-semibold  font-NeueMontreal">Track File</label>
          {/* <div className="w-full border border-dashed border-white/70 rounded  hover:border-white/60 transition cursor-pointer p-6 text-center flex items-center justify-center flex-col space-y-3">
            {trackFile ? (
              <div className="flex flex-col items-center">
                <p className="text-white/80 font-medium text-sm">{trackFileName}</p>
                <button
                  type="button"
                  className="text-sm text-red-500"
                  onClick={() => {
                    setTrackFile(null)
                    setTrackFileName('')
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-white/80 font-medium text-sm">Click to upload audio track</span>
                  <span className="text-white/40 text-xs">MP3 / WAV • Max 20MB</span>
                </div>
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleTrackUpload}
                  required
                />
              </label>
            )}
          </div> */}
          <div 
            className={`"w-full border border-dashed  rounded  hover:border-white/60 transition cursor-pointer p-6 text-center flex items-center justify-center flex-col space-y-3 ${trackDragActive ? ' bg-blue-50 text-black' : 'border-white/70'}`}
            onDragEnter={(e) => handleDrag(e, 'track')}
            onDragLeave={(e) => handleDrag(e, 'track')}
            onDragOver={(e) => handleDrag(e, 'track')}
            onDrop={(e) => handleDrop(e, 'track')}
          >
            {trackFile ? (
              <div className="flex flex-col items-center">
                <div className="mb-2 p-4 bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <p className="font-medium text-sm text-white/80 mb-2">{trackFileName}</p>
                <button
                  type="button"
                  className="text-sm cursor-pointer text-red-500"
                  onClick={removeTrackFile}
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="flex flex-col gap-1 items-center">
                  <span className={` ${trackDragActive ? 'text-black' : 'text-white/80'} font-medium text-sm`}>
                    {trackDragActive ? 'Drop your audio file here' : 'Drag & drop or click to upload'}
                  </span>
                  <span className={` ${trackDragActive ? 'text-black/50' : 'text-white/40'} text-xs`}>MP3 / WAV • Max 20MB</span>
                </div>
                <input
                  type="file"
                  accept="audio/*"
                  className="hidden"
                  onChange={handleTrackUpload}
                  required
                />
              </label>
            )}
          </div>
        </div>

  

        <div className="flex justify-end">
          <button
            type="submit"
            // disabled={isFormValid}
            className={`w-[160px] border flex-center ${
                    !isFormValid || loading 
                      ? 'bg-main/15 text-white/30 border-main/15 cursor-not-allowed' 
                      : 'bg-white text-main2 border-white/50 cursor-pointer'
                  } h-[55px] font-NeueMontreal font-semibold text-black  rounded-full  transition`}
          >
            {/* Upload Album */}
            
            {loading ? <Svg/> : "Upload Track"}
          </button>
        </div>
      </form>
    </div>
  )
}